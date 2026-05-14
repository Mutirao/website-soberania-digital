import type { Sessao, DiaData, DiaConfig, ProcessedSession, TimeAxisItem, PalestranteResumo } from '~/types/schedule';
import type { Bio, BiosMap } from '~/types/bio';

export const BASE_MIN = 8 * 60;
export const SLOT_MIN = 15;
export const SLOT_H_PX = 36;

export const locaisOrder = ['Anfiteatro', 'Auditório 1', 'Auditório 2', 'Sala VIP'];
export const locaisShort = ['Anfiteatro', 'Aud. 1', 'Aud. 2', 'Sala VIP'];

export const diasConf: DiaConfig[] = [
  { key: 'dia1', diaVal: '18/05', label: '18 de Maio', color: '#CC2200', endMin: 20 * 60 + 30 },
  { key: 'dia2', diaVal: '19/05', label: '19 de Maio', color: '#1a5c2a', endMin: 20 * 60 + 30 },
];

export function mesaLabel(s: Sessao): string {
  if (s.tipo === 'Intervalo') return 'Intervalo';
  if (s.tipo === 'Conferência') return 'Conferência';
  if (s.tipo === 'Plenária') return 'Plenária';
  if (s.tipo === 'Roda de Conversa') return 'Roda de Conversa';
  if (s.tipo === 'Lançamento') return 'Lançamento';
  if (s.tipo === 'Reunião') return 'Reunião';
  if (s.tipo === 'Podcast') return 'Podcast';
  if (s.tipo === 'Abertura') return 'Abertura';
  if (s.tipo === 'Mesa') {
    const m = s.titulo.match(/^Mesa\s+de\s+Abertura/i);
    if (m) return 'Mesa de Abertura';
    return 'Mesa';
  }
  return s.tipo || 'Atividade';
}

export function cleanTitle(t: string): string {
  return t.replace(/^(Mesa\s+\d+|Conferência|Plenária|Lançamento|Roda de Conversa|Reunião)\s*[-–—:]\s*/, '');
}

const SENTINEL_TIMES = new Set(['?', 'tarde', 'manhã', 'noite']);

export function parseMin(t: string | undefined): number | null {
  if (!t) return null;
  const trimmed = t.trim();
  if (!trimmed || SENTINEL_TIMES.has(trimmed.toLowerCase())) return null;
  const [h, m] = trimmed.split(':').map((n) => parseInt(n, 10));
  if (isNaN(h)) return null;
  return h * 60 + (isNaN(m) ? 0 : m);
}

export function minToTime(m: number): string {
  const h = Math.floor(m / 60),
    min = m % 60;
  return min === 0 ? `${h}h` : `${h}h${String(min).padStart(2, '0')}`;
}

function toRow(min: number): number {
  return Math.max(2, Math.round((min - BASE_MIN) / SLOT_MIN) + 2);
}

function buildPalList(ss: Sessao[]): PalestranteResumo[] {
  const palMap: Record<string, PalestranteResumo> = {};
  for (const s of ss) {
    const titulo = cleanTitle(s.titulo);
    for (const p of s.palestrantes || []) {
      const key = p.nome.trim();
      if (!key) continue;
      if (!palMap[key]) palMap[key] = { nome: p.nome, org: p.org || '', sessoes: [] };
      if (!palMap[key].sessoes.includes(titulo)) palMap[key].sessoes.push(titulo);
    }
  }
  return Object.values(palMap).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

export interface UniquePerformer {
  nome: string;
  org: string;
}

export function uniquePerformers(sessoes: Sessao[]): UniquePerformer[] {
  const seen = new Map<string, UniquePerformer>();
  for (const s of sessoes) {
    for (const p of s.palestrantes ?? []) {
      const nome = p.nome.trim();
      if (!nome || seen.has(nome)) continue;
      seen.set(nome, { nome, org: (p.org ?? '').trim() });
    }
  }
  return Array.from(seen.values()).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

export function normalizeBioKey(nome: string): string {
  return nome.trim().replace(/\s+/g, ' ');
}

export function getBio(nome: string, bios: BiosMap): Bio | null {
  if (!nome) return null;
  const direct = bios[nome];
  if (direct) return direct;
  const key = normalizeBioKey(nome);
  return bios[key] ?? null;
}

export function buildScheduleData(sessoes: Sessao[]): DiaData[] {
  return diasConf.map((dConf) => {
    const ss = sessoes.filter((s: Sessao) => s.dia === dConf.diaVal);
    const locaisPresentes = locaisOrder.filter((l) => ss.some((s: Sessao) => s.local === l));

    const processed: ProcessedSession[] = ss.map((s: Sessao) => {
      const startMin = parseMin(s.inicio);
      if (startMin === null) return { ...s, _startRow: -1, _endRow: -1, _startMin: null, _endMin: null };
      let endMin = parseMin(s.fim);
      if (endMin === null) {
        const sameLocalLater = ss
          .filter(
            (x: Sessao) =>
              x.local === s.local && parseMin(x.inicio) !== null && (parseMin(x.inicio) as number) > startMin
          )
          .map((x: Sessao) => parseMin(x.inicio) as number)
          .sort((a: number, b: number) => a - b);
        endMin = sameLocalLater[0] ?? Math.min(startMin + 60, dConf.endMin);
      }
      return {
        ...s,
        _startMin: startMin,
        _endMin: endMin,
        _startRow: toRow(startMin),
        _endRow: Math.max(toRow(startMin) + 1, toRow(endMin)),
      };
    });

    const nSlots = Math.ceil((dConf.endMin - BASE_MIN) / SLOT_MIN);
    const timeAxis: TimeAxisItem[] = [];
    for (let m = BASE_MIN; m <= dConf.endMin; m += 30) {
      timeAxis.push({ row: toRow(m), label: minToTime(m), isHour: m % 60 === 0 });
    }

    const palList = buildPalList(ss);

    const sessoesList = [...processed]
      .filter((s: ProcessedSession) => s._startMin !== null)
      .sort((a: ProcessedSession, b: ProcessedSession) => (a._startMin as number) - (b._startMin as number));

    return { ...dConf, locaisPresentes, processed, nSlots, timeAxis, palList, sessoesList };
  });
}
