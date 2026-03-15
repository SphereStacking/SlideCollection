import { mkdirSync, existsSync, copyFileSync, readFileSync, writeFileSync, readdirSync, rmSync } from 'fs'
import { join } from 'path'
import { getPublishedSlides, DIST_DIR, ROOT_DIR, log, execAsync, contentHash, runConcurrent, type SlideInfo } from './utils.js'

const DEFAULT_CONCURRENCY = 1
const MANIFEST_PATH = join(DIST_DIR, '.build-manifest.json')

const SHARED_PATHS = [
  join(ROOT_DIR, 'components'),
  join(ROOT_DIR, 'package.json'),
  join(ROOT_DIR, 'pnpm-lock.yaml'),
]

interface BuildManifest {
  sharedHash: string
  slides: Record<string, string>
}

function getSharedHash(): string {
  return SHARED_PATHS.map((p) => contentHash(p)).join(':')
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

function cleanOrphans(slides: SlideInfo[]): void {
  if (!existsSync(DIST_DIR)) return
  const validOutputPaths = new Set(slides.map((s) => s.outputPath))

  for (const entry of readdirSync(DIST_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue

    if (/^\d{4}$/.test(entry.name)) {
      const yearDir = join(DIST_DIR, entry.name)
      for (const sub of readdirSync(yearDir, { withFileTypes: true })) {
        if (!sub.isDirectory()) continue
        const outputPath = `${entry.name}/${sub.name}`
        if (!validOutputPaths.has(outputPath)) {
          rmSync(join(yearDir, sub.name), { recursive: true })
          log(`Removed orphan: ${outputPath}`, 'warn')
        }
      }
      if (readdirSync(yearDir).length === 0) {
        rmSync(yearDir, { recursive: true })
      }
    } else if (!validOutputPaths.has(entry.name)) {
      rmSync(join(DIST_DIR, entry.name), { recursive: true })
      log(`Removed orphan: ${entry.name}`, 'warn')
    }
  }
}

async function buildSlide(slide: SlideInfo): Promise<void> {
  log(`Building: ${slide.title} -> ${slide.outputPath}`)
  const outputDir = join(DIST_DIR, slide.outputPath)

  try {
    await execAsync(
      `NODE_OPTIONS="--max-old-space-size=4096" npx slidev build "${slide.slidesPath}" --base "/${slide.outputPath}/" --out "${outputDir}"`,
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

  const allSlides = await getPublishedSlides()

  let slides = allSlides
  if (onlySlug) {
    slides = allSlides.filter((s) => s.meta.slug === onlySlug)
    if (slides.length === 0) {
      log(`Slide with slug "${onlySlug}" not found`, 'error')
      process.exit(1)
    }
  }

  // Check for missing og-image.png
  const missingOg = slides.filter(
    (s) => !existsSync(join(s.dir, 'og-image.png'))
  )
  if (missingOg.length > 0) {
    log(`${missingOg.length} slide(s) missing og-image.png:`, 'warn')
    missingOg.forEach((s) => log(`  - ${s.outputPath}`, 'warn'))
    log('Run "pnpm gen:og" to generate them', 'warn')
  }

  if (!existsSync(DIST_DIR)) {
    mkdirSync(DIST_DIR, { recursive: true })
  }

  // Detect changes using content hashes
  const prevManifest = force ? null : readManifest()
  const sharedHash = getSharedHash()
  const sharedChanged = !prevManifest || prevManifest.sharedHash !== sharedHash

  if (sharedChanged && prevManifest) {
    log('Shared files changed, rebuilding all slides')
  }

  // Compute per-slide hashes and filter to changed ones
  const slideHashes = new Map<string, string>()
  const slidesToBuild: SlideInfo[] = []

  for (const slide of slides) {
    const hash = contentHash(slide.dir)
    slideHashes.set(slide.outputPath, hash)

    if (force || sharedChanged) {
      slidesToBuild.push(slide)
    } else if (!prevManifest?.slides[slide.outputPath] || prevManifest.slides[slide.outputPath] !== hash) {
      slidesToBuild.push(slide)
    } else {
      const outputDir = join(DIST_DIR, slide.outputPath)
      if (!existsSync(join(outputDir, 'index.html'))) {
        slidesToBuild.push(slide)
      }
    }
  }

  const skipped = slides.length - slidesToBuild.length
  if (skipped > 0) {
    log(`Skipping ${skipped} unchanged slide(s)`)
  }
  log(`Building ${slidesToBuild.length} of ${slides.length} slide(s) (concurrency: ${concurrency})`)

  if (slidesToBuild.length > 0) {
    await runConcurrent(slidesToBuild, concurrency, buildSlide)
  }

  // Clean up orphan directories (use full list, not filtered by --only)
  if (!onlySlug) {
    cleanOrphans(allSlides)
  }

  // Update manifest (current slides only, no stale entries)
  const newManifest: BuildManifest = {
    sharedHash,
    slides: Object.fromEntries(slideHashes),
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
