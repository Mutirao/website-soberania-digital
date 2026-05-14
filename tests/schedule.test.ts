import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  BASE_MIN,
  SLOT_MIN,
  buildScheduleData,
  cleanTitle,
  diasConf,
  locaisOrder,
  mesaLabel,
  minToTime,
  parseMin,
} from '../src/lib/schedule.ts';
import type { Sessao } from '../src/types/schedule.ts';

describe('parseMin', () => {
  it('parses HH:MM into minutes from midnight', () => {
    assert.equal(parseMin('9:00'), 9 * 60);
    assert.equal(parseMin('09:00'), 9 * 60);
    assert.equal(parseMin('17:45'), 17 * 60 + 45);
  });

  it('returns null for empty / sentinel values', () => {
    assert.equal(parseMin(''), null);
    assert.equal(parseMin(undefined), null);
    assert.equal(parseMin('?'), null);
    assert.equal(parseMin('Tarde'), null);
  });

  it('treats hour-only strings as :00', () => {
    assert.equal(parseMin('8'), 8 * 60);
  });
});

describe('minToTime', () => {
  it('formats whole hours without minutes', () => {
    assert.equal(minToTime(9 * 60), '9h');
  });

  it('zero-pads non-zero minutes', () => {
    assert.equal(minToTime(9 * 60 + 5), '9h05');
    assert.equal(minToTime(17 * 60 + 30), '17h30');
  });
});

describe('mesaLabel', () => {
  const make = (tipo: string, titulo = ''): Sessao => ({
    tipo,
    titulo,
    dia: '18/05',
    inicio: '9:00',
    local: 'Anfiteatro',
  });

  it('returns the simple type for non-Mesa entries', () => {
    assert.equal(mesaLabel(make('Intervalo')), 'Intervalo');
    assert.equal(mesaLabel(make('Conferência')), 'Conferência');
    assert.equal(mesaLabel(make('Plenária')), 'Plenária');
    assert.equal(mesaLabel(make('Roda de Conversa')), 'Roda de Conversa');
    assert.equal(mesaLabel(make('Lançamento')), 'Lançamento');
    assert.equal(mesaLabel(make('Reunião')), 'Reunião');
    assert.equal(mesaLabel(make('Podcast')), 'Podcast');
    assert.equal(mesaLabel(make('Abertura')), 'Abertura');
  });

  it('detects "Mesa de Abertura" titles', () => {
    assert.equal(mesaLabel(make('Mesa', 'Mesa de Abertura')), 'Mesa de Abertura');
  });

  it('returns plain "Mesa" for numbered tables', () => {
    assert.equal(mesaLabel(make('Mesa', 'Mesa 4 — Regulação')), 'Mesa');
  });

  it('falls back to "Atividade" for unknown types', () => {
    assert.equal(mesaLabel(make('')), 'Atividade');
  });
});

describe('cleanTitle', () => {
  it('strips numbered "Mesa N — " prefixes', () => {
    assert.equal(cleanTitle('Mesa 7 — Software livre e soberania digital'), 'Software livre e soberania digital');
  });

  it('strips "Conferência — " prefixes', () => {
    assert.equal(cleanTitle('Conferência — Caminhos da soberania digital'), 'Caminhos da soberania digital');
  });

  it('leaves unprefixed titles intact', () => {
    assert.equal(cleanTitle('Mesa de Abertura'), 'Mesa de Abertura');
  });
});

describe('buildScheduleData', () => {
  const sessoes: Sessao[] = [
    {
      dia: '18/05',
      local: 'Anfiteatro',
      inicio: '9:00',
      fim: '9:30',
      tipo: 'Mesa',
      titulo: 'Mesa de Abertura',
      palestrantes: [
        { nome: 'Beá Tibiriçá', org: 'Rede pela Soberania Digital' },
        { nome: 'Jon "maddog" Hall', org: 'Linux International' },
      ],
    },
    {
      dia: '19/05',
      local: 'Auditório 1',
      inicio: '10:00',
      fim: '11:00',
      tipo: 'Mesa',
      titulo: 'Mesa 7 — Software livre',
      palestrantes: [
        { nome: 'Jon "maddog" Hall', org: 'Linux International' },
        { nome: 'Rafael Peregrino da Silva', org: 'Linux Professional Institute' },
      ],
    },
  ];

  it('produces one entry per configured day', () => {
    const dias = buildScheduleData(sessoes);
    assert.equal(dias.length, diasConf.length);
    assert.deepEqual(
      dias.map((d) => d.diaVal),
      diasConf.map((d) => d.diaVal)
    );
  });

  it('lists only locais that have sessions, in canonical order', () => {
    const [dia1, dia2] = buildScheduleData(sessoes);
    assert.deepEqual(dia1.locaisPresentes, ['Anfiteatro']);
    assert.deepEqual(dia2.locaisPresentes, ['Auditório 1']);
    for (const local of dia1.locaisPresentes) {
      assert.ok(locaisOrder.includes(local));
    }
  });

  it('computes grid rows from start/end minutes', () => {
    const [dia1] = buildScheduleData(sessoes);
    const opening = dia1.processed.find((s) => s.titulo === 'Mesa de Abertura');
    assert.ok(opening);
    assert.equal(opening!._startMin, 9 * 60);
    assert.equal(opening!._endMin, 9 * 60 + 30);
    const expectedStartRow = Math.round((9 * 60 - BASE_MIN) / SLOT_MIN) + 2;
    assert.equal(opening!._startRow, expectedStartRow);
    assert.ok(opening!._endRow > opening!._startRow);
  });

  it('aggregates palestrantes across sessions, deduplicated by name', () => {
    const [, dia2] = buildScheduleData(sessoes);
    const maddog = dia2.palList.find((p) => p.nome === 'Jon "maddog" Hall');
    assert.ok(maddog, 'Jon "maddog" Hall should appear in palList');
    assert.equal(maddog!.sessoes.length, 1);
  });

  it('sorts palList by Brazilian-Portuguese collation', () => {
    const dias = buildScheduleData([
      ...sessoes,
      {
        dia: '18/05',
        local: 'Anfiteatro',
        inicio: '10:00',
        fim: '11:00',
        tipo: 'Mesa',
        titulo: 'Mesa X',
        palestrantes: [
          { nome: 'Ângela Teste', org: 'Org A' },
          { nome: 'Zé Teste', org: 'Org Z' },
        ],
      },
    ]);
    const names = dias[0].palList.map((p) => p.nome);
    const sorted = [...names].sort((a, b) => a.localeCompare(b, 'pt-BR'));
    assert.deepEqual(names, sorted);
  });

  it('infers an end time when "fim" is missing using the next session in the same local', () => {
    const partial: Sessao[] = [
      { dia: '18/05', local: 'Anfiteatro', inicio: '14:00', fim: '', tipo: 'Mesa', titulo: 'A' },
      { dia: '18/05', local: 'Anfiteatro', inicio: '15:00', fim: '16:00', tipo: 'Mesa', titulo: 'B' },
    ];
    const [dia1] = buildScheduleData(partial);
    const a = dia1.processed.find((s) => s.titulo === 'A');
    assert.ok(a);
    assert.equal(a!._endMin, 15 * 60);
  });
});
