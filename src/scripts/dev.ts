import { execSync, spawn } from 'child_process'
import prompts from 'prompts'
import { getAllSlides, ROOT_DIR, log } from './utils.js'

async function dev() {
  const args = process.argv.slice(2)
  const isLatest = args.includes('--latest')

  const slides = await getAllSlides()

  if (slides.length === 0) {
    log('No slides found', 'error')
    process.exit(1)
  }

  let selectedSlide = slides[0]

  if (isLatest) {
    log(`Starting latest slide: ${selectedSlide.title}`)
  } else {
    const choices = slides.map((slide) => ({
      title: `${slide.outputPath} - ${slide.title}`,
      value: slide,
      description: slide.meta.description || slide.meta.event,
    }))

    const response = await prompts({
      type: 'select',
      name: 'slide',
      message: 'Select a slide to develop:',
      choices,
    })

    if (!response.slide) {
      log('No slide selected', 'info')
      process.exit(0)
    }

    selectedSlide = response.slide
  }

  log(`Starting slidev for: ${selectedSlide.title}`, 'success')
  console.log(`  Path: ${selectedSlide.slidesPath}`)
  console.log('')

  const child = spawn('npx', ['slidev', selectedSlide.slidesPath, '--open'], {
    cwd: ROOT_DIR,
    stdio: 'inherit',
    shell: true,
  })

  child.on('error', (error) => {
    log(`Failed to start slidev: ${error.message}`, 'error')
    process.exit(1)
  })

  child.on('exit', (code) => {
    process.exit(code || 0)
  })
}

dev().catch((error) => {
  console.error(error)
  process.exit(1)
})
