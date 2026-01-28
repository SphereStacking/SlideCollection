import { mkdirSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { getPublishedSlides, DIST_DIR, BASE_URL, log } from './utils.js'

function generateRedirectHtml(targetUrl: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=${targetUrl}">
  <title>Redirecting to ${title}</title>
  <script>window.location.href='${targetUrl}';</script>
</head>
<body>
  <p>Redirecting to <a href="${targetUrl}">${title}</a>...</p>
</body>
</html>`
}

async function generateRedirects() {
  log('Generating redirects...')

  const slides = await getPublishedSlides()
  let count = 0

  for (const slide of slides) {
    const legacyPath = slide.meta.legacyPath
    const newPath = slide.outputPath

    if (legacyPath && legacyPath !== newPath) {
      const redirectDir = join(DIST_DIR, legacyPath)
      const redirectFile = join(redirectDir, 'index.html')
      const targetUrl = `${BASE_URL}/${newPath}/`

      if (!existsSync(redirectDir)) {
        mkdirSync(redirectDir, { recursive: true })
      }

      const html = generateRedirectHtml(targetUrl, slide.title)
      writeFileSync(redirectFile, html)

      log(`Redirect: /${legacyPath}/ -> /${newPath}/`, 'success')
      count++
    }
  }

  if (count === 0) {
    log('No redirects needed (all paths match)', 'info')
  } else {
    log(`Generated ${count} redirect(s)`, 'success')
  }
}

generateRedirects().catch((error) => {
  console.error(error)
  process.exit(1)
})
