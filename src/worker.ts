export default {
  async fetch(request: Request, env: { ASSETS: Fetcher }) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) {
      return response;
    }

    // 404の場合、親ディレクトリのindex.htmlを探す
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);

    while (pathParts.length > 0) {
      const indexPath = '/' + pathParts.join('/') + '/index.html';
      const indexReq = new Request(new URL(indexPath, url.origin));
      const indexResp = await env.ASSETS.fetch(indexReq);
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
