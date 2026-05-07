export const prerender = false;

import type { APIRoute } from 'astro';

const PLANTAFORMAS = 'https://plantaformas.org';
const CONF_ID = '61';
const CONF_SLUG = 'SoberaniaDigital';
const CACHE_TTL_MS = 60_000;

let cache: unknown = null;
let cacheTime = 0;

async function login(email: string, password: string): Promise<string> {
  const jar: string[] = [];
  const loginPage = await fetch(`${PLANTAFORMAS}/users/sign_in`);
  const html = await loginPage.text();
  const csrf = html.match(/name="authenticity_token" value="([^"]+)"/)?.[1];
  if (!csrf) throw new Error('CSRF token não encontrado');
  for (const c of loginPage.headers.getSetCookie?.() ?? []) jar.push(c.split(';')[0]);

  const res = await fetch(`${PLANTAFORMAS}/users/sign_in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': jar.join('; ') },
    body: new URLSearchParams({
      authenticity_token: csrf,
      'user[email]': email,
      'user[password]': password,
      'user[remember_me]': '0',
    }).toString(),
    redirect: 'manual',
  });

  for (const c of res.headers.getSetCookie?.() ?? []) {
    const v = c.split(';')[0];
    const n = v.split('=')[0];
    const i = jar.findIndex(e => e.startsWith(`${n}=`));
    if (i >= 0) jar.splice(i, 1);
    jar.push(v);
  }

  return jar.join('; ');
}

async function fetchParceiros(cookie: string) {
  const query = `{ conference(id: "${CONF_ID}") { partners { id name partnerType weight logo link } } }`;
  const r = await fetch(`${PLANTAFORMAS}/api`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': cookie },
    body: JSON.stringify({ query }),
  });
  const { data } = await r.json();
  return ((data?.conference?.partners ?? []) as any[]).sort((a, b) => a.weight - b.weight);
}

async function fetchInscritos(cookie: string): Promise<number | null> {
  const r = await fetch(`${PLANTAFORMAS}/admin/conferences/${CONF_SLUG}/components`, {
    headers: { 'Cookie': cookie },
  });
  const html = await r.text();
  const m = html.match(/Formulário\s*(?:de)?\s*Inscri[cç][ãa]o\s*<span\s+class="component-counter">\s*(\d+)\s*<\/span>/i);
  return m ? parseInt(m[1], 10) : null;
}

export const GET: APIRoute = async () => {
  const email = import.meta.env.PLANTAFORMAS_EMAIL;
  const password = import.meta.env.PLANTAFORMAS_PASSWORD;

  if (!email || !password) {
    return Response.json({ error: 'Credenciais não configuradas' }, { status: 503 });
  }

  if (cache && Date.now() - cacheTime < CACHE_TTL_MS) {
    return Response.json(cache);
  }

  try {
    const cookie = await login(email, password);
    const [parceiros, inscritos] = await Promise.all([
      fetchParceiros(cookie),
      fetchInscritos(cookie),
    ]);
    cache = { parceiros, inscritos, atualizadoEm: new Date().toISOString() };
    cacheTime = Date.now();
    return Response.json(cache);
  } catch (err: any) {
    console.error('[api/dados]', err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
};
