import { execSync } from 'child_process'
import { mkdirSync, existsSync, cpSync, copyFileSync } from 'fs'
import { join } from 'path'
import { getPublishedSlides, DIST_DIR, ROOT_DIR, BASE_URL, log } from './utils.js'

async function build() {
  const args = process.argv.slice(2)
  const onlySlug = args.find((arg) => arg.startsWith('--only='))?.split('=')[1]

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

  log(`Found ${slides.length} slide(s) to build`)

  for (const slide of slides) {
    log(`Building: ${slide.title} -> ${slide.outputPath}`)

    const outputDir = join(DIST_DIR, slide.outputPath)

    try {
      execSync(
        `npx slidev build "${slide.slidesPath}" --base "${BASE_URL}/${slide.outputPath}/" --out "${outputDir}"`,
        {
          cwd: ROOT_DIR,
          stdio: 'inherit',
        }
      )
      log(`Built: ${slide.outputPath}`, 'success')
    } catch (error) {
      log(`Failed to build: ${slide.outputPath}`, 'error')
      throw error
    }
  }

  const indexPath = join(ROOT_DIR, 'index.html')
  if (existsSync(indexPath)) {
    copyFileSync(indexPath, join(DIST_DIR, 'index.html'))
    log('Copied index.html', 'success')
  }

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
