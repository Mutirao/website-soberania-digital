# Design System — Soberania Digital

> "Free software can have cool and sexy toys."

---

## Product Context

- **What this is:** Event landing page for the 2nd National Meeting for Digital Sovereignty — a civic/political mobilization event in Brasilia with 130+ speakers, schedule grid, registration form, and partner logos.
- **Who it's for:** Activists, researchers, policymakers, technologists fighting for digital sovereignty in Brazil.
- **Space:** Civic tech, digital rights, political mobilization.
- **Project type:** Single-page event landing site.
- **Stack:** Astro 6, Tailwind CSS 4, static build.

## Aesthetic Direction

- **Direction:** Dark editorial — near-black canvases with bold, confident signal colors. Data-dense but structured, not cluttered. Political rally energy with editorial precision.
- **Decoration level:** Minimal-intentional. Typography and color do the work. The stripe gradient is the only decorative element — use it sparingly.
- **Mood:** Walking into a packed auditorium before the opening keynote. Serious intent, high energy, beautiful execution. Not a conference brochure, not a tech startup landing page.
- **Memorable thing:** This feels like a movement that knows what it's doing — serious politics, compelling design.

### SAFE CHOICES (category baseline — users expect these)

- Dark background as default — civic/activist event sites go dark for authority and focus
- Bold uppercase display type for headings — legible and urgent
- Single-page scroll with clear section breaks — standard for event landings
- Strong CTA color that punches against dark (the #E31B23 red)

### RISKS (where this product gets its own face)

- **Near-black as the primary canvas** (#010101, #0d0d0d, #080808 — three distinct blacks for section rhythm). Most events use white or alternating light/dark. We commit to dark. The risk: every photo and logo must work on dark. The gain: the site feels like a stage, not a document.
- **Barlow Condensed for the schedule grid** — a compressed, editorial font for data-dense UI. Most events use the same font everywhere. The risk: two fonts must coexist without clashing. The gain: the schedule grid looks like a newspaper, not a spreadsheet.
- **Stripe gradient as the ONLY decorative element** (#E31B23 60% / #FFD400 40%). No blobs, no gradients on buttons, no decorative illustrations. One signature move, used consistently. The risk: restraint can feel austere. The gain: everything that IS decorated matters more.

---

## Color

### Accent Colors

| Token | Hex | Uso |
|-------|-----|-----|
| Vermelho ação | `#E31B23` | CTA buttons, accents, section dividers, emphasis |
| Amarelo sinal | `#FFD400` | Labels on dark backgrounds, time badges |
| Azimute blue | `#45a2ca` | Links, highlights, icons |
| Teal | `#59c3c3` | Secondary accent |
| Verde | `#77b978` | Tertiary accent |
| Telegram blue | `#004a8e` | Telegram button |

### Background Colors

| Token | Hex | Uso |
|-------|-----|-----|
| Preto editorial | `#010101` | Primary background, hero, form, community |
| Preto grade | `#0d0d0d` | Schedule section background |
| Preto parceiros | `#080808` | Partners section background |
| Branco quente | `#E7E7D8` | Subtitles on hero |
| Surface light | `#ffffff` | Light-mode sections |
| Surface alt | `#f7f7f7` | Light-mode alternating sections |

### Text Color Ramp (4 tones)

#### Adaptive sections (light/dark via CSS custom properties)

| Var | Light | Dark | Uso |
|-----|-------|------|-----|
| `--enc-text` | `#010101` | `#ffffff` | Headings, h4, labels in cards |
| `--enc-text-body` | `#292929` | `#d1d5db` | Paragraphs, descriptions |
| `--enc-text-muted` | `#666666` | `#9ca3af` | Secondary info, room, location |
| `--enc-c4` | `#aaaaaa` | `#666666` | Footnotes, accessibility hints |

#### Fixed dark sections (schedule, form, community, partners)

These do NOT use CSS vars — intentionally dark-only by editorial design.

| Hex | Uso |
|-----|-----|
| `#e0e0e0` / `#ddd` | Session title, speaker name |
| `#888` / `#777` | Category labels |
| `#555` / `#666` | Support text, grid times |
| `#444` | Divider lines between periods |

**Hard rule:** Nothing below `#444` on `#0d0d0d` — insufficient contrast.

### CTA Colors

| State | Hex | Notes |
|-------|-----|-------|
| Default | `#E31B23` | CTA section background, primary buttons |
| Hover | `#a0043c` | Button hover state |
| Stripe gradient | `#E31B23 60% → #FFD400 40%` | Section divider, 4px height |

---

## Typography

### Font Stack

- **Overpass** — display and body. Weights: 400, 700, 900. Geometric, slightly techy, legible at all sizes. Not overused in this space.
- **Barlow Condensed** — schedule grid, day/view tabs. Weights: 400, 700, 900. Compressed editorial font for data-dense UI. Never for body text.

**Font blacklist for this project:** Inter, Roboto, Arial, Space Grotesk, Poppins, Montserrat, system-ui as display font.

### Type Scale

| Level | Size | Weight | Transform | Tracking | Use |
|-------|------|--------|-----------|----------|-----|
| `.enc-h1` | clamp(40px, 7vw, 64px) | 900 | uppercase | 0.02em | Hero — one per page |
| `.enc-h2` | clamp(28px, 5vw, 44px) | 900 | uppercase | 0.02em | Section headings |
| `.enc-h3` | clamp(20px, 3vw, 28px) | 900 | uppercase | 0.02em | Sub-sections |
| `.enc-lead` | clamp(17px, 2.2vw, 19px) | 400 | — | — | Intro paragraphs |
| `.enc-body` | 16px (1rem) | 400 | — | — | Body text |
| `.enc-caption` | 13px (0.8125rem) | 400 | — | — | Addresses, metadata, footnotes |
| `.enc-label` | 11px (0.6875rem) | 700 | uppercase | 0.12em | Section category, badges |

**Weight rule:** `font-black` (900) ONLY on `.enc-h1`, `.enc-h2`, `.enc-h3`. Labels use `font-bold` (700). Weight 900 in small text destroys hierarchy.

**Minimum body size:** 1rem (16px). Below that, only labels and captions in compact contexts.

### Line Heights

- Headings: 1.1–1.3
- Body: 1.5–1.7
- UI labels: 1.2–1.4

---

## Spacing

- **Base unit:** 4px
- **Density:** Comfortable with intentional compression in the schedule grid
- **Section padding:** `py-16` (64px top/bottom), `px-4 sm:px-6 lg:px-8`
- **Content max-width:** 6xl (72rem) for cards, 7xl (80rem) for hero and main sections, 65ch for text blocks
- **Grid gaps:** `gap-6 md:gap-8` for card grids, `gap-1` for schedule grid cells

### Border Radius

| Level | Value | Use |
|-------|-------|-----|
| none | 0 | Cards, buttons — this system is angular, not rounded |
| sm | 4px | Small UI elements if needed |
| full | 9999px | Pills/tags only |

**Design choice:** No rounded corners by default. The angular language reinforces the political/urgent feel. Rounded = friendly/polite. Angular = decisive/direct.

---

## Layout

- **Approach:** Grid-disciplined for data (schedule), single-column for narrative (hero, about, form)
- **Grid:** 1 col mobile, 2 col md, 3 col lg for card layouts
- **Breakpoints:** sm:640, md:768, lg:1024, xl:1280

### Section Structure

```
<section class="py-16 bg-[var(--enc-surface)]">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <!-- label → heading → lead → body → caption -->
  </div>
</section>
```

### Section Map

| # | Section | Background | Theme |
|---|---------|------------|-------|
| 1 | Hero | `#010101` | Fixed dark |
| 2 | About / Teoria da Mudança | `#010101` | Fixed dark |
| 3 | Schedule | `#0d0d0d` | Fixed dark |
| 4 | CTA Register | `#E31B23` | Fixed red |
| 5 | Location + Map | `enc-surface` | Adaptive |
| 6 | Registration Form | `#010101` | Fixed dark |
| 7 | Partners | `enc-surface` | Adaptive (white / `#080808`) |

**Hierarchy per section:** label → h2 (or h3) → lead → body → caption. Always.

---

## Motion

- **Approach:** Minimal-functional. Only transitions that aid comprehension.
- **Easing:** enter (ease-out), exit (ease-in), move (ease-in-out)
- **Duration:** micro (50-100ms) for hover states, short (150-250ms) for section transitions, medium (250-400ms) for page-level animations
- **Scroll:** `scroll-behavior: smooth`
- **Fade-in:** `fadeInUp` animation on section entry — 1s, translate Y from 2rem

```css
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(2rem); }
  100% { opacity: 1; transform: translateY(0); }
}
```

**No scroll-driven animations, no parallax, no decorative motion.** Motion serves comprehension only.

---

## Components

### CTA Primary

```html
class="bg-cta hover:bg-cta-hover text-white font-bold py-4 px-8 text-lg transition-colors"
```

### CTA Secondary

```html
class="bg-white hover:bg-gray-200 text-enc font-bold py-4 px-10 text-xl transition-colors"
```

### Telegram Button

```html
class="flex items-center gap-4 p-5 bg-telegram hover:bg-[#003d73] transition-colors group"
```

### Card

```html
class="bg-enc-card border border-enc-border p-6"
```

### Stripe Divider

```html
<span class="enc-stripe"></span>
```

4px bar, gradient `#E31B23 60% / #FFD400 40%`. Used between thematic sections only.

### Icon Sizes

| Size | Value | Use |
|------|-------|-----|
| xs | 12px | Indicators |
| sm | 16px | Labels |
| md | 20px | Default |
| lg | 24px | Feature icons |
| xl | 32px | Section icons |
| 2xl | 40px | Highlights |

All inline SVG with `currentColor`.

---

## Dark Mode

- **Strategy:** Dark is default. Light mode is the alternative.
- Dark surfaces: `#010101` (primary), `#0d0d0d` (schedule), `#080808` (partners)
- Adaptive sections switch via CSS custom properties
- Fixed dark sections never switch — editorial intent
- `ui.theme: 'light'` in config.yaml — dark mode is class-based on `<html>`

---

## Anti-Patterns (do not use)

- Purple/violet gradients as accent
- 3-column feature grid with icons in colored circles
- Centered everything with uniform spacing
- Gradient buttons as primary CTA pattern
- `system-ui` / `-apple-system` as display or body font
- Rounded corners by default (angular is the language)
- Stock-photo hero sections
- "Built for X" / "Designed for Y" copy patterns
- Decorative blobs, abstract shapes, or particle backgrounds

---

## Resources

- [Overpass Font](https://overpassfont.org/)
- [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Astro 6](https://docs.astro.build/)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Tailwind Token Reference

All custom tokens are defined in `src/assets/styles/tailwind.css` via `@theme`. Use these in class names: `bg-enc`, `text-sinal`, `border-linha`, etc.

### Color Tokens

| Tailwind class | Hex | Description |
|----------------|-----|-------------|
| `bg-enc` | `#010101` | Primary background (hero, form, community) |
| `bg-grade` | `#0d0d0d` | Schedule grid background |
| `bg-parceiros` | `#080808` | Partners section background |
| `bg-enc-card` | `#141414` | Card backgrounds on dark sections |
| `bg-cta` / `bg-cta-hover` | `#E31B23` / `#b01015` | CTA buttons and section |
| `text-sinal` | `#FFD400` | Yellow signal — labels, badges |
| `text-quente` | `#E7E7D8` | Warm white — subtitles on hero |
| `text-azimute` | `#45a2ca` | Blue accent — links, icons |
| `text-teal` | `#59c3c3` | Secondary accent |
| `text-verde` | `#77b978` | Tertiary accent |
| `bg-telegram` | `#004a8e` | Telegram button |
| `border-linha` | `#1e1e1e` | Dark borders |
| `border-linha-light` | `#e5e5e5` | Light borders |
| `bg-surface` | `#f4f4f4` | Light surface (adaptive sections) |
| `bg-card` | `#f9f9f9` | Light card background |
| `bg-enc-input` | `#111111` | Form input background (dark) |
| `bg-enc-grid` | `#0a0a0a` | Inner grid background |
| `bg-enc-especial` | `#0f0f00` | Special session row |
| `bg-chip-bg` / `border-chip-border` / `text-chip-text` | `#0f2a1a` / `#1e4a2a` / `#6fcf97` | Green chip (category tag) |
| `text-enc-body` | `#292929` | Body text on light |
| `text-enc-muted` | `#555555` | Muted text |
| `text-enc-muted-alt` | `#666666` | Secondary muted |
| `text-enc-label` | `#888888` | Labels, room names |
| `text-enc-text-light` | `#e8e8e8` | Light text on dark |
| `border-enc-line` | `#1a1a1a` | Dark section lines |
| `border-enc-border` | `#333333` | Card/input borders (dark) |
| `bg-enc-input-light` | `#f8f8f8` | Light input background |
| `bg-enc-grid-bg` | `#161616` | Grid cell background |

### Font Token

| Tailwind class | Value | Use |
|----------------|-------|-----|
| `font-grade` | `'Barlow Condensed', sans-serif` | Schedule grid, day/view tabs |

### CSS Variable Reference (in `<style>` blocks)

Inside custom CSS, reference tokens as `var(--color-*)` and `var(--font-*)`:
- `var(--color-cta)` → `#E31B23`
- `var(--color-sinal)` → `#FFD400`
- `var(--color-enc-text-light)` → `#e8e8e8`
- `var(--font-grade)` → `'Barlow Condensed', sans-serif`

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-05-07 | Complete design system rewrite | Consolidated separate files, fixed stale AstroWind references (was "Astro 5.x / Tailwind 3.x"), added aesthetic direction, spacing system, motion guidelines, and anti-patterns. Preserved existing color palette and typography choices that were already working. |
| 2025-05-07 | Refined: removed "neon" direction | Pulled back from "Cyber-Soberania" framing. The brand identity is dark editorial with bold accents — not neon, not cyberpunk. The existing red/yellow/dark palette is strong on its own. |
| 2025-05-07 | Angular > rounded corners | Rounded corners read as friendly/polite. This is a political mobilization site — angular reads as decisive. |
| 2025-05-07 | Barlow Condensed for schedule only | Compressed font in the schedule grid creates newspaper-like density. Using it elsewhere would fight Overpass. |
| 2025-05-08 | Tailwind v4 `@theme` tokens for `index.astro` | Extracted all arbitrary hex colors from `index.astro` into named tokens in `tailwind.css` `@theme` block. 30+ color tokens + 1 font token. Portuguese names (`enc`, `grade`, `sinal`, `quente`) match project locale. Raw hex eliminated from HTML; `<style>` block uses `var(--color-*)` references. |
