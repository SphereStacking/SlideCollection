import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  ASSETS: Fetcher
}

const ALLOWED_ORIGINS = [
  'https://spherestacking.com',
  'https://www.spherestacking.com',
  /^https:\/\/.*\.spherestacking\.com$/,
  /^http:\/\/localhost(:\d+)?$/,
]

function isAllowedOrigin(origin: string): boolean {
  return ALLOWED_ORIGINS.some((allowed) =>
    typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
  )
}

const app = new Hono<{ Bindings: Bindings }>()

// /slides.json API エンドポイント
app.use(
  '/slides.json',
  cors({
    origin: (origin) => (isAllowedOrigin(origin) ? origin : ''),
    maxAge: 86400,
  })
)

app.get('/slides.json', async (c) => {
  const response = await c.env.ASSETS.fetch(new URL('/slides.json', c.req.url))

  if (response.status === 404) {
    return c.json({ error: 'Not found' }, 404, {
      'Cache-Control': 'public, max-age=300',
    })
  }

  const data = await response.json()
  return c.json(data, 200, {
    'Cache-Control': 'public, max-age=300',
  })
})

// 静的アセット + SPA フォールバック
app.all('*', async (c) => {
  const url = new URL(c.req.url)

  // 静的アセットを試す
  const response = await c.env.ASSETS.fetch(url)
  if (response.status !== 404) {
    return response
  }

  // 404の場合、親ディレクトリのindex.htmlを探す（SPA対応）
  const pathParts = url.pathname.split('/').filter(Boolean)

  while (pathParts.length > 0) {
    const indexUrl = new URL('/' + pathParts.join('/') + '/index.html', url.origin)
    const indexResp = await c.env.ASSETS.fetch(indexUrl)
    if (indexResp.status !== 404) {
      return new Response(indexResp.body, {
        status: 200,
        headers: indexResp.headers,
      })
    }
    pathParts.pop()
  }

  return response
})

export default app
