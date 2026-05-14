import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import biosData from '../src/data/bios.json' with { type: 'json' };
import programacao from '../src/data/programacao.json' with { type: 'json' };
import type { BiosMap } from '../src/types/bio.ts';
import type { Sessao } from '../src/types/schedule.ts';

const bios = biosData as BiosMap;
const sessoes = programacao.sessoes as Sessao[];
const allSpeakers = new Set(sessoes.flatMap((s) => (s.palestrantes ?? []).map((p) => p.nome)));

describe('bios.json — schema', () => {
  it('is a non-empty object', () => {
    assert.ok(typeof bios === 'object' && bios !== null);
    assert.ok(Object.keys(bios).length > 0);
  });

  it('every entry has a non-empty bio', () => {
    for (const [nome, entry] of Object.entries(bios)) {
      assert.ok(typeof entry.bio === 'string' && entry.bio.trim().length > 0, `bio vazia em "${nome}"`);
    }
  });

  it('foto, when present, is an http(s) URL or absolute/relative path', () => {
    for (const [nome, entry] of Object.entries(bios)) {
      if (entry.foto === undefined) continue;
      assert.ok(/^(https?:\/\/|\/|\.\/|\.\.\/)/.test(entry.foto), `foto inválida em "${nome}": ${entry.foto}`);
    }
  });

  it('links, when present, all have rel + href', () => {
    for (const [nome, entry] of Object.entries(bios)) {
      for (const l of entry.links ?? []) {
        assert.ok(l.rel && l.href, `link inválido em "${nome}"`);
        assert.ok(/^https?:\/\//.test(l.href), `link href deve ser URL absoluta em "${nome}": ${l.href}`);
      }
    }
  });
});

describe('bios.json — cross-reference com programacao.json', () => {
  it('toda chave de bio corresponde a um palestrante real', () => {
    for (const nome of Object.keys(bios)) {
      assert.ok(allSpeakers.has(nome), `Bio para "${nome}" não tem palestrante correspondente em programacao.json`);
    }
  });
});

describe('bios.json — Marcos Méndez', () => {
  const m = bios['Marcos Méndez'];

  it('tem entrada', () => {
    assert.ok(m, 'Marcos Méndez deve ter bio cadastrada');
  });

  it('cita Pop.Coop', () => {
    assert.match(m!.bio, /Pop\.Coop/);
  });

  it('tem foto', () => {
    assert.ok(m!.foto && m!.foto.length > 0);
  });
});
