import type { APIRoute } from 'astro';
import data from '~/data/programacao.json';
import evento from '~/data/evento.json';

interface Sessao {
  dia: string;
  local: string;
  inicio: string;
  fim: string;
  tipo: string;
  titulo: string;
  descricao: string;
  palestrantes: { nome: string; org?: string; role?: string }[];
}

const sessoes = data.sessoes as Sessao[];
const location = evento.location as { name: string; address: string };

function toCalDate(dia: string, time: string): string {
  const [d, m] = dia.split('/').map(Number);
  const year = 2026;
  const parts = time.split(':').map(Number);
  const hour = parts[0] ?? 0;
  const minute = parts[1] ?? 0;
  return `${year}${String(m).padStart(2, '0')}${String(d).padStart(2, '0')}T${String(hour).padStart(2, '0')}${String(minute).padStart(2, '0')}00`;
}

function escapeICS(text: string): string {
  return text.replace(/[\\;,]/g, '\\$&').replace(/\n/g, '\\n');
}

function generateICS(): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Soberania Digital//Encontro Nacional//PT-BR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:2º Encontro Nacional pela Soberania Digital',
    'X-WR-TIMEZONE:America/Sao_Paulo',
  ];

  for (const s of sessoes) {
    if (s.tipo === 'Intervalo') continue;

    const startDate = toCalDate(s.dia, s.inicio);
    const endDate = toCalDate(s.dia, s.fim);

    const summary = s.titulo;
    const speakers = s.palestrantes.map((p) => `${p.nome}${p.org ? ` (${p.org})` : ''}`).join(', ');

    const uid = `encontro-${s.dia.replace('/', '')}-${s.inicio.replace(':', '')}-${s.local}-${summary.substring(0, 20)}@soberania.digital`
      .replace(/[^a-zA-Z0-9@.-]/g, '-');

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${uid}`);
    lines.push(`DTSTART:${startDate}`);
    lines.push(`DTEND:${endDate}`);
    lines.push(`SUMMARY:${escapeICS(summary)}`);
    const desc = s.descricao ? escapeICS(s.descricao) : '';
    const spk = speakers ? escapeICS(speakers) : '';
    if (desc || spk) {
      lines.push(`DESCRIPTION:${desc}${spk ? '\\n\\nPalestrantes: ' + spk : ''}`);
    }
    lines.push(`LOCATION:${escapeICS(location.name + ' - ' + s.local)}`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export const GET: APIRoute = () => {
  const ics = generateICS();
  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="encontro-soberania-digital-2026.ics"',
      'Cache-Control': 'public, max-age=86400, immutable',
    },
  });
};
