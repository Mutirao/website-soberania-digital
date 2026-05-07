# Design System — Página Encontro

Sistema específico da página `/encontro`. Complementa o `DESIGN.md` global.
Implementado em `src/pages/encontro.astro` via classes CSS `.enc-*`.

---

## Identidade Visual do Evento

A página do encontro tem identidade própria, distinta do restante do site:

| Token | Valor | Uso |
|-------|-------|-----|
| Vermelho ação | `#E31B23` | CTA, destaque, labels, bordas acento |
| Amarelo sinal | `#FFD400` | Labels em fundo escuro, badges de tempo |
| Preto editorial | `#010101` | Fundo hero, seções escuras |
| Branco quente | `#E7E7D8` | Subtítulo no hero |

**Motivo de marca:** stripe `enc-stripe` — barra de 4px em degradê `#E31B23 60% / #FFD400 40%` — aplicada como divisor entre seções temáticas.

---

## Escala Tipográfica

7 níveis semânticos. Mínimo de corpo: **1rem (16px)**. Abaixo disso, apenas labels e texto de apoio.

| Classe | Tamanho | Peso | Transform | Uso |
|--------|---------|------|-----------|-----|
| `.enc-label` | 11px (0.6875rem) | 700 | uppercase + tracking 0.12em | Categoria de seção, badges |
| `.enc-caption` | 13px (0.8125rem) | normal | — | Endereços, metadados, footnotes |
| `.enc-body` | 16px (1rem) | normal | — | Corpo de texto padrão |
| `.enc-lead` | clamp(17px, 2.2vw, 19px) | normal | — | Parágrafo introdutório |
| `.enc-h3` | clamp(20px, 3vw, 28px) | 900 | uppercase | Sub-seção (Onde se hospedar, Como Chegar) |
| `.enc-h2` | clamp(28px, 5vw, 44px) | 900 | uppercase | Heading de seção principal |
| `.enc-h1` | clamp(40px, 7vw, 64px) | 900 | uppercase | Hero único |

**Regra de peso:** `font-black` (900) apenas em `.enc-h1`, `.enc-h2`, `.enc-h3`. Labels e captions usam `font-bold` (700) — peso 900 em texto pequeno destrói a hierarquia.

---

## Ramp de Cores de Texto (4 tons)

Dois contextos: seções claras (light/dark adaptáveis) e seções escuras fixas (schedule, form, partners).

### Seções adaptáveis — via CSS custom properties

| Classe | Var | Light | Dark | Uso |
|--------|-----|-------|------|-----|
| `.enc-text` | `--enc-text` | `#010101` | `#ffffff` | Headings, h4, labels em cards |
| `.enc-text-body` | `--enc-text-body` | `#2d2d2d`* | `#d1d5db` | Parágrafos, descrições |
| `.enc-text-muted` | `--enc-text-muted` | `#666666` | `#9ca3af` | Info secundária, room, local |
| `.enc-text-hint` | `--enc-c4` | `#aaaaaa` | `#666666` | Footnotes, dicas de acessibilidade |

*`--enc-text-body` light herdado do sistema global como `#292929`.

### Seções escuras fixas (schedule, form, community, partners)

Não usam CSS vars — são intencionalmente dark-only por design editorial.

| Valor | Uso |
|-------|-----|
| `#e0e0e0` / `#ddd` | Título de sessão, nome de palestrante |
| `#888` / `#777` | Labels de categoria (partners) |
| `#555` / `#666` | Texto de apoio, hora na grade |
| `#444` | Linha divisória de período |

**Proibido em fundo `#0d0d0d`:** qualquer valor abaixo de `#444` — contraste insuficiente.

---

## Regras de Uso

1. **Mínimo de fonte no corpo:** 1rem (16px). Use `.enc-body` ou `.enc-lead`.
2. **Captions em cards:** `.enc-caption` (13px) é aceitável em contexto compacto (endereço, telefone).
3. **Labels de seção:** sempre `.enc-label` — nunca `font-black` em texto pequeno.
4. **Hierarquia obrigatória por seção:** label → h2 (ou h3) → lead → body → caption.
5. **Stripe divisória:** usar `<span class="enc-stripe"></span>` antes de seções claras que seguem seções escuras.
6. **font-black reservado:** apenas `.enc-h1`, `.enc-h2`, `.enc-h3`.
7. **Seções escuras:** fundos `#010101` / `#0d0d0d` / `#080808` são paleta editorial — não substituir por vars de tema.

---

## Fontes

- **Overpass** — display e corpo. Weights: 400, 700, 900.
- **Barlow Condensed** — grade de programação, tabs de dia/view. Weights: 400, 700, 900. (Fonte editorial para UI denso — não usar em corpo.)

---

## Estrutura de Seções

| # | Seção | Fundo | Tema |
|---|-------|-------|------|
| 1 | Hero | `#010101` | escuro fixo |
| 2 | Sobre | `enc-surface` | adaptável |
| 3 | Programação | `#0d0d0d` | escuro fixo |
| 4 | CTA inscrição | `#E31B23` | vermelho fixo |
| 5 | Local + mapa | `enc-surface` | adaptável |
| 6 | Formulário | `#010101` | escuro fixo |
| 7 | Comunidade | `#010101` | escuro fixo |
| 8 | Parceiros | `#080808` | escuro fixo |
