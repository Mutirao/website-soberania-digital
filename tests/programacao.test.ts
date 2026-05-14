import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import programacao from '../src/data/programacao.json' with { type: 'json' };
import { diasConf, locaisOrder, parseMin } from '../src/lib/schedule.ts';
import type { Sessao } from '../src/types/schedule.ts';

const sessoes = programacao.sessoes as Sessao[];

const tiposPermitidos = new Set([
  'Abertura',
  'Mesa',
  'Conferência',
  'Plenária',
  'Roda de Conversa',
  'Lançamento',
  'Reunião',
  'Podcast',
  'Intervalo',
]);

const diasValidos = new Set(diasConf.map((d) => d.diaVal));
const locaisValidos = new Set([...locaisOrder, 'Podcast']);

describe('programacao.json — schema integrity', () => {
  it('has at least one session', () => {
    assert.ok(sessoes.length > 0);
  });

  it('uses only configured days', () => {
    for (const s of sessoes) {
      assert.ok(diasValidos.has(s.dia), `dia inválido em "${s.titulo}": ${s.dia}`);
    }
  });

  it('uses only known locais', () => {
    for (const s of sessoes) {
      assert.ok(locaisValidos.has(s.local), `local inválido em "${s.titulo}": ${s.local}`);
    }
  });

  it('uses only known tipos', () => {
    for (const s of sessoes) {
      assert.ok(tiposPermitidos.has(s.tipo), `tipo inválido em "${s.titulo}": ${s.tipo}`);
    }
  });

  it('every session has a non-empty title', () => {
    for (const s of sessoes) {
      assert.ok(typeof s.titulo === 'string' && s.titulo.trim().length > 0);
    }
  });

  it('time strings are well-formed (or empty for Podcast)', () => {
    for (const s of sessoes) {
      if (s.local === 'Podcast') continue;
      assert.notEqual(parseMin(s.inicio), null, `início inválido em "${s.titulo}"`);
      if (s.fim) {
        const start = parseMin(s.inicio);
        const end = parseMin(s.fim);
        assert.notEqual(end, null, `fim inválido em "${s.titulo}"`);
        assert.ok((end as number) > (start as number), `fim deve ser depois do início em "${s.titulo}"`);
      }
    }
  });

  it('palestrantes have non-empty names', () => {
    for (const s of sessoes) {
      for (const p of s.palestrantes ?? []) {
        assert.ok(typeof p.nome === 'string' && p.nome.trim().length > 0, `palestrante sem nome em "${s.titulo}"`);
      }
    }
  });

  it('does not duplicate the same speaker within a single session', () => {
    for (const s of sessoes) {
      const seen = new Set<string>();
      for (const p of s.palestrantes ?? []) {
        const key = p.nome.trim().toLowerCase();
        assert.ok(!seen.has(key), `palestrante duplicado(a) "${p.nome}" em "${s.titulo}"`);
        seen.add(key);
      }
    }
  });
});

describe('programacao.json — name corrections', () => {
  const allSpeakers = sessoes.flatMap((s) => (s.palestrantes ?? []).map((p) => p.nome));

  it('uses the canonical form Jon "maddog" Hall', () => {
    assert.ok(allSpeakers.includes('Jon "maddog" Hall'), 'Esperado pelo menos uma ocorrência de Jon "maddog" Hall');
    assert.ok(!allSpeakers.includes('Jon maddog Hall'), 'Forma antiga "Jon maddog Hall" não deve existir');
  });

  it('uses Rafael Peregrino da Silva (not "Pergrino")', () => {
    assert.ok(allSpeakers.includes('Rafael Peregrino da Silva'), 'Esperado Rafael Peregrino da Silva no segundo dia');
    assert.ok(
      !allSpeakers.some((n) => /Pergrino/i.test(n)),
      'Nenhum nome com a grafia incorreta "Pergrino" deve existir'
    );
  });
});

describe('programacao.json — Mesa de Abertura (18/05)', () => {
  const abertura = sessoes.find((s) => s.dia === '18/05' && s.titulo.toLowerCase().startsWith('mesa de abertura'));

  it('exists', () => {
    assert.ok(abertura, 'Mesa de Abertura deve existir em 18/05');
  });

  const nomes = (abertura?.palestrantes ?? []).map((p) => p.nome);

  it('includes Beá Tibiriçá', () => {
    assert.ok(nomes.includes('Beá Tibiriçá'));
  });

  it('includes Jon "maddog" Hall', () => {
    assert.ok(nomes.includes('Jon "maddog" Hall'), `nomes presentes: ${nomes.join(', ')}`);
  });
});
