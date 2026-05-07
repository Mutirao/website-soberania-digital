import type { APIRoute } from 'astro';
import evento from '~/data/evento.json';

interface Slot {
  time: string;
  name?: string;
  presentation?: {
    title: string;
    description?: string;
  };
  speakers?: { name: string; company?: string }[];
}

interface Day {
  day: number;
  date: string;
  slots: Slot[];
}

const schedule = evento.schedule as Day[];
const location = evento.location as { name: string; address: string };

function toCalDate(dateStr: string, timeStr: string): string {
  const [day] = dateStr.split(' de ');
  const month = 5;
  const year = 2026;

  const parts = timeStr.replace('h', ':').split(':').map(Number);
  const hour = parts[0] ?? 0;
  const minute = parts[1] ?? 0;

  return `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}${String(minute).padStart(2, '0')}00`;
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

  for (const day of schedule) {
    for (const slot of day.slots) {
      const startDate = toCalDate(day.date, slot.time);

      const timeParts = slot.time.replace('h', ':').split(':').map(Number);
      const endHour = (timeParts[0] ?? 0) + 1;
      const endTime = `${String(endHour).padStart(2, '0')}h${String(timeParts[1] ?? 0).padStart(2, '0')}`;
      const endDate = toCalDate(day.date, endTime);

      const summary = slot.presentation?.title ?? slot.name ?? '';
      const description = slot.presentation?.description ?? '';
      const speakers =
        slot.speakers?.map((s) => `${s.name}${s.company ? ` (${s.company})` : ''}`).join(', ') ?? '';

      const uid = `encontro-${day.day}-${slot.time}-${summary.substring(0, 20)}@soberania.digital`
        .replace(/[^a-zA-Z0-9@.-]/g, '-');

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTART:${startDate}`);
      lines.push(`DTEND:${endDate}`);
      lines.push(`SUMMARY:${escapeICS(summary)}`);
      if (description) {
        lines.push(
          `DESCRIPTION:${escapeICS(description)}${speakers ? '\\n\\nPalestrantes: ' + escapeICS(speakers) : ''}`
        );
      }
      lines.push(`LOCATION:${escapeICS(location.name)}`);
      lines.push('END:VEVENT');
    }
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
