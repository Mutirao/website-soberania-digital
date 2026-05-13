import type { Sessao, DiaData, DiaConfig, ProcessedSession, TimeAxisItem, PalestranteResumo } from '~/types/schedule';

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

export function parseMin(t: string | undefined): number | null {
  if (!t || t.toLowerCase().includes('tarde') || t === '?') return null;
  const [h, m] = t.trim().split(':').map(n => parseInt(n));
  if (isNaN(h)) return null;
  return h * 60 + (isNaN(m) ? 0 : m);
}

export function minToTime(m: number): string {
  const h = Math.floor(m / 60), min = m % 60;
  return min === 0 ? `${h}h` : `${h}h${String(min).padStart(2, '0')}`;
}

function toRow(min: number): number {
  return Math.max(2, Math.round((min - BASE_MIN) / SLOT_MIN) + 2);
}

function buildPalList(ss: Sessao[]): PalestranteResumo[] {
  const palMap: Record<string, PalestranteResumo> = {};
  for (const s of ss) {
    for (const p of (s.palestrantes || [])) {
      const key = p.nome.trim();
      if (!key) continue;
      if (!palMap[key]) palMap[key] = { nome: p.nome, org: p.org || '', sessoes: [] };
      if (!palMap[key].sessoes.includes(s.titulo)) palMap[key].sessoes.push(s.titulo);
    }
  }
  return Object.values(palMap).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

export function buildScheduleData(sessoes: Sessao[]): DiaData[] {
  return diasConf.map(dConf => {
    const ss = sessoes.filter((s: Sessao) => s.dia === dConf.diaVal);
    const locaisPresentes = locaisOrder.filter(l => ss.some((s: Sessao) => s.local === l));

    const processed: ProcessedSession[] = ss.map((s: Sessao) => {
      const startMin = parseMin(s.inicio);
      if (startMin === null) return { ...s, _startRow: -1, _endRow: -1, _startMin: null, _endMin: null };
      let endMin = parseMin(s.fim);
      if (endMin === null) {
        const sameLocalLater = ss
          .filter((x: Sessao) => x.local === s.local && parseMin(x.inicio) !== null && (parseMin(x.inicio) as number) > startMin)
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
