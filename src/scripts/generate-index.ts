import { writeFileSync } from 'fs'
import { join } from 'path'
import { getListedSlides, ROOT_DIR, log } from './utils.js'

interface SlideJsonEntry {
  title: string
  icon: string
  description: string
  date: string
  link: string
  slug: string
}

async function generateIndex() {
  log('Generating slides.json...')

  const slides = await getListedSlides()

  const entries: SlideJsonEntry[] = slides.map((slide) => ({
    title: slide.title,
    icon: slide.meta.icon || 'mdi:file-presentation-box',
    description: slide.meta.description || slide.meta.event || '',
    date: slide.meta.date || '',
    link: slide.url,
    slug: slide.meta.slug,
  }))

  const outputPath = join(ROOT_DIR, 'slides.json')
  writeFileSync(outputPath, JSON.stringify(entries, null, 2))

  log(`Generated slides.json with ${entries.length} entries`, 'success')

  console.log('\nSlides:')
  entries.forEach((entry) => {
    console.log(`  - ${entry.title} (${entry.date || 'no date'})`)
    console.log(`    ${entry.link}`)
  })
}

generateIndex().catch((error) => {
  console.error(error)
  process.exit(1)
})
