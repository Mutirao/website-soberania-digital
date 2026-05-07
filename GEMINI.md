# GEMINI.md

## Project Overview

**Website Soberania Digital** is a high-performance landing page for the **2º Encontro Nacional pela Soberania Digital**. It is built using **Astro 6** and **Tailwind CSS 4**, based on a customized version of the **AstroWind** template.

The site is designed as a static landing page (`output: 'static'`) with a robust data pipeline that fetches and processes event information (schedules, partners, and signatures) from various sources including Excel files and external APIs.

### Key Technologies
- **Framework:** [Astro 6](https://astro.build/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** TypeScript
- **Data Processing:** ExcelJS (for schedule management), tsx (for data fetching scripts)
- **Deployment:** Optimized for static hosting (Netlify/Vercel) with a Node.js adapter for standalone previews.

---

## Project Structure

```text
/
├── scripts/              # Data fetching and processing scripts (TS/MJS)
├── src/
│   ├── assets/           # Images, favicons, and global styles (Tailwind 4)
│   ├── components/       # Astro components (UI, Widgets, Common)
│   ├── data/             # Dynamic data: evento.json, programacao.xlsx, etc.
│   ├── layouts/          # Page and Markdown layouts
│   ├── pages/            # Routes (index.astro is the main entry)
│   ├── utils/            # Helper functions for images, formatting, etc.
│   ├── config.yaml       # Primary site and SEO configuration
│   └── navigation.ts     # Header and footer navigation links
├── vendor/               # AstroWind core integration and theme logic
└── astro.config.ts       # Astro configuration (base path: /encontro)
```

---

## Building and Running

### Development
Start the local development server at `localhost:4321/encontro`:
```bash
npm run dev
```

### Data Synchronization
Before building or when data changes, update the local JSON files:
```bash
npm run build:data
```
This runs:
1. `scripts/fetch-assinaturas.ts`: Fetches registration counts from Plantaformas admin.
2. `scripts/build-programacao.mjs`: Converts `src/data/programacao.xlsx` into `src/data/programacao-gerado.json` and `src/data/parceiros.json`.

**Note:** `fetch-assinaturas.ts` requires a `.env` file with the following variables to authenticate with Plantaformas:
- `PLANTAFORMAS_EMAIL`
- `PLANTAFORMAS_PASSWORD`
- `PLANTAFORMAS_CONFERENCE_SLUG` (defaults to `SoberaniaDigital`)

### Production Build
Build the optimized static site to `./dist/`:
```bash
npm run build
```

---

## Development Conventions

### Data Management
- **Programação e Parceiros:** Do NOT edit `programacao-gerado.json` or `parceiros.json` directly. Instead, update `src/data/programacao.xlsx` and run `npm run build:data`. 
- **Excel Sheets:**
  * **Programação:** Schedule details.
  * **Palestrantes:** Speaker details linked by 'mesa'.
  * **Parceiros:** Unified partner management (Realização, Produção, Patrocínio, Apoio).
  * **Stands:** List of exhibition stands.
- **General Content:** Managed via `src/data/evento.json`.

### Component Architecture
- **Widgets:** High-level sections like Hero, Features, or the Schedule Grid are located in `src/components/widgets/`.
- **UI:** Reusable low-level components are in `src/components/ui/`.
- **Vanilla CSS/JS:** Preference for native browser features or light scripts (`is:inline`) for interactive elements like the map or the registration form.

### Forms & Integrations
- **Registration:** The registration form in `index.astro` submits data directly to `plantaformas.org`. It handles CSRF tokens and honeypot fields dynamically via client-side `fetch`.

### Code Quality
- **Linting:** `npm run check` (Astro, ESLint, Prettier).
- **Formatting:** `npm run fix` to apply automatic fixes.
- **Base Path:** The project uses `/encontro` as its base path. Use the `asset()` helper in `index.astro` to resolve paths correctly.
