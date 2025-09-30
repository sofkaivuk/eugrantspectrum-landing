export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  if (url.pathname !== '/eugrantspectrum.org/auth/gumroad
      ') return new Response('Not found', {status: 404});

  const licence = url.searchParams.get('licence') || '';
  const gr = await fetch('https://api.gumroad.com/v2/licenses/verify', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `product_permalink=eugrantspectrum&license_key=${licence}`
  });
  return new Response(JSON.stringify({valid: gr.ok}), {
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    status: gr.ok ? 200 : 401
  });
}
