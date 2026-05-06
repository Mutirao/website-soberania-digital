import type { APIRoute } from 'astro';
import evento from '~/data/evento.json';

// iCal date formatter (UTC)
function toCalDate(dateStr: string, timeStr: string, dayOffset: number): string {
  // Parse "18 de maio" or get from schedule
  const [day] = dateStr.split(' de ');
  const dayNum = parseInt(day);
  const month = 5; // maio
  const year = 2026;

  const [hour, minute] = timeStr.replace('h', ':').split(':').map(n => parseInt(n));
  return `${year}${String(month).padStart(2, '0')}${String(dayNum).padStart(2, '0')}T${String(hour).padStart(2, '0')}${String(minute || 0).padStart(2, '0')}00`;
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

  for (const day of evento.schedule) {
    for (const slot of day.slots) {
      const startDate = toCalDate(day.date, slot.time, day.day - 1);
      const [startDay, startMonth, startYear] = day.date.split(' de ');
      const timeParts = slot.time.replace('h', ':').split(':');
      const endHour = parseInt(timeParts[0]) + 1;
      const endTime = `${String(endHour).padStart(2, '0')}h${timeParts[1] || '00'}`;
      const endDate = toCalDate(day.date, endTime, day.day - 1);

      const summary = slot.presentation
        ? slot.presentation.title
        : slot.name || '';
      const description = slot.presentation?.description
        ? slot.presentation.description
        : '';
      const speakers = slot.speakers?.map(s => `${s.name}${s.company ? ` (${s.company})` : ''}`).join(', ') || '';

      const uid = `encontro-${day.day}-${slot.time}-${summary.substring(0, 20)}@soberania.digital`
        .replace(/[^a-zA-Z0-9@.-]/g, '-');

      const location = evento.location.name;

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTART:${startDate}`);
      lines.push(`DTEND:${endDate}`);
      lines.push(`SUMMARY:${escapeICS(summary)}`);
      if (description) {
        lines.push(`DESCRIPTION:${escapeICS(description)}${speakers ? '\\n\\nPalestrantes: ' + escapeICS(speakers) : ''}`);
      }
      lines.push(`LOCATION:${escapeICS(location)}`);
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
    },
  });
};
