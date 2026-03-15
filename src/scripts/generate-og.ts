import { existsSync, renameSync, rmSync } from 'fs'
import { join } from 'path'
import { getPublishedSlides, ROOT_DIR, log, execAsync } from './utils.js'

async function generateOg() {
  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const onlySlug = args.find((arg) => arg.startsWith('--only='))?.split('=')[1]

  let slides = await getPublishedSlides()

  if (onlySlug) {
    slides = slides.filter((s) => s.meta.slug === onlySlug)
    if (slides.length === 0) {
      log(`Slide with slug "${onlySlug}" not found`, 'error')
      process.exit(1)
    }
  }

  const targets = force
    ? slides
    : slides.filter((s) => !existsSync(join(s.dir, 'og-image.png')))

  if (targets.length === 0) {
    log('All slides have og-image.png', 'success')
    return
  }

  log(`Generating OGP images for ${targets.length} slide(s)...`)

  for (const slide of targets) {
    const tmpDir = join(slide.dir, '.og-export')
    try {
      await execAsync(
        `npx slidev export "${slide.slidesPath}" --format png --range 1 --output "${tmpDir}"`,
        { cwd: ROOT_DIR }
      )

      // slidev export outputs: <dir>/1.png
      const exported = join(tmpDir, '1.png')
      if (existsSync(exported)) {
        renameSync(exported, join(slide.dir, 'og-image.png'))
        log(`Generated: ${slide.outputPath}/og-image.png`, 'success')
      } else {
        log(`Export file not found for: ${slide.outputPath}`, 'error')
      }
      // Clean up temp directory
      if (existsSync(tmpDir)) {
        rmSync(tmpDir, { recursive: true })
      }
    } catch (error) {
      log(`Failed to generate OGP for: ${slide.outputPath}`, 'error')
      console.error(error)
    }
  }

  log('OGP image generation completed!', 'success')
}

generateOg().catch((error) => {
  console.error(error)
  process.exit(1)
})
