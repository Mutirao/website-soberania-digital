import type { APIRoute } from 'astro';
import data from '~/data/programacao-gerado.json';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, immutable',
    },
  });
};
