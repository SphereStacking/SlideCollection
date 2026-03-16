import { join } from 'path'
import { getPublishedSlides, contentHash, ROOT_DIR } from './utils.js'

const SHARED_PATHS = [
  join(ROOT_DIR, 'components'),
  join(ROOT_DIR, 'package.json'),
]

const sharedHash = SHARED_PATHS.map((p) => contentHash(p)).join('-')
const slides = await getPublishedSlides()

const matrix = slides.map((s) => ({
  slug: s.meta.slug,
  outputPath: s.outputPath,
  hash: contentHash(s.dir),
}))

console.log(JSON.stringify({ sharedHash, matrix }))
