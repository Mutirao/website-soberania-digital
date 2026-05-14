# Documentação do Site "Soberania Digital"

## Visão Geral

O site "Soberania Digital" é uma plataforma Astro baseada no template AstroWind, projetada para promover e organizar o movimento pela soberania digital no Brasil. O site serve principalmente como portal para o 2º Encontro Nacional pela Soberania Digital, que ocorrerá em 18 e 19 de maio de 2026 em Brasília.

## Arquitetura e Tecnologia

- **Framework**: Astro 6.x com TypeScript
- **Estilização**: Tailwind CSS 4.x (via `@tailwindcss/vite` plugin)
- **Servidor**: Express (standalone via `@astrojs/node`) ou Docker
- **Deployment**: Netlify (CI), Vercel, ou Docker
- **Base path**: `/encontro` — todas as URLs são servidas sob este prefixo

## Estrutura Principal

### Página Principal (`index.astro`)

A homepage é composta por **seções importadas** de `src/sections/`, cada uma recebendo dados como props:

1. **HeroSection** — Hero com branding, data e CTA de inscrição
2. **AboutSection** — Texto sobre o encontro + citação
3. **ScheduleSection** — Programação interativa com 3 modos de visualização (grade/sessões/palestrantes)
4. **InitiativesSection** — Iniciativas soberanas
5. **RegistrationCTASection** — CTA com contador dinâmico de inscritos
6. **LocationMapSection** — Mapa OpenStreetMap com local e referências
7. **RegistrationFormSection** — Formulário integrado com Plataformas
8. **PartnersSection** — Grid de parceiros/organizadores

Os dados vêm de JSONs em `src/data/`:

- `evento.json` — Configuração do evento, local, parceiros grid, links comunitários
- `programacao.json` — Sessões com palestrantes, horários, locais e dias
- `assinaturas.json` — Contagem de inscritos (atualizado via script)
- `parceiros.json` — Organizadores extraídos do Plataformas

A programação é processada por `src/lib/schedule.ts` (`buildScheduleData`), que calcula rows/colunas para o grid CSS a partir dos horários das sessões.

### Outras Páginas

| Arquivo                    | Rota                  | Descrição                                               |
| -------------------------- | --------------------- | ------------------------------------------------------- |
| `index.astro`              | `/encontro/`          | Homepage com todas as seções                            |
| `_manifesto.astro`         | —                     | Manifesto pela soberania digital nas universidades      |
| `_carta.astro`             | —                     | Carta ao Presidente Lula com propostas                  |
| `_primeiro-encontro.astro` | —                     | Informações sobre o 1º encontro                         |
| `_programa.astro`          | —                     | Programação detalhada                                   |
| `api/dados.ts`             | `/encontro/api/dados` | API SSR que retorna inscritos e parceiros em tempo real |
| `encontro.ics.ts`          | —                     | Calendário ICS do evento                                |

### Seções (`src/sections/`)

Cada seção é um componente Astro standalone: `HeroSection`, `AboutSection`, `ScheduleSection`, `InitiativesSection`, `RegistrationCTASection`, `LocationMapSection`, `RegistrationFormSection`, `PartnersSection`.

### Componentes de Programação (`src/components/schedule/`)

- `DayTabs.astro` — Abas Dia 1 / Dia 2
- `ViewTabs.astro` — Abas Grade / Sessões / Palestrantes
- `ScheduleGrid.astro` — Grid CSS horário × auditório
- `ScheduleList.astro` — Lista cronológica
- `SpeakerList.astro` — Lista de palestrantes
- `SessionDetails.astro` — Detalhes de uma sessão

### Tipos (`src/types/schedule.ts`)

Interfaces TypeScript que definem o contrato dos dados: `Sessao`, `ProcessedSession`, `DiaData`, `DiaConfig`, `PalestranteResumo`, `TimeAxisItem`.

### Integração com Plataformas

O site se integra com [Plantaformas](https://plantaformas.org) (Decidim) para:

- **Contagem de inscritos** — scrap do painel admin
- **Parceiros** — GraphQL API + scrap da página pública
- **Autenticação** — login via CSRF token + session cookies

Há três caminhos de integração:

1. **Scripts de build** (`scripts/fetch-*.ts`) — salvam dados em JSON estático
2. **API SSR** (`src/pages/api/dados.ts`) — dados em tempo real com cache de 60s
3. **Express server** (`server.js`) — usado em Docker, mesma lógica da API SSR

### Scripts

| Script                      | Descrição                                          |
| --------------------------- | -------------------------------------------------- |
| `npm run dev`               | Servidor de desenvolvimento Astro                  |
| `npm run build`             | Busca dados + build de produção                    |
| `npm run build:ci`          | Busca parceiros + build (sem assinaturas, para CI) |
| `npm run build:data`        | Busca assinaturas + parceiros                      |
| `npm run fetch-assinaturas` | Atualiza `src/data/assinaturas.json`               |
| `npm run fetch-parceiros`   | Atualiza `src/data/parceiros.json`                 |
| `npm run start`             | Serve build standalone com Express                 |
| `npm run check`             | astro check + eslint + prettier                    |
| `npm run fix`               | eslint --fix + prettier -w                         |

### Variáveis de Ambiente

| Variável                       | Descrição                                         |
| ------------------------------ | ------------------------------------------------- |
| `PLANTAFORMAS_EMAIL`           | Email de admin no Plataformas                     |
| `PLANTAFORMAS_PASSWORD`        | Senha de admin                                    |
| `PLANTAFORMAS_CONFERENCE_SLUG` | Slug da conferência (default: `SoberaniaDigital`) |

## Design

O site segue uma identidade visual brutalista/militante, documentada em `DESIGN.md`. Regras principais:

- **Dark-only** — sem light mode
- **3 cores**: preto `#010101`, vermelho `#E31B23` (ações), dourado `#FFD400` (identidade)
- **Tipografia**: Barlow Condensed 900 (headings/labels), Overpass (body)
- **Sem animações complexas** — fadeIn mínimo via intersect

## Docker

```bash
docker-compose up --build
# Expõe :8080, serve sob /encontro
```

O Dockerfile usa multi-stage build: `npm run build:docker` (sem credenciais) → copia `dist/` + `server.js` para imagem final.

## Configuração do Astro

- **Output**: `static` com adapter `@astrojs/node` (standalone) — necessário para API SSR
- **Base**: `/encontro`
- **Path alias**: `~` → `src/`
- **Tailwind**: via `@tailwindcss/vite` plugin (não PostCSS)
- **Integração customizada**: `vendor/integration` — processa `src/config.yaml`
- **Ícones**: `astro-icon` com sets `tabler` e `flat-color-icons`

## Estrutura de Pastas

```
src/
├── assets/           # Imagens e estilos
├── components/       # Componentes reutilizáveis
│   ├── blog/         # Componentes de blog (desabilitado)
│   ├── common/       # Componentes genéricos
│   ├── schedule/     # Componentes da programação
│   ├── ui/           # Primitivos de UI
│   └── widgets/      # Widgets do template AstroWind
├── data/             # Dados do evento (JSON)
├── layouts/          # Layouts do site
├── lib/              # Lógica de negócio (schedule, plataformas-api)
├── pages/            # Páginas e rotas
│   └── api/          # Endpoints SSR
├── sections/         # Seções da homepage
├── types/            # Definições TypeScript
├── utils/            # Utilitários (frontmatter, images, permalinks)
├── config.yaml       # Configuração geral (metadados, i18n, analytics)
└── navigation.ts     # Links de navegação (header + footer)
vendor/
└── integration/      # Integração customizada AstroWind
scripts/              # Scripts de atualização de dados
```
