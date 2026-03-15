import { exec } from 'child_process'
import { createHash } from 'crypto'
import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import fg from 'fast-glob'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const ROOT_DIR = join(__dirname, '..')
export const SLIDES_DIR = join(ROOT_DIR, 'slides')
export const DIST_DIR = join(ROOT_DIR, 'dist')
export const BASE_URL = 'https://slides.spherestacking.com'

export interface SlideMeta {
  slug: string
  date: string
  event?: string
  description?: string
  icon?: string
  published: boolean
  hidden?: boolean  // ビルドはするがAPIには返さない
  legacyPath?: string
  tags?: string[]
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
      hidden: data.meta?.hidden || false,
      legacyPath: data.meta?.legacyPath || dirName,
      tags: data.meta?.tags || [],
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

export async function getListedSlides(): Promise<SlideInfo[]> {
  const slides = await getPublishedSlides()
  return slides.filter((s) => !s.meta.hidden)
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

export function execAsync(command: string, options: { cwd: string }): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = exec(command, { ...options, maxBuffer: 1024 * 1024 * 10 }, (error) => {
      if (error) reject(error)
      else resolve()
    })
    child.stdout?.pipe(process.stdout)
    child.stderr?.pipe(process.stderr)
  })
}

export function contentHash(targetPath: string): string {
  if (!existsSync(targetPath)) return ''
  const hash = createHash('sha256')
  const stat = statSync(targetPath)
  if (stat.isFile()) {
    hash.update(readFileSync(targetPath))
    return hash.digest('hex').slice(0, 16)
  }
  const walkFiles = (dir: string): string[] => {
    const entries = readdirSync(dir, { withFileTypes: true })
    const files: string[] = []
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.og-export') continue
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) files.push(...walkFiles(fullPath))
      else files.push(fullPath)
    }
    return files
  }
  for (const file of walkFiles(targetPath).sort()) {
    hash.update(file.slice(targetPath.length))
    hash.update(readFileSync(file))
  }
  return hash.digest('hex').slice(0, 16)
}

export async function runConcurrent<T>(
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

export function log(message: string, type: 'info' | 'success' | 'error' | 'warn' = 'info') {
  const prefix = {
    info: '\x1b[36m[INFO]\x1b[0m',
    success: '\x1b[32m[OK]\x1b[0m',
    error: '\x1b[31m[ERROR]\x1b[0m',
    warn: '\x1b[33m[WARN]\x1b[0m',
  }
  console.log(`${prefix[type]} ${message}`)
}
