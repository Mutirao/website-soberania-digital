export const prerender = false;

import type { APIRoute } from 'astro';

const PLANTAFORMAS = 'https://plantaformas.org';
const CONF_ID = '61';
const CONF_SLUG = 'SoberaniaDigital';
const CACHE_TTL_MS = 60_000;
const FETCH_TIMEOUT_MS = 15_000;

interface Partner {
  id: string;
  name: string;
  partnerType: string;
  weight: number;
  logo: string;
  link: string;
}

interface DadosResponse {
  parceiros: Partner[];
  inscritos: number | null;
  atualizadoEm: string;
}

let cache: DadosResponse | null = null;
let cacheTime = 0;

async function login(email: string, password: string): Promise<string> {
  const jar: string[] = [];

  const loginPage = await fetch(`${PLANTAFORMAS}/users/sign_in`, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!loginPage.ok) {
    throw new Error(`Login page returned ${loginPage.status}`);
  }

  const html = await loginPage.text();
  const csrf = html.match(/name="authenticity_token" value="([^"]+)"/)?.[1];
  if (!csrf) throw new Error('CSRF token not found');

  for (const c of loginPage.headers.getSetCookie?.() ?? []) jar.push(c.split(';')[0]);

  const res = await fetch(`${PLANTAFORMAS}/users/sign_in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Cookie: jar.join('; ') },
    body: new URLSearchParams({
      authenticity_token: csrf,
      'user[email]': email,
      'user[password]': password,
      'user[remember_me]': '0',
    }).toString(),
    redirect: 'manual',
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  for (const c of res.headers.getSetCookie?.() ?? []) {
    const v = c.split(';')[0];
    const n = v.split('=')[0];
    const i = jar.findIndex((e) => e.startsWith(`${n}=`));
    if (i >= 0) jar.splice(i, 1);
    jar.push(v);
  }

  return jar.join('; ');
}

async function fetchParceiros(cookie: string): Promise<Partner[]> {
  const query = `{ conference(id: "${CONF_ID}") { partners { id name partnerType weight logo link } } }`;
  const r = await fetch(`${PLANTAFORMAS}/api`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ query }),
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!r.ok) {
    throw new Error(`GraphQL request failed: ${r.status}`);
  }

  const json = await r.json();
  if (json.errors) {
    throw new Error(`GraphQL errors: ${json.errors[0]?.message ?? 'unknown'}`);
  }

  const partners: Partner[] = json.data?.conference?.partners ?? [];
  return partners.sort((a, b) => a.weight - b.weight);
}

async function fetchInscritos(cookie: string): Promise<number | null> {
  const r = await fetch(`${PLANTAFORMAS}/admin/conferences/${CONF_SLUG}/components`, {
    headers: { Cookie: cookie },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!r.ok) return null;

  const html = await r.text();
  const m = html.match(
    /Formulário\s*(?:de)?\s*Inscri[cç][ãa]o\s*<span\s+class="component-counter">\s*(\d+)\s*<\/span>/i
  );
  return m ? parseInt(m[1], 10) : null;
}

export const GET: APIRoute = async () => {
  const email = import.meta.env.PLANTAFORMAS_EMAIL;
  const password = import.meta.env.PLANTAFORMAS_PASSWORD;

  if (!email || !password) {
    return Response.json(
      { error: 'Credenciais não configuradas', code: 'CONFIG_MISSING' },
      {
        status: 503,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }

  if (cache && Date.now() - cacheTime < CACHE_TTL_MS) {
    return Response.json(cache, {
      headers: {
        'Cache-Control': 'public, max-age=30, stale-while-revalidate=60',
        'X-Cache': 'HIT',
      },
    });
  }

  try {
    const cookie = await login(email, password);
    const [parceiros, inscritos] = await Promise.all([fetchParceiros(cookie), fetchInscritos(cookie)]);

    cache = { parceiros, inscritos, atualizadoEm: new Date().toISOString() };
    cacheTime = Date.now();

    return Response.json(cache, {
      headers: {
        'Cache-Control': 'public, max-age=30, stale-while-revalidate=60',
        'X-Cache': 'MISS',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';

    if (message.includes('timeout') || message.includes('abort')) {
      return Response.json(
        { error: 'Upstream request timed out', code: 'TIMEOUT' },
        {
          status: 504,
          headers: { 'Cache-Control': 'no-store' },
        }
      );
    }

    console.error('[api/dados]', message);
    return Response.json(
      { error: message, code: 'UPSTREAM_ERROR' },
      {
        status: 502,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }
};
