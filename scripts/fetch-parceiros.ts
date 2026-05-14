#!/usr/bin/env npx tsx
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://plantaformas.org';
const CONF_SLUG = process.env.CONF_SLUG || 'SoberaniaDigital';
const OUT = path.join(__dirname, '..', 'src', 'data', 'parceiros.json');

interface Partner {
  nome: string;
  url: string;
  logo: string;
}

interface PartnersData {
  organizadores: Partner[];
  atualizadoEm: string;
  fonte: string;
}

function extractPartners(html: string): Partner[] {
  const partners: Partner[] = [];
  const itemRe =
    /class="conference__grid-item"[^>]*href="([^"]*)"[^>]*>[\s\S]*?<img[^>]*src="([^"]*)"[^>]*>[\s\S]*?conference__grid-item-text">([^<]*)<\/h3/g;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(html)) !== null) {
    partners.push({
      url: m[1],
      logo: m[2],
      nome: m[3].trim(),
    });
  }
  return partners;
}

async function main() {
  const url = `${BASE_URL}/conferences/${CONF_SLUG}`;
  console.log(`⏳ Buscando parceiros: ${url}`);

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`❌ HTTP ${res.status}`);
    process.exit(1);
  }

  const html = await res.text();
  const organizadores = extractPartners(html);

  if (organizadores.length === 0) {
    console.warn('⚠️  Nenhum parceiro encontrado. Mantendo arquivo anterior se existir.');
    if (fs.existsSync(OUT)) {
      console.log('📄 Mantendo:', OUT);
    }
    return;
  }

  const data: PartnersData = {
    organizadores,
    atualizadoEm: new Date().toISOString(),
    fonte: `${BASE_URL}/conferences/${CONF_SLUG} — #conference-partners-main_promotor`,
  };

  fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`✅ ${organizadores.length} parceiros salvos em ${OUT}`);
  organizadores.forEach((p) => console.log(`   - ${p.nome}`));
}

main().catch((e) => {
  console.error('❌ Erro:', e);
  process.exit(1);
});
