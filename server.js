import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8080;

const BASE_URL = 'https://plantaformas.org';
const CONF_ID = '61';
const CONF_SLUG = 'SoberaniaDigital';
const CACHE_TTL_MS = 60_000;

let cache = null;
let cacheTime = 0;

async function login() {
  const jar = [];
  const loginPage = await fetch(`${BASE_URL}/users/sign_in`);
  const html = await loginPage.text();
  const csrf = html.match(/name="authenticity_token" value="([^"]+)"/)?.[1];
  if (!csrf) throw new Error('CSRF token não encontrado');
  for (const c of loginPage.headers.getSetCookie?.() ?? []) jar.push(c.split(';')[0]);

  const res = await fetch(`${BASE_URL}/users/sign_in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': jar.join('; ') },
    body: new URLSearchParams({
      authenticity_token: csrf,
      'user[email]': process.env.PLANTAFORMAS_EMAIL ?? '',
      'user[password]': process.env.PLANTAFORMAS_PASSWORD ?? '',
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

async function fetchParceiros(cookie) {
  const query = `{ conference(id: "${CONF_ID}") { partners { id name partnerType weight logo link } } }`;
  const r = await fetch(`${BASE_URL}/api`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': cookie },
    body: JSON.stringify({ query }),
  });
  const { data } = await r.json();
  return (data?.conference?.partners ?? []).sort((a, b) => a.weight - b.weight);
}

async function fetchInscritos(cookie) {
  const r = await fetch(`${BASE_URL}/admin/conferences/${CONF_SLUG}/components`, {
    headers: { 'Cookie': cookie },
  });
  const html = await r.text();
  const m = html.match(/Formulário\s*(?:de)?\s*Inscri[cç][ãa]o\s*<span\s+class="component-counter">\s*(\d+)\s*<\/span>/i);
  return m ? parseInt(m[1], 10) : null;
}

async function getDados() {
  if (cache && Date.now() - cacheTime < CACHE_TTL_MS) return cache;
  const cookie = await login();
  const [parceiros, inscritos] = await Promise.all([
    fetchParceiros(cookie),
    fetchInscritos(cookie),
  ]);
  cache = { parceiros, inscritos, atualizadoEm: new Date().toISOString() };
  cacheTime = Date.now();
  return cache;
}

app.get('/api/dados', async (req, res) => {
  if (!process.env.PLANTAFORMAS_EMAIL || !process.env.PLANTAFORMAS_PASSWORD) {
    return res.status(503).json({ error: 'Credenciais não configuradas' });
  }
  try {
    const dados = await getDados();
    res.json(dados);
  } catch (err) {
    console.error('API error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
  const p = path.join(__dirname, 'dist', '404.html');
  if (existsSync(p)) res.status(404).sendFile(p);
  else res.status(404).send('Not found');
});

app.listen(PORT, () => console.log(`Servidor ouvindo em :${PORT}`));
