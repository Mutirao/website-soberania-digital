# Design System — Soberania Digital

## Overview

The Soberania Digital website is built on **Astro 5** with **Tailwind CSS** and uses a custom design system based on CSS variables for theming. The project uses **Overpass** as the primary typeface with **Inter** as a fallback.

---

## Color System

### Semantic Tokens (CSS Variables)

```css
/* Primary Brand Colors */
--aw-color-primary: #45a2ca;    /* Cyan blue - main brand color */
--aw-color-secondary: #59c3c3;  /* Teal - secondary accent */
--aw-color-accent: #77b978;     /* Green - tertiary accent */

/* CTA / Action Color */
--c60548: #c60548;              /* Deep pink-red - call-to-action buttons */

/* Light Mode Text */
--aw-color-text-heading: #010101;
--aw-color-text-default: #333333;
--aw-color-text-muted: #333333 / 66%;

/* Light Mode Backgrounds */
--aw-color-bg-page: #ffffff;
--sd-section-bg: #ffffff;
--sd-section-alt-bg: #f7f7f7;

/* Dark Mode Overrides */
.dark {
  --aw-color-text-heading: #ffffff;
  --aw-color-text-default: #e0e0e0;
  --aw-color-bg-page: #010101;
  --sd-section-bg: #010101;
  --sd-section-alt-bg: #010101;
}

/* Card/Component Tokens */
--sd-card-bg: #ffffff;          /* Card background */
--sd-card-border: #e5e7eb;       /* Card borders */
--sd-text: #010101;              /* Primary text */
--sd-text-2: #555555;            /* Secondary text */
--sd-text-muted: #888888;        /* Muted text */
```

### Color Usage

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#45a2ca` | Links, highlights, icon backgrounds |
| Deep Pink-Red | `#c60548` | CTA buttons, emphasis |
| Dark Blue | `#004a8e` | Secondary buttons/cards |
| Darker Pink | `#a0043c` | CTA button hover state |
| Page Background | `#ffffff` / `#010101` | Light/dark mode base |
| Section Alt | `#f7f7f7` | Alternating section backgrounds |
| Text Primary | `#010101` / `#ffffff` | Headings and primary text |
| Text Secondary | `#555555` / `#d1d5db` | Body text |
| Text Muted | `#888888` / `#9ca3af` | Captions, metadata |

### Contrast Compliance (WCAG)

| Element | Ratio | Compliance |
|---------|-------|------------|
| Body text (#333 on #fff) | 9.4:1 | AAA |
| Text on dark bg (#fff on #010) | 20:1 | AAA |
| Primary buttons (#c60548 on white) | 4.6:1 | AA |

---

## Typography

### Typeface Stack

```css
--aw-font-sans: 'Overpass', 'Inter Variable', sans-serif;
--aw-font-serif: 'Overpass', 'Inter Variable', sans-serif;
--aw-font-heading: 'Overpass', 'Inter Variable', sans-serif;
```

**Primary Font:** Overpass (Google Fonts)
- Weights: 400, 500, 700, 900
- Used for all text (headings, body, UI)

**Fallback:** Inter Variable (from `@fontsource-variable/inter`)
- Used as fallback for Overpass

### Type Scale

```css
/* CSS custom properties */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;       /* 48px */
```

### Heading Styles

```css
h1, h2, h3, h4, h5, h6 {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
```

| Element | Size | Weight | Transform |
|---------|------|--------|-----------|
| H1 | 4xl-5xl | 900 | uppercase |
| H2 | 3xl-4xl | 900 | uppercase |
| H3 | 2xl-3xl | 900 | uppercase |
| Body | base-lg (16-18px) | 400-500 | none |

### Line Heights

- Headings: `1.1-1.3`
- Body text: `1.5-1.7`
- UI labels: `1.2-1.4`

### Reading Width

```css
p {
  max-width: 65ch; /* Optimal reading width */
}
```

---

## Spacing System

**8-point grid system** based on Tailwind defaults:

| Token | Value | Common Usage |
|-------|-------|--------------|
| `--space-1` | 4px | Icon gaps |
| `--space-2` | 8px | Small gaps |
| `--space-3` | 12px | Icon-text gaps |
| `--space-4` | 16px | Card padding, form fields |
| `--space-5` | 20px | Component padding |
| `--space-6` | 24px | Section padding |
| `--space-8` | 32px | Section gaps |
| `--space-10` | 40px | Large spacing |
| `--space-12` | 48px | Section dividers |
| `--space-16` | 64px | Major sections |

### Component Spacing

| Component | Padding | Gap |
|-----------|---------|-----|
| Card | 16-24px | 16-24px |
| Section | 32-64px vertical | 16-24px |
| Form field | 16px vertical | 16-24px |
| Button | 8-16px vertical, 16-24px horizontal | 8px |
| Icon + text | — | 8px |

---

## Components

### Buttons

**Primary CTA Button:**
```css
.bg-[#c60548] hover:bg-[#a0043c]
text-white font-bold py-4 px-8 text-lg
transition-colors shadow-lg
```

**Secondary Button:**
```css
.bg-white hover:bg-gray-200
text-[#010101] font-bold py-4 px-10 text-xl
transition-colors shadow-lg
```

**Telegram Link Button:**
```css
.bg-[#004a8e] hover:bg-[#003d73]
text-white font-bold
transition-colors
```

### Cards

```css
background: var(--sd-card-bg);
border: 1px solid var(--sd-card-border);
```

### Icon System

Icons are inline SVGs using `currentColor`. Sizes follow the system:

| Size | Value | Usage |
|------|-------|-------|
| xs | 12px | Small indicators |
| sm | 16px | UI labels |
| md | 20px | Default |
| lg | 24px | Feature icons |
| xl | 32px | Section icons |
| 2xl | 40px | Large callouts |

---

## Theming

### Dark Mode

Dark mode is handled via a `.dark` class on the `<html>` element, toggled by JavaScript.

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
}
```

### Color Mode Toggle

Component: `src/components/common/ToggleTheme.astro`

---

## Animation

```css
animation: fadeInUp 1s both;

@keyframes fadeInUp {
  0% { opacity: 0, transform: translateY(2rem); }
  100% { opacity: 1, transform: translateY(0); }
}
```

### Interactive States

- **Buttons:** `transition-colors` on hover
- **Links:** Color change on hover via Tailwind
- **Cards:** Background change on hover

---

## Accessibility

### Focus States

Ensure all interactive elements have visible focus states. The project uses Tailwind's default focus rings.

### Selection Color

```css
::selection {
  background-color: #45a2ca / 40%;
}
```

### Scroll Behavior

```css
html {
  scroll-behavior: smooth;
}
```

### Touch Targets

Minimum touch target size should be 44x44px for mobile accessibility.

---

## Layout

### Max Widths

| Container | Max Width | Usage |
|-----------|-----------|-------|
| Content | 65ch | Text blocks |
| Cards | 6xl (72rem) | Feature sections |
| Wide | 7xl (80rem) | Hero, major sections |
| Full | None | Video embeds, images |

### Section Structure

```html
<section class="py-16 bg-[var(--sd-section-bg)]">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <!-- content -->
  </div>
</section>
```

### Breakpoints

- Mobile: default (0-639px)
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

---

## Resources

- [Tailwind CSS](https://tailwindcss.com/docs)
- [Overpass Font](https://overpassfont.org/)
- [Fontsource Inter](https://fontsource.org/)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)