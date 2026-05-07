/**
 * Lê src/data/programacao.xlsx e gera src/data/programacao-gerado.json.
 * Deve rodar antes do astro build (ver package.json → "build" script).
 */
import ExcelJS from 'exceljs';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const XLSX = path.join(root, 'src/data/programacao.xlsx');
const OUT  = path.join(root, 'src/data/programacao-gerado.json');

function str(val) {
  if (val == null) return '';
  if (typeof val === 'object' && 'richText' in val)
    return val.richText.map((r) => r.text).join('');
  return String(val).trim();
}

function rowVals(row, n) {
  return Array.from({ length: n }, (_, i) => str(row.getCell(i + 1).value));
}

const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(XLSX);

// ── Palestrantes ──────────────────────────────────────────────────────────
const palMap = new Map();
const wsPal = wb.getWorksheet('Palestrantes');
wsPal?.eachRow((row, rn) => {
  if (rn === 1) return;
  const [dia, , mesa, nome, org, papel, status, obs] = rowVals(row, 8);
  if (!nome) return;
  const key = `${dia}|${mesa}`;
  if (!palMap.has(key)) palMap.set(key, []);
  palMap.get(key).push({ nome, organizacao: org, papel, status, obs });
});

// ── Sessões ───────────────────────────────────────────────────────────────
const sessoes = [];
const wsProg = wb.getWorksheet('Programação');
wsProg?.eachRow((row, rn) => {
  if (rn === 1) return;
  const [dia, local, inicio, fim, tipo, mesa, titulo, responsavel, notas] = rowVals(row, 9);
  if (!dia && !titulo) return;
  sessoes.push({
    dia, local, inicio, fim, tipo, mesa, titulo, responsavel, notas,
    palestrantes: palMap.get(`${dia}|${mesa}`) ?? [],
  });
});

// ── Stands ────────────────────────────────────────────────────────────────
const stands = [];
const wsStands = wb.getWorksheet('Stands');
wsStands?.eachRow((row, rn) => {
  if (rn === 1) return;
  const [organizacao, statusAceite, statusEmail, contato, obs] = rowVals(row, 5);
  if (!organizacao) return;
  stands.push({ organizacao, statusAceite, statusEmail, contato, obs });
});

// ── Parceiros ─────────────────────────────────────────────────────────────
const partnersGrid = {
  realizacao: [],
  producao: [],
  patrocinio: [],
  apoio: [],
};

const wsPartners = wb.getWorksheet('Parceiros');
wsPartners?.eachRow((row, rn) => {
  if (rn === 1) return;
  const [categoria, nome, url, logo, logoType] = rowVals(row, 5);
  if (!nome) return;

  const partner = { nome, url, logo, logoType: logoType || 'color' };
  const cat = categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (cat.includes('realizacao')) partnersGrid.realizacao.push(partner);
  else if (cat.includes('producao') || cat.includes('organizacao')) partnersGrid.producao.push(partner);
  else if (cat.includes('patrocinio') || cat.includes('apoio institucional')) partnersGrid.patrocinio.push(partner);
  else if (cat.includes('apoio')) partnersGrid.apoio.push(partner);
});

// ── Escreve JSON ──────────────────────────────────────────────────────────
const out = { geradoEm: new Date().toISOString(), sessoes, stands };
writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf-8');
console.log(`✓ programacao-gerado.json — ${sessoes.length} sessões, ${stands.length} stands`);

const PARTNERS_OUT = path.join(root, 'src/data/parceiros.json');
writeFileSync(PARTNERS_OUT, JSON.stringify({ ...partnersGrid, atualizadoEm: new Date().toISOString() }, null, 2), 'utf-8');
console.log(`✓ parceiros.json — ${Object.values(partnersGrid).flat().length} parceiros unificados`);
