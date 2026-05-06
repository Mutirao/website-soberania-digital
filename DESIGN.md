# Design System - Soberania Digital

> Documentação de design para projeto Astro com Tailwind CSS utilizando o template [AstroWind](https://github.com/onwidget/astrowind)

---

## Índice

1. [Visão Geral](#visão-geral)
2. [Paleta de Cores](#paleta-de-cores)
3. [Tipografia](#tipografia)
4. [Componentes](#componentes)
5. [Layout](#layout)
6. [Responsividade](#responsividade)
7. [Boas Práticas](#boas-práticas)

---

## Visão Geral

```yaml
Projeto: Soberania Digital
Framework: Astro 5.x
Estilização: Tailwind CSS 3.x
Template Base: AstroWind
Build: Static
Dark Mode: class-based (.dark on html)
```

### Objetivos de Design

- Identidade visual forte e coerente
- Acessibilidade WCAG 2.1 AA
- Performance otimizada (Lighthouse 90+)
- Mobile-first responsivo
- Dark mode nativo

---

## Paleta de Cores

### Cores Primárias

```css
/* Primárias */
--aw-color-primary: #45a2ca;    /* Cyan blue - cor principal da marca */
--aw-color-secondary: #59c3c3;  /* Teal - acento secundário */
--aw-color-accent: #77b978;       /* Green - acento terciário */

/* CTA / Ação */
--c60548: #c60548;               /* Rosa-vermelho - botões de ação */
--a0043c: #a0043c;               /* Hover do CTA */
```

### Cores de Seção

```css
/* Light Mode */
--sd-section-bg: #ffffff;       /* Fundo principal */
--sd-section-alt-bg: #f7f7f7;    /* Fundo alternado */
--sd-text: #010101;              /* Texto primário */
--sd-text-2: #555555;            /* Texto secundário */
--sd-text-muted: #888888;       /* Texto terciário/muted */
--sd-card-bg: #ffffff;           /* Fundo de cards */
--sd-card-border: #e5e7eb;       /* Bordas de cards */
--sd-primary: #004a8e;          /* Botão Telegram */
--sd-primary-hover: #003d73;
```

### Dark Mode

```css
.dark {
  --aw-color-text-heading: #ffffff;
  --aw-color-text-default: #e0e0e0;
  --aw-color-bg-page: #010101;
  --sd-section-bg: #010101;
  --sd-section-alt-bg: #010101;
  --sd-text: #ffffff;
  --sd-text-2: #d1d5db;
  --sd-text-muted: #9ca3af;
  --sd-card-bg: #111827;
  --sd-card-border: #1f2937;
  --sd-primary: #45a2ca;
  --sd-primary-hover: #3a8ab0;
}
```

### Paleta Consolidada

| Nome | Hex | Uso |
|------|-----|-----|
| Primary Blue | `#45a2ca` | Links, destaques, ícones |
| Deep Pink-Red | `#c60548` | CTA buttons, ênfase |
| Dark Blue | `#004a8e` | Botão Telegram |
| Darker Pink | `#a0043c` | CTA hover |
| Section BG | `#ffffff` / `#010101` | Fundos de seção |
| Section Alt | `#f7f7f7` | Fundos alternados |
| Text Primary | `#010101` / `#ffffff` | Títulos |
| Text Secondary | `#555555` / `#d1d5db` | Corpo de texto |
| Text Muted | `#888888` / `#9ca3af` | Legendas, metadados |

### Contraste WCAG

| Elemento | Razão | Conformidade |
|----------|-------|--------------|
| Body text (#333 on #fff) | 9.4:1 | AAA |
| Text on dark (#fff on #010) | 20:1 | AAA |
| Primary buttons (#c60548 on white) | 4.6:1 | AA |

---

## Tipografia

### Fontes

```css
--aw-font-sans: 'Overpass', 'Inter Variable', sans-serif;
--aw-font-serif: 'Overpass', 'Inter Variable', sans-serif;
--aw-font-heading: 'Overpass', 'Inter Variable', sans-serif;
```

**Overpass** (Google Fonts) - weights 400, 500, 700, 900
**Fallback:** Inter Variable (from `@fontsource-variable/inter`)

### Escala Tipográfica

```css
h1, h2, h3, h4, h5, h6 {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  text-wrap: balance;
}
```

| Elemento | Tamanho | Weight | Transform |
|----------|---------|--------|-----------|
| H1 | 4xl-5xl | 900 | uppercase |
| H2 | 3xl-4xl | 900 | uppercase |
| H3 | 2xl-3xl | 900 | uppercase |
| Body | base-lg (16-18px) | 400 | none |

### Line Heights

- Headings: `1.1-1.3`
- Body text: `1.5-1.7`
- UI labels: `1.2-1.4`

---

## Componentes

### Buttons

**CTA Primário:**
```html
class="bg-[#c60548] hover:bg-[#a0043c] text-white font-bold py-4 px-8 text-lg transition-colors shadow-lg"
```

**CTA Secundário:**
```html
class="bg-white hover:bg-gray-200 text-[#010101] font-bold py-4 px-10 text-xl transition-colors shadow-lg"
```

**Botão Telegram:**
```html
class="flex items-center gap-4 p-5 bg-[var(--sd-primary)] hover:bg-[var(--sd-primary-hover)] transition-colors group"
```

### Cards

```html
class="bg-[var(--sd-card-bg)] border border-[var(--sd-card-border)] p-6"
```

### Icon System

Tamanhos (inline SVG com `currentColor`):

| Tamanho | Valor | Uso |
|---------|-------|-----|
| xs | 12px | Indicadores |
| sm | 16px | Labels |
| md | 20px | Default |
| lg | 24px | Ícones de features |
| xl | 32px | Ícones de seção |
| 2xl | 40px | Destaques |

---

## Layout

### Estrutura de Seção

```html
<section class="py-16 bg-[var(--sd-section-bg)]">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <!-- content -->
  </div>
</section>
```

### Max Widths

| Container | Max Width | Uso |
|-----------|-----------|-----|
| Content | 65ch | Blocos de texto |
| Cards | 6xl (72rem) | Seções de features |
| Wide | 7xl (80rem) | Hero, seções principais |
| Full | None | Video embeds, imagens |

### Breakpoints

- Mobile: default (0-639px)
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

---

## Responsividade

### Padrões

```html
<!-- Grid responsivo -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

<!-- Tipografia fluida -->
<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">

<!-- Espaçamento adaptativo -->
<section class="py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
```

### Touch Targets

Mínimo de 44x44px para acessibilidade mobile.

---

## Boas Práticas

### Seleção de Cor

```css
::selection {
  background-color: #45a2ca / 40%;
}
```

### Scroll Suave

```css
html {
  scroll-behavior: smooth;
}
```

### Animation

```css
animation: fadeInUp 1s both;

@keyframes fadeInUp {
  0% { opacity: 0, transform: 'translateY(2rem)'; }
  100% { opacity: 1, transform: 'translateY(0)'; }
}
```

### Checklist de Lançamento

- [x] Paleta de cores aplicada consistentemente
- [x] Tipografia configurada com fallbacks
- [x] Dark mode funcional
- [x] Responsividade testada
- [ ] Acessibilidade: navegação por teclado
- [ ] SEO: meta tags

---

## Recursos

- [Tailwind CSS](https://tailwindcss.com/docs)
- [Overpass Font](https://overpassfont.org/)
- [Fontsource Inter](https://fontsource.org/)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [AstroWind Template](https://github.com/onwidget/astrowind)