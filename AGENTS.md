# AGENTS.md — Soberania Digital

## Commands

```bash
npm run dev              # Dev server (Astro)
npm run build            # Fetch data + production build (needs .env)
npm run build:ci         # Fetch parceiros only + build (CI-safe, no credentials needed)
npm run check            # astro check → eslint → prettier (run before committing)
npm run fix              # eslint --fix + prettier -w
```

Verification order: `npm run check:astro` → `npm run check:eslint` → `npm run check:prettier`.

## Architecture

- **Astro 6** static site with `@astrojs/node` adapter (needed for SSR API route at `/encontro/api/dados`).
- **Base path**: `/encontro` — hardcoded in `astro.config.ts` and `src/config.yaml`. All URLs are served under this prefix.
- **Path alias**: `~` maps to `src/`. Use `~/` imports everywhere.
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin (NOT PostCSS). Config in `tailwind.config.js`.
- **Custom Astro integration**: `vendor/integration/` processes `src/config.yaml` for metadata, i18n, and analytics setup.
- **Dark-only site** — no light mode. See `DESIGN.md` for the full design system (3 colors: black/red/gold, Barlow Condensed + Overpass fonts, no animations).

## Key Files

| File                     | Purpose                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------- |
| `src/pages/index.astro`  | Homepage — imports 8 sections from `src/sections/`                                          |
| `src/sections/*.astro`   | Each section is self-contained; receives data as props                                      |
| `src/lib/schedule.ts`    | `buildScheduleData()` — processes raw sessions into grid coordinates                        |
| `src/types/schedule.ts`  | TypeScript interfaces: `Sessao`, `DiaData`, `ProcessedSession`, etc.                        |
| `src/data/*.json`        | Static data files — `evento.json`, `programacao.json`, `assinaturas.json`, `parceiros.json` |
| `src/navigation.ts`      | Header nav + footer links                                                                   |
| `src/config.yaml`        | Site metadata, i18n, blog/analytics toggles (blog disabled)                                 |
| `src/pages/api/dados.ts` | SSR endpoint — live Plantaformas data with 60s cache                                        |
| `scripts/fetch-*.ts`     | Build-time data fetchers — scrape Plantaformas admin                                        |
| `server.js`              | Express server for Docker deployment                                                        |

## Data Flow

1. **Build time**: `npm run build` runs `fetch-assinaturas.ts` + `fetch-parceiros.ts` → writes JSON to `src/data/`.
2. **Runtime**: `index.astro` imports JSON directly. The client fetches `/encontro/api/dados` to get live inscription counts.
3. **Plataformas integration**: Login via CSRF/session cookies → GraphQL API (partners) + HTML scraping (inscription count). Same logic in `scripts/fetch-assinaturas.ts`, `src/pages/api/dados.ts`, and `server.js`.

## Conventions

- Pages prefixed with `_` (e.g., `_manifesto.astro`) are unpublished/draft pages.
- Sections in `src/sections/` are ordered to match the homepage flow. Each section is a standalone Astro component.
- Schedule components in `src/components/schedule/` use CSS Grid for the time × venue layout. Row positions are calculated in `src/lib/schedule.ts`.
- All visual decisions must follow `DESIGN.md`. Do not add new colors, fonts, or animations.
- ESLint allows `_` prefixed unused variables (`argsIgnorePattern: '^_'`).
- Prettier: 120 char width, single quotes, 2-space tabs, trailing comma es5.

## Environment

`.env` must contain `PLANTAFORMAS_EMAIL`, `PLANTAFORMAS_PASSWORD`, and optionally `PLANTAFORMAS_CONFERENCE_SLUG` for data fetching scripts and the SSR API. Without these, `build:ci` still works (fetches partners from public page only).

## Docker

`docker build` runs `npm run build:docker` (defined in Dockerfile — not in package.json). The production image copies `dist/` + `server.js` and serves on `:8080`.
