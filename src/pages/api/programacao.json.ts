import type { APIRoute } from 'astro';
// Importado em build-time via JSON estático gerado por scripts/build-programacao.mjs
import data from '~/data/programacao-gerado.json';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
