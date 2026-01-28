import { mkdirSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import { getPublishedSlides, DIST_DIR, log } from './utils.js'

async function generateRedirects() {
  log('Generating redirects...')

  const slides = await getPublishedSlides()
  const redirectRules: string[] = []

  // SPAルーティング用のルールを追加
  for (const slide of slides) {
    redirectRules.push(`/${slide.outputPath}/* /${slide.outputPath}/index.html 200`)
  }

  redirectRules.push('')
  redirectRules.push('# Legacy URL redirects')

  // 旧URLから新URLへのリダイレクト
  let count = 0
  for (const slide of slides) {
    const legacyPath = slide.meta.legacyPath
    const newPath = slide.outputPath

    if (legacyPath && legacyPath !== newPath) {
      // Cloudflare Pages用の301リダイレクト
      redirectRules.push(`/${legacyPath}/* /${newPath}/:splat 301`)
      log(`Redirect: /${legacyPath}/ -> /${newPath}/`, 'success')
      count++
    }
  }

  // _redirectsファイルを生成
  if (!existsSync(DIST_DIR)) {
    mkdirSync(DIST_DIR, { recursive: true })
  }

  const redirectsContent = redirectRules.join('\n')
  writeFileSync(join(DIST_DIR, '_redirects'), redirectsContent)
  log('Generated _redirects file', 'success')

  if (count === 0) {
    log('No legacy redirects needed (all paths match)', 'info')
  } else {
    log(`Generated ${count} legacy redirect rule(s)`, 'success')
  }
}

generateRedirects().catch((error) => {
  console.error(error)
  process.exit(1)
})
