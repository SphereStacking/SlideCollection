const ALLOWED_ORIGINS: (string | RegExp)[] = [
  'https://spherestacking.com',
  'https://www.spherestacking.com',
  /^https:\/\/.*\.spherestacking\.com$/,
  /^http:\/\/localhost(:\d+)?$/,
];

function isAllowedOrigin(origin: string | null): string | null {
  if (!origin) return null;
  for (const allowed of ALLOWED_ORIGINS) {
    if (typeof allowed === 'string' && allowed === origin) return origin;
    if (allowed instanceof RegExp && allowed.test(origin)) return origin;
  }
  return null;
}

function createJsonHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin');
  const allowedOrigin = isAllowedOrigin(origin);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=300',
  };

  if (allowedOrigin) {
    headers['Access-Control-Allow-Origin'] = allowedOrigin;
    headers['Vary'] = 'Origin';
  }

  return headers;
}

export default {
  async fetch(request: Request, env: { ASSETS: Fetcher }) {
    const url = new URL(request.url);

    // /slides.json API エンドポイント
    if (url.pathname === '/slides.json') {
      // CORS プリフライト
      if (request.method === 'OPTIONS') {
        const origin = request.headers.get('Origin');
        const allowedOrigin = isAllowedOrigin(origin);
        if (!allowedOrigin) {
          return new Response(null, { status: 403 });
        }
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': allowedOrigin,
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Max-Age': '86400',
            'Vary': 'Origin',
          },
        });
      }

      const response = await env.ASSETS.fetch(url);
      const headers = createJsonHeaders(request);

      if (response.status === 404) {
        return new Response(JSON.stringify({ error: 'Not found' }), {
          status: 404,
          headers,
        });
      }

      return new Response(response.body, {
        status: 200,
        headers,
      });
    }

    // 静的アセットを試す
    const response = await env.ASSETS.fetch(url);
    if (response.status !== 404) {
      return response;
    }

    // 404の場合、親ディレクトリのindex.htmlを探す（SPA対応）
    const pathParts = url.pathname.split('/').filter(Boolean);

    while (pathParts.length > 0) {
      const indexUrl = new URL('/' + pathParts.join('/') + '/index.html', url.origin);
      const indexResp = await env.ASSETS.fetch(indexUrl);
      if (indexResp.status !== 404) {
        return new Response(indexResp.body, {
          status: 200,
          headers: indexResp.headers,
        });
      }
      pathParts.pop();
    }

    return response;
  },
};
