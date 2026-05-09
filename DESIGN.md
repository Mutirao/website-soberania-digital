# Design System — Soberania Digital

## Product Context
- **What this is:** Site do 2o Encontro Nacional pela Soberania Digital — landing page com programacao, iniciativas soberanas, inscricoes e informacoes logisticas.
- **Who it's for:** Movimentos sociais, sindicatos, coletivos de tecnologia livre, estudantes, pesquisadores, militantes de esquerda.
- **Space/industry:** Evento politico-ativista brasileiro. Pares: Foro Social Mundial, ABONG, Intervozes.
- **Project type:** Landing page / marketing site (single-page event site)
- **Memorable thing:** "Poder coletivo — somos muitos, somos organizados." Cada decisao de design serve isto.

## Aesthetic Direction
- **Direction:** Brutalist/Raw + Editorial/Magazine
- **Decoration level:** Minimal — tipografia e contraste fazem o trabalho. Sem gradientes, sem sombras decorativas, sem blobs.
- **Mood:** Poster de propaganda: escuro, urgente, combativo. O usuario deve sentir que entrou num espaco de organizacao popular, nao num site de conferencia generico.
- **Reference sites:** Cartazes do MST, jornais de movimento, design de campanha eleitoral brasileira.

## Typography
- **Display/Hero:** Barlow Condensed 900 — apertado, energia de manchete de jornal. Para "18 E 19 DE MAIO", titulos de secao, labels de programacao.
- **Body:** Overpass 400/700 — sans-serif amigavel mas seria. Para descricoes longas de iniciativas, textos sobre o encontro.
- **UI/Labels:** Barlow Condensed 700 — all-caps, letter-spaced 0.12em, tamanho pequeno (0.8125rem). Usado em "INICIATIVAS SOBERANAS", "SOBRE O ENCONTRO", "PROGRAMACAO COMPLETA".
- **Data/Badges:** Barlow Condensed 700 + tabular-nums para horarios da programacao (14h, 19h30).
- **Code:** N/A — site de evento, nao app tecnico.
- **Loading:** Google Fonts via `<link>`.
- **Scale:**
  - H1: clamp(2rem, 5vw, 3.5rem), weight 900, uppercase
  - H2: clamp(1.5rem, 4vw, 3rem), weight 900, uppercase
  - H3: 1.15rem, weight 700
  - Body: 1rem-1.1rem, weight 400, line-height 1.7
  - Labels: 0.8125rem, weight 700, uppercase, letter-spacing 0.12em

## Color
- **Approach:** Restrained — sistema de 3 cores: preto, vermelho, dourado. Cada cor tem um papel claro.
- **Background:** `#010101` (superficie principal) / `#0d0d0d` (cards/secoes) / `#0a0a0a` (secoes alternadas)
- **Primary text:** `#E7E7D8` — off-white quente (NAO branco puro — feel de papel/poster)
- **Muted text:** `#555` / `#666` / `#888` — hierarquia por nivel de cinza
- **Accent 1 — Red (Action):** `#E31B23` — EXCLUSIVAMENTE para elementos interativos (botoes CTA, borders de acao, enfase critica). Hover: `#b01015`.
- **Accent 2 — Gold (Identity):** `#FFD400` — labels, taglines, badges, assinatura visual. "Estamos aqui" energy. Texto sobre fundo escuro.
- **Semantic:** success `#1a5c2a` (dia 2 da programacao), warning `#FFD400`, error `#E31B23`
- **Dark mode:** Nao ha light mode. O site e exclusivamente escuro. A estetica militante e o ponto. Para acessibilidade em luz solar, manter razao de contraste > 4.5:1 em todos os textos sobre fundo escuro.

### WCAG Contrast
| Elemento | Razao | Conformidade |
|----------|-------|-------------|
| #E7E7D8 on #010101 | 14.5:1 | AAA |
| #888 on #010101 | 4.7:1 | AA |
| #fff on #E31B23 | 4.6:1 | AA |
| #000 on #FFD400 | 10.2:1 | AAA |

## Spacing
- **Base unit:** 4px
- **Density:** Compact-to-comfortable — muita informacao visivel reforca "somos muitos".
- **Scale:** xs(4px) sm(8px) md(16px) lg(24px) xl(32px) 2xl(48px) 3xl(64px)
- **Section padding:** py-16 (mobile) / py-24 (desktop)
- **Container:** max-w-6xl (1152px), px-4 sm:px-6

## Layout
- **Approach:** Hybrid — grid-disciplined para dados (programacao, iniciativas), creative-editorial para momentos emocionais (hero, about quote, CTA).
- **Grid:** 3 colunas para iniciativas, 2 colunas para about, grid CSS para programacao horario x auditório.
- **Max content width:** 6xl (1152px) para secoes, 7xl para programacao grid.
- **Border radius:** sm(2px) badges, md(4px) swatches, lg(8px) cards, full(9999px) chips/tags.

## Motion
- **Approach:** Minimal-functional — apenas transicoes que ajudam compreensao.
- **Easing:** N/A — sem animacoes complexas.
- **Duration:** Instant para hovers (0.15s transition-colors), fadeIn via intersect-once para scroll reveal.
- **Nao adicionar mais animacoes.** O site deve parecer decisivo e instantaneo.

## Visual Signature
- **Border-left accent:** `border-left: 4px solid #FFD400` em CTAs, blockquotes, cards de sessao. Assinatura visual do site — marca de marca-texto em pagina impressa.
- **Gradient divider:** `linear-gradient(to right, #E31B23 60%, #FFD400 60%)` entre secoes. Uma faixa de 4px que separa momentos do site.
- **3-color rule:** Preto, vermelho, dourado. Toda cor adicional dilui o impacto.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-09 | Design system atualizado via /design-consultation | Reescreveu DESIGN.md que documentava AstroWind default para refletir a identidade real do site: brutalist/raw, 3 cores, dark-only |
| 2026-05-09 | No light mode | Estetica militante e o ponto. Light mode diluiria "poder coletivo" em "brochure de conferencia" |
| 2026-05-09 | Red = interactive only | Restringir vermelho a elementos clicaveis cria gramatica visual clara. Gold = ler, red = agir |
| 2026-05-09 | Border-left-4 as universal accent | Extender border-left dos CTAs para blockquotes, cards, secoes. Assinatura visual reconhecivel |
