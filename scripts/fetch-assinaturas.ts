#!/usr/bin/env npx tsx
/**
 * fetch-assinaturas.ts
 *
 * Busca o número de respostas do formulário de inscrição da conferência
 * "SoberaniaDigital" no Plantaformas (painel admin Decidim).
 *
 * Resultado salvo em: src/data/assinaturas.json
 *
 * Config (.env):
 *   PLANTAFORMAS_EMAIL=seu@email.com
 *   PLANTAFORMAS_PASSWORD=sua_senha
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EMAIL = process.env.PLANTAFORMAS_EMAIL || '';
const PASSWORD = process.env.PLANTAFORMAS_PASSWORD || '';
const CONFERENCE_SLUG = process.env.PLANTAFORMAS_CONFERENCE_SLUG || 'SoberaniaDigital';
const BASE_URL = 'https://plantaformas.org';

interface AssinaturasData {
  total: number;
  atualizadoEm: string;
  fonte: string;
}

async function fetchAssinaturas(): Promise<AssinaturasData> {
  if (!EMAIL || !PASSWORD) {
    throw new Error('Defina PLANTAFORMAS_EMAIL e PLANTAFORMAS_PASSWORD no .env');
  }

  // Usamos fetch nativo + regex para evitar dependências extras
  const cookieJar: string[] = [];

  // 1. GET página de login → pega CSRF token
  const loginPage = await fetch(`${BASE_URL}/users/sign_in`);
  const loginHtml = await loginPage.text();
  const csrfMatch = loginHtml.match(/name="authenticity_token" value="([^"]+)"/);
  if (!csrfMatch) throw new Error('CSRF token não encontrado na página de login');
  const csrfToken = csrfMatch[1];

  // Extrai cookies da resposta
  const setCookieHeaders = loginPage.headers.getSetCookie?.() || loginPage.headers.get('set-cookie')?.split('\n') || [];
  for (const c of setCookieHeaders) {
    const cookieVal = c.split(';')[0];
    if (cookieVal) cookieJar.push(cookieVal);
  }

  const cookieHeader = cookieJar.join('; ');

  // 2. POST login
  const loginBody = new URLSearchParams({
    'authenticity_token': csrfToken,
    'user[email]': EMAIL,
    'user[password]': PASSWORD,
    'user[remember_me]': '0',
  });

  const loginRes = await fetch(`${BASE_URL}/users/sign_in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': cookieHeader,
    },
    body: loginBody.toString(),
    redirect: 'manual',
  });

  // Atualiza cookies
  const loginCookies = loginRes.headers.getSetCookie?.() || loginRes.headers.get('set-cookie')?.split('\n') || [];
  for (const c of loginCookies) {
    const cookieVal = c.split(';')[0];
    if (cookieVal) {
      const [name] = cookieVal.split('=');
      cookieJar.push(cookieVal);
      // Remove duplicatas (substitui cookie existente)
      const idx = cookieJar.findIndex(existing => existing.startsWith(name + '='));
      if (idx >= 0 && idx !== cookieJar.length - 1) {
        cookieJar.splice(idx, 1);
      }
    }
  }

  if (loginRes.status !== 302 && loginRes.status !== 200) {
    console.error(`Login status: ${loginRes.status}`);
    throw new Error('Falha ao autenticar no Plantaformas');
  }

  const authCookie = cookieJar.join('; ');

  // 3. GET página de componentes da conferência no admin
  const componentsRes = await fetch(
    `${BASE_URL}/admin/conferences/${CONFERENCE_SLUG}/components`,
    { headers: { 'Cookie': authCookie } }
  );

  if (!componentsRes.ok) {
    throw new Error(`Falha ao acessar admin (${componentsRes.status}). Verifique permissões de admin.`);
  }

  const componentsHtml = await componentsRes.text();

  // 4. Extrai o número do componente "Formulário de Inscrição"
  // O HTML do Decidim admin renderiza: Formulário de Inscrição<span class="component-counter">XXX</span>
  const match = componentsHtml.match(/Formulário\s*(?:de)?\s*Inscri[cç][ãa]o\s*<span\s+class="component-counter">\s*(\d+)\s*<\/span>/i);
  if (!match) {
    // Tenta exportar a contagem de outro componente ou padrão
    console.error('Não encontrou "Formulário de InscriçãoXXX" na página de admin');
    console.error('HTML snippet:', componentsHtml.substring(
      Math.max(0, componentsHtml.indexOf('Inscri') - 200),
      componentsHtml.indexOf('Inscri') + 200
    ));
    throw new Error('Contador de inscrições não encontrado');
  }

  const total = parseInt(match[1], 10);
  console.log(`✅ ${total} inscrições no formulário`);

  return {
    total,
    atualizadoEm: new Date().toISOString(),
    fonte: `Plantaformas admin — /admin/conferences/${CONFERENCE_SLUG}/components`,
  };
}

async function main() {
  try {
    const data = await fetchAssinaturas();
    const outPath = path.resolve(__dirname, '../src/data/assinaturas.json');
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
    console.log(`📁 Salvo em: ${outPath}`);
    console.log(`   Total: ${data.total} inscrições`);
  } catch (err: any) {
    console.error(`❌ Erro: ${err.message}`);
    process.exit(1);
  }
}

main();
