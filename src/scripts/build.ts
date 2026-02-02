import { exec } from 'child_process'
import { mkdirSync, existsSync, copyFileSync } from 'fs'
import { join } from 'path'
import { getPublishedSlides, DIST_DIR, ROOT_DIR, BASE_URL, log, type SlideInfo } from './utils.js'

const DEFAULT_CONCURRENCY = 2

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

  log(`Found ${slides.length} slide(s) to build (concurrency: ${concurrency})`)

  await runConcurrent(slides, concurrency, buildSlide)

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

  log('Build completed!', 'success')
}

build().catch((error) => {
  console.error(error)
  process.exit(1)
})
