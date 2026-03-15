import { exec } from 'child_process'
import { mkdirSync, existsSync, copyFileSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { getPublishedSlides, DIST_DIR, ROOT_DIR, log, type SlideInfo } from './utils.js'

const DEFAULT_CONCURRENCY = 1
const MANIFEST_PATH = join(DIST_DIR, '.build-manifest.json')

const SHARED_PATHS = [
  'components',
  'package.json',
  'pnpm-lock.yaml',
]

interface BuildManifest {
  sharedHash: string
  slides: Record<string, string>
}

function execOutput(command: string, cwd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, { cwd, maxBuffer: 1024 * 1024 }, (error, stdout) => {
      if (error) reject(error)
      else resolve(stdout.trim())
    })
  })
}

function execAsync(command: string, options: { cwd: string }): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = exec(command, { ...options, maxBuffer: 1024 * 1024 * 10 }, (error) => {
      if (error) reject(error)
      else resolve()
    })
    child.stdout?.pipe(process.stdout)
    child.stderr?.pipe(process.stderr)
  })
}

async function runConcurrent<T>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<void>,
): Promise<void> {
  const queue = [...items]
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift()!
      await fn(item)
    }
  })
  await Promise.all(workers)
}

async function getGitHash(path: string): Promise<string> {
  try {
    return await execOutput(`git log -1 --format=%H -- "${path}"`, ROOT_DIR)
  } catch {
    return ''
  }
}

async function getSharedHash(): Promise<string> {
  const hashes = await Promise.all(
    SHARED_PATHS.map((p) => getGitHash(join(ROOT_DIR, p)))
  )
  return hashes.join(':')
}

function readManifest(): BuildManifest | null {
  if (!existsSync(MANIFEST_PATH)) return null
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'))
  } catch {
    return null
  }
}

function writeManifest(manifest: BuildManifest): void {
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
}

async function buildSlide(slide: SlideInfo): Promise<void> {
  log(`Building: ${slide.title} -> ${slide.outputPath}`)
  const outputDir = join(DIST_DIR, slide.outputPath)

  try {
    await execAsync(
      `npx slidev build "${slide.slidesPath}" --base "/${slide.outputPath}/" --out "${outputDir}"`,
      { cwd: ROOT_DIR }
    )
    log(`Built: ${slide.outputPath}`, 'success')
  } catch (error) {
    log(`Failed to build: ${slide.outputPath}`, 'error')
    throw error
  }
}

async function build() {
  const args = process.argv.slice(2)
  const onlySlug = args.find((arg) => arg.startsWith('--only='))?.split('=')[1]
  const concurrencyArg = args.find((arg) => arg.startsWith('--concurrency='))?.split('=')[1]
  const concurrency = concurrencyArg ? parseInt(concurrencyArg, 10) : DEFAULT_CONCURRENCY
  const force = args.includes('--force')

  log('Starting build process...')

  let slides = await getPublishedSlides()

  if (onlySlug) {
    slides = slides.filter((s) => s.meta.slug === onlySlug)
    if (slides.length === 0) {
      log(`Slide with slug "${onlySlug}" not found`, 'error')
      process.exit(1)
    }
  }

  if (!existsSync(DIST_DIR)) {
    mkdirSync(DIST_DIR, { recursive: true })
  }

  // Detect changes using git hashes
  const prevManifest = force ? null : readManifest()
  const sharedHash = await getSharedHash()
  const sharedChanged = !prevManifest || prevManifest.sharedHash !== sharedHash

  if (sharedChanged && prevManifest) {
    log('Shared files changed, rebuilding all slides')
  }

  // Compute per-slide hashes and filter to changed ones
  const slideHashes = new Map<string, string>()
  const slidesToBuild: SlideInfo[] = []

  await Promise.all(slides.map(async (slide) => {
    const hash = await getGitHash(slide.dir)
    slideHashes.set(slide.outputPath, hash)

    if (force || sharedChanged) {
      slidesToBuild.push(slide)
    } else if (!prevManifest?.slides[slide.outputPath] || prevManifest.slides[slide.outputPath] !== hash) {
      slidesToBuild.push(slide)
    } else {
      // Check cached output exists
      const outputDir = join(DIST_DIR, slide.outputPath)
      if (!existsSync(join(outputDir, 'index.html'))) {
        slidesToBuild.push(slide)
      }
    }
  }))

  const skipped = slides.length - slidesToBuild.length
  if (skipped > 0) {
    log(`Skipping ${skipped} unchanged slide(s)`)
  }
  log(`Building ${slidesToBuild.length} of ${slides.length} slide(s) (concurrency: ${concurrency})`)

  if (slidesToBuild.length > 0) {
    await runConcurrent(slidesToBuild, concurrency, buildSlide)
  }

  // Update manifest
  const newManifest: BuildManifest = {
    sharedHash,
    slides: {
      ...(prevManifest?.slides || {}),
      ...Object.fromEntries(slideHashes),
    },
  }
  writeManifest(newManifest)

  const notFoundPath = join(ROOT_DIR, '404.html')
  if (existsSync(notFoundPath)) {
    copyFileSync(notFoundPath, join(DIST_DIR, '404.html'))
    log('Copied 404.html', 'success')
  }

  const slidesJsonPath = join(ROOT_DIR, 'slides.json')
  if (existsSync(slidesJsonPath)) {
    copyFileSync(slidesJsonPath, join(DIST_DIR, 'slides.json'))
    log('Copied slides.json', 'success')
  }

  const logoPath = join(ROOT_DIR, 'logo.svg')
  if (existsSync(logoPath)) {
    copyFileSync(logoPath, join(DIST_DIR, 'logo.svg'))
    log('Copied logo.svg', 'success')
  }

  log('Build completed!', 'success')
}

build().catch((error) => {
  console.error(error)
  process.exit(1)
})
