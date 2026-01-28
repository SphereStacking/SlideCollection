export default {
  async fetch(request: Request, env: { ASSETS: Fetcher }) {
    const url = new URL(request.url);

    // 静的アセットを試す
    const response = await env.ASSETS.fetch(url);
    if (response.status !== 404) {
      return response;
    }

    // 404の場合、親ディレクトリのindex.htmlを探す
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
