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

function loadExistingOrMock(): PartnersData {
  if (fs.existsSync(OUT)) {
    const existing = JSON.parse(fs.readFileSync(OUT, 'utf-8')) as PartnersData;
    console.log(`📄 Mantendo dados existentes: ${existing.organizadores.length} parceiros`);
    return existing;
  }
  return {
    organizadores: [],
    atualizadoEm: new Date().toISOString(),
    fonte: 'mock — requisição não disponível',
  };
}

async function main() {
  const url = `${BASE_URL}/conferences/${CONF_SLUG}`;
  console.log(`⏳ Buscando parceiros: ${url}`);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`⚠️  ${message}`);
    const fallback = loadExistingOrMock();
    fs.writeFileSync(OUT, JSON.stringify(fallback, null, 2) + '\n');
    console.log(`📁 Fallback salvo em: ${OUT}`);
  }
}

main();
