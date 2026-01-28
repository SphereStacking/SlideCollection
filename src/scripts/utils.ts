import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const ROOT_DIR = join(__dirname, '..')
export const SLIDES_DIR = join(ROOT_DIR, 'slides')
export const DIST_DIR = join(ROOT_DIR, 'dist')
export const BASE_URL = ''

export interface SlideMeta {
  slug: string
  date: string
  event?: string
  description?: string
  icon?: string
  published: boolean
  legacyPath?: string
}

export interface SlideInfo {
  title: string
  dir: string
  dirName: string
  slidesPath: string
  meta: SlideMeta
  year: string
  outputPath: string
  url: string
}

export async function getAllSlides(): Promise<SlideInfo[]> {
  const slideDirs = await fg('*/slides.md', {
    cwd: SLIDES_DIR,
    absolute: false,
  })

  const slides: SlideInfo[] = []

  for (const slideFile of slideDirs) {
    const dirName = dirname(slideFile)
    const slidesPath = join(SLIDES_DIR, slideFile)
    const content = readFileSync(slidesPath, 'utf-8')
    const { data } = matter(content)

    const meta: SlideMeta = {
      slug: data.meta?.slug || dirName,
      date: data.meta?.date || extractDateFromDir(dirName),
      event: data.meta?.event,
      description: data.meta?.description || data.info,
      icon: data.meta?.icon || 'mdi:file-presentation-box',
      published: data.meta?.published !== false,
      legacyPath: data.meta?.legacyPath || dirName,
    }

    const year = extractYear(meta.date)
    const isSpecialSlug = !meta.date || meta.slug === 'work-history'
    const outputPath = isSpecialSlug
      ? `${meta.slug}`
      : `${year}/${meta.slug}`

    slides.push({
      title: data.title || dirName,
      dir: join(SLIDES_DIR, dirName),
      dirName,
      slidesPath,
      meta,
      year,
      outputPath,
      url: `${BASE_URL}/${outputPath}/`,
    })
  }

  return slides.sort((a, b) => {
    if (a.meta.date && b.meta.date) {
      return b.meta.date.localeCompare(a.meta.date)
    }
    return 0
  })
}

export async function getPublishedSlides(): Promise<SlideInfo[]> {
  const slides = await getAllSlides()
  return slides.filter((s) => s.meta.published)
}

function extractDateFromDir(dirName: string): string {
  const match = dirName.match(/^(\d{4})-(\d{2})/)
  if (match) {
    return `${match[1]}-${match[2]}`
  }
  return ''
}

function extractYear(date: string): string {
  if (!date) return ''
  return date.split('-')[0]
}

export function log(message: string, type: 'info' | 'success' | 'error' = 'info') {
  const prefix = {
    info: '\x1b[36m[INFO]\x1b[0m',
    success: '\x1b[32m[OK]\x1b[0m',
    error: '\x1b[31m[ERROR]\x1b[0m',
  }
  console.log(`${prefix[type]} ${message}`)
}
