#!/usr/bin/env npx tsx
/**
 * sync-plantaformas.ts
 *
 * Sincronização bidirecional entre a planilha local (programacao.xlsx)
 * e o Plantaformas (Decidim GraphQL API).
 *
 * Uso:
 *   npx tsx scripts/sync-plantaformas.ts pull   # Plantaformas → planilha local
 *   npx tsx scripts/sync-plantaformas.ts push   # planilha local → Plantaformas
 *
 * Config: crie um .env com:
 *   PLANTAFORMAS_API_URL=https://plantaformas.org/api
 *   PLANTAFORMAS_TOKEN=seu_token_aqui
 *   PLANTAFORMAS_CONFERENCE_SLUG=SoberaniaDigital
 */

import ExcelJS from 'exceljs';
import path from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

// ═══════════════════════════════════════════════════════════════════════════
// Config
// ═══════════════════════════════════════════════════════════════════════════

const API_URL = process.env.PLANTAFORMAS_API_URL || 'https://plantaformas.org/api';
const TOKEN = process.env.PLANTAFORMAS_TOKEN || '';
const CONFERENCE_SLUG = process.env.PLANTAFORMAS_CONFERENCE_SLUG || 'SoberaniaDigital';

// ═══════════════════════════════════════════════════════════════════════════
// GraphQL Client
// ═══════════════════════════════════════════════════════════════════════════

async function graphql(query: string, variables?: Record<string, unknown>) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (TOKEN) {
    headers['Authorization'] = `Bearer ${TOKEN}`;
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GraphQL error ${res.status}: ${text.slice(0, 300)}`);
  }

  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL errors:', JSON.stringify(json.errors, null, 2));
    throw new Error('GraphQL query returned errors');
  }
  return json.data;
}

// ═══════════════════════════════════════════════════════════════════════════
// PULL: Plantaformas → dados locais
// ═══════════════════════════════════════════════════════════════════════════

interface PlantaformasMeeting {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
  speakers: { id: string; name: string; position?: string; affiliation?: string }[];
  address?: string; // sala/local
  category?: { name: string };
}

interface PlantaformasConference {
  id: string;
  title: string;
  meetings: PlantaformasMeeting[];
}

async function pullConference(): Promise<PlantaformasConference | null> {
  const query = `
    query($slug: String!) {
      conference(slug: $slug) {
        id
        title { translation(locale: "pt") }
        components {
          id
          name { translation(locale: "pt") }
          ... on Meetings {
            meetings {
              edges {
                node {
                  id
                  title { translation(locale: "pt") }
                  startTime
                  endTime
                  description { translation(locale: "pt") }
                  address
                  category { name { translation(locale: "pt") } }
                  speakers {
                    id
                    name
                    position
                    affiliation
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await graphql(query, { slug: CONFERENCE_SLUG });

  if (!data?.conference) {
    console.error(`Conferência "${CONFERENCE_SLUG}" não encontrada.`);
    return null;
  }

  const conf = data.conference;
  const meetings: PlantaformasMeeting[] = [];

  for (const component of conf.components || []) {
    if (component.meetings?.edges) {
      for (const edge of component.meetings.edges) {
        const m = edge.node;
        meetings.push({
          id: m.id,
          title: m.title?.translation || '',
          startTime: m.startTime,
          endTime: m.endTime,
          description: m.description?.translation,
          speakers: (m.speakers || []).map((s: any) => ({
            id: s.id,
            name: s.name,
            position: s.position,
            affiliation: s.affiliation,
          })),
          address: m.address,
          category: m.category?.name ? { name: m.category.name.translation } : undefined,
        });
      }
    }
  }

  return {
    id: conf.id,
    title: conf.title?.translation || '',
    meetings,
  };
}

/** Extrai palestrantes únicos a partir dos meetings */
function extractSpeakers(meetings: PlantaformasMeeting[]) {
  const map = new Map<string, { nome: string; organizacao: string; sessoes: string[] }>();
  for (const m of meetings) {
    for (const s of m.speakers) {
      const key = s.name.trim();
      if (!map.has(key)) {
        map.set(key, { nome: s.name, organizacao: s.affiliation || s.position || '', sessoes: [] });
      }
      if (!map.get(key)!.sessoes.includes(m.title)) {
        map.get(key)!.sessoes.push(m.title);
      }
    }
  }
  return [...map.values()].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

/** Converte meetings → formato de planilha (Programação) */
function meetingsToSheetRows(meetings: PlantaformasMeeting[]) {
  return meetings
    .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''))
    .map((m) => ({
      dia: m.startTime ? new Date(m.startTime).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', weekday: 'short' }) : '',
      local: m.address || '',
      inicio: m.startTime ? new Date(m.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '',
      fim: m.endTime ? new Date(m.endTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '',
      tipo: m.category?.name || '',
      mesa: '',
      titulo: m.title,
      responsavel: '',
      notas: m.description || '',
    }));
}

/** Converte speakers → formato de planilha (Palestrantes) */
function speakersToSheetRows(
  meetings: PlantaformasMeeting[]
) {
  const rows: { dia: string; mesa: string; nome: string; organizacao: string; papel: string; status: string; obs: string }[] = [];
  for (const m of meetings) {
    for (const s of m.speakers) {
      rows.push({
        dia: m.startTime ? new Date(m.startTime).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', weekday: 'short' }) : '',
        mesa: m.title,
        nome: s.name,
        organizacao: s.affiliation || '',
        papel: s.position || '',
        status: 'CONFIRMADO',
        obs: '',
      });
    }
  }
  return rows;
}

// ═══════════════════════════════════════════════════════════════════════════
// PUSH: planilha local → Plantaformas
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Lê a planilha local e gera mutations GraphQL para criar/atualizar
 * meetings e speakers no Plantaformas.
 *
 * ⚠️ A API GraphQL do Decidim é majoritariamente read-only.
 * Para escrita, é necessário usar a API REST de admin ou mutations
 * específicas (se disponíveis). Esta função prepara o payload.
 */
async function pushFromSpreadsheet() {
  const {
    lerProgramacao,
  } = await import('../src/utils/programacao');

  const prog = await lerProgramacao();

  console.log(`📋 Lidos: ${prog.sessoes.length} sessões, ${prog.stands.length} stands`);
  console.log(`   Palestrantes únicos: ${new Set(prog.sessoes.flatMap((s) => s.palestrantes.map((p) => p.nome))).size}`);

  // Exibe o que seria enviado
  const meetings = prog.sessoes.map((s) => ({
    title: s.titulo,
    startTime: `${s.dia.split(' ')[0]}/${new Date().getFullYear().toString().slice(-2)} ${s.inicio}`,
    endTime: s.fim ? `${s.dia.split(' ')[0]}/${new Date().getFullYear().toString().slice(-2)} ${s.fim}` : undefined,
    address: s.local,
    description: s.notas,
    speakers: s.palestrantes
      .filter((p) => /confirmad/i.test(p.status))
      .map((p) => ({
        name: p.nome,
        affiliation: p.organizacao,
        position: p.papel,
      })),
  }));

  console.log('\n📤 Payload para Plantaformas:');
  console.log(JSON.stringify({ conference_slug: CONFERENCE_SLUG, meetings }, null, 2));

  console.log('\n⚠️  A API GraphQL pública do Decidim é read-only.');
  console.log('   Para criar meetings, use:');
  console.log('   1. POST https://plantaformas.org/api/rest/... (se REST API habilitada)');
  console.log('   2. Ou importe via admin: https://plantaformas.org/admin/conferences/');
  console.log('   3. Ou CSV import na interface de admin');
}

// ═══════════════════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  const cmd = process.argv[2];

  if (!TOKEN) {
    console.warn('⚠️  PLANTAFORMAS_TOKEN não definido. Operações de leitura podem falhar.');
    console.warn('   Defina no .env: PLANTAFORMAS_TOKEN=seu_token\n');
  }

  if (cmd === 'pull') {
    console.log(`📥 Puxando dados do Plantaformas (slug: ${CONFERENCE_SLUG})...\n`);
    const conf = await pullConference();
    if (!conf) return;

    console.log(`Conferência: ${conf.title}`);
    console.log(`Meetings: ${conf.meetings.length}`);
    console.log(`Palestrantes: ${extractSpeakers(conf.meetings).length}\n`);

    // Gera JSON de saída
    const output = {
      geradoEm: new Date().toISOString(),
      fonte: `Plantaformas /api - conference ${CONFERENCE_SLUG}`,
      sessoes: meetingsToSheetRows(conf.meetings),
      palestrantes: speakersToSheetRows(conf.meetings),
    };

    const outPath = path.resolve(__dirname, '../src/data/plantaformas-pull.json');
    writeFileSync(outPath, JSON.stringify(output, null, 2));
    console.log(`✅ Dados salvos em: ${outPath}`);

    // Exibe resumo
    for (const m of conf.meetings.slice(0, 5)) {
      console.log(`  📅 ${m.startTime} — ${m.title} [${m.address}]`);
      for (const s of m.speakers) {
        console.log(`      👤 ${s.name}${s.affiliation ? ` (${s.affiliation})` : ''}`);
      }
    }
    if (conf.meetings.length > 5) console.log(`  ... +${conf.meetings.length - 5} sessões`);
  } else if (cmd === 'push') {
    console.log('📤 Preparando envio da planilha → Plantaformas...\n');
    await pushFromSpreadsheet();
  } else {
    console.log(`
🔁 sync-plantaformas — sincronização Plantaformas ↔ planilha local

Uso:
  npx tsx scripts/sync-plantaformas.ts pull     Plantaformas → dados locais
  npx tsx scripts/sync-plantaformas.ts push     planilha local → Plantaformas

Config (.env):
  PLANTAFORMAS_API_URL=https://plantaformas.org/api
  PLANTAFORMAS_TOKEN=seu_token_de_api
  PLANTAFORMAS_CONFERENCE_SLUG=SoberaniaDigital

📖 A API do Plantaformas é Decidim GraphQL (docs em PDF no projeto).
   - Leitura (pull): GraphQL em /api — requer token de autenticação
   - Escrita (push): API majoritariamente read-only no GraphQL;
     use REST API de admin ou import CSV pela interface web
    `);
  }
}

main().catch(console.error);
