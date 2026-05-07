import ExcelJS from 'exceljs';
import { fileURLToPath } from 'url';
import path from 'path';

// ─── Types ────────────────────────────────────────────────────────────────

export type StatusPalestrante =
  | 'CONFIRMADO'
  | 'CONFIRMADA'
  | 'A CONFIRMAR'
  | 'A CONVIDAR'
  | 'DESCONFIRMADO'
  | 'SEM RESPOSTA'
  | string;

export interface Palestrante {
  nome: string;
  organizacao: string;
  papel: string;
  status: StatusPalestrante;
  obs: string;
}

export interface Sessao {
  dia: string;
  local: string;
  inicio: string;
  fim: string;
  tipo: string;
  mesa: string;
  titulo: string;
  responsavel: string;
  notas: string;
  palestrantes: Palestrante[];
}

export interface Stand {
  organizacao: string;
  statusAceite: string;
  statusEmail: string;
  contato: string;
  obs: string;
}

export interface Programacao {
  geradoEm: string;
  sessoes: Sessao[];
  stands: Stand[];
}

// ─── Reader ───────────────────────────────────────────────────────────────

function str(val: ExcelJS.CellValue): string {
  if (val == null) return '';
  if (typeof val === 'object' && 'richText' in val) {
    return (val as ExcelJS.CellRichTextValue).richText.map((r) => r.text).join('');
  }
  return String(val).trim();
}

function rowValues(row: ExcelJS.Row, count: number): string[] {
  return Array.from({ length: count }, (_, i) => str(row.getCell(i + 1).value));
}

export async function lerProgramacao(): Promise<Programacao> {
  const xlsxPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../data/programacao.xlsx'
  );

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(xlsxPath);

  // ── Palestrantes (aba 2) ────────────────────────────────────────────────
  const wsPal = wb.getWorksheet('Palestrantes');
  const palMap = new Map<string, Palestrante[]>(); // key: `${dia}|${mesa}`

  if (wsPal) {
    wsPal.eachRow((row, rn) => {
      if (rn === 1) return;
      const [dia, , mesa, nome, org, papel, status, obs] = rowValues(row, 8);
      if (!nome) return;
      const key = `${dia}|${mesa}`;
      if (!palMap.has(key)) palMap.set(key, []);
      palMap.get(key)!.push({ nome, organizacao: org, papel, status, obs });
    });
  }

  // ── Programação (aba 1) ─────────────────────────────────────────────────
  const wsProg = wb.getWorksheet('Programação');
  const sessoes: Sessao[] = [];

  if (wsProg) {
    wsProg.eachRow((row, rn) => {
      if (rn === 1) return;
      const [dia, local, inicio, fim, tipo, mesa, titulo, responsavel, notas] = rowValues(row, 9);
      if (!dia && !titulo) return;
      const palestrantes = palMap.get(`${dia}|${mesa}`) ?? [];
      sessoes.push({ dia, local, inicio, fim, tipo, mesa, titulo, responsavel, notas, palestrantes });
    });
  }

  // ── Stands (aba 3) ──────────────────────────────────────────────────────
  const wsStands = wb.getWorksheet('Stands');
  const stands: Stand[] = [];

  if (wsStands) {
    wsStands.eachRow((row, rn) => {
      if (rn === 1) return;
      const [organizacao, statusAceite, statusEmail, contato, obs] = rowValues(row, 5);
      if (!organizacao) return;
      stands.push({ organizacao, statusAceite, statusEmail, contato, obs });
    });
  }

  return { geradoEm: new Date().toISOString(), sessoes, stands };
}

// ─── Helper: converte para o formato schedule usado por evento.json ────────

export function toScheduleFormat(sessoes: Sessao[]) {
  const locals = [...new Set(sessoes.map((s) => s.local))];

  return locals.map((local) => {
    const dias = [...new Set(sessoes.filter((s) => s.local === local).map((s) => s.dia))];

    return dias.map((dia) => ({
      local,
      dia,
      sessoes: sessoes
        .filter((s) => s.local === local && s.dia === dia)
        .map((s) => ({
          inicio: s.inicio,
          fim: s.fim,
          tipo: s.tipo,
          mesa: s.mesa,
          titulo: s.titulo,
          responsavel: s.responsavel,
          notas: s.notas,
          palestrantes: s.palestrantes,
        })),
    }));
  }).flat();
}
