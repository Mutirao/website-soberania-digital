# Design System — Página Encontro

Referência: [soberania.digital/encontro-soberania](https://soberania.digital/encontro-soberania/)

---

## Paleta de Cores

| Token | Valor | Uso |
|-------|-------|-----|
| **Preto** | `#010101` | Fundos de seção escura, cor principal de fundo |
| **Vermelho primário** | `#E31B23` | Botões CTA, labels de categoria, destaques |
| **Vermelho escuro** | `#D31122` | Variação de seção vermelha (fundo) |
| **Amarelo/Ouro** | `#FFD400` | Títulos e datas em fundo escuro, labels de evento |
| **Branco** | `#FFFFFF` | Texto em fundos escuros, fundos de seção clara |
| **Creme claro** | `#E7E7D8` | Corpo de texto secundário em fundos escuros |
| **Cinza claro** | `#F2F2F2` | Fundos de seção alternativa (sobre fundo branco) |
| **Cinza escuro** | `#292929` | Corpo de texto em fundos claros |

### Paleta no encontro.astro (atual → referência)

| Elemento | Atual | Referência |
|----------|-------|-----------|
| Label de seção (ex: "Sobre o encontro") | `#45a2ca` azul | `#FFD400` amarelo |
| CTA primário (botão inscrições) | `#c60548` pink-red | `#E31B23` vermelho |
| CTA hover | `#a0043c` | `#b01015` |
| Borda/hover de botão secundário | `#45a2ca` azul | `#FFD400` amarelo |
| Speaker name / destaque inline | `#45a2ca` azul | `#FFD400` amarelo |
| Seção escura CTA | `#010101` (mantém) | `#010101` |

---

## Tipografia

- **Família principal:** Helvetica, Arial, sans-serif (sistema)
- **Fonte atual do site:** Overpass (Google Fonts) — compatível
- **Headings:**
  - Peso: `900` (black/ultra-bold)
  - Transform: `UPPERCASE`
  - Letter-spacing: normal
- **Títulos de data/evento:** amarelo `#FFD400`, peso 900, uppercase
- **Labels de categoria:** vermelho `#E31B23`, peso 900, uppercase, ~20px
- **Corpo de texto em dark:** branco/creme `#E7E7D8`, peso 300–400
- **Corpo de texto em claro:** `#292929`, peso 400

---

## Botões

### Primário (CTA)
```css
background: #E31B23;
color: #FFFFFF;
border-radius: 0;           /* sem arredondamento */
border: none;
font-weight: 700;
font-size: 16px;
padding: 16px;
text-transform: uppercase;
```

### Secundário (contorno escuro)
```css
background: #010101;
color: #FFFFFF;
border: 1px solid #282828;
border-radius: 0;
font-size: 15px;
font-weight: 500;
padding: 12px 24px;
```

### Accent (com borda esquerda amarela)
```css
background: #E31B23;
color: #FFFFFF;
border-left: 4px solid #FFD400;   /* detalhe característico */
border-radius: 0;
padding: 16px 32px;
font-weight: 700;
text-transform: uppercase;
```

---

## Logo — "2º Encontro Nacional Soberania Digital JÁ!"

### Elementos visuais
- Seta/chevron em amarelo `#FFD400` estilizando a bandeira do Brasil (pixelada/digital)
- Pixels verde e vermelho compõem o motivo da bandeira
- "SOBERANIA DIGITAL JÁ!" em branco, peso 900, maiúsculas
- "2º ENCONTRO NACIONAL PELA" em branco, menor, acima
- "SEM ELA, NÃO HÁ SOBERANIA NACIONAL" em vermelho `#E31B23`, sublinhado em vermelho
- Sempre em fundo **preto** `#010101`

### Versões
| Versão | Uso |
|--------|-----|
| Square 1080×1080px | Redes sociais, hero mobile |
| Landscape 1024×455px | Hero desktop, banner de identidade |

### URLs de referência
- Horizontal: `https://soberania.digital/wp-content/uploads/sites/16/2026/04/Identidade-visual-soberania-1024x455.png`
- Square: `https://soberania.digital/wp-content/uploads/sites/16/2026/05/Sem-nome-1080-x-1080-px.png`

---

## Layout e Estrutura de Seções

### Padrão alternado
```
[Fundo preto]  → hero com logo + data em amarelo + CTA vermelho
[Fundo branco] → conteúdo editorial (texto + imagem)
[Fundo preto]  → CTA de ação ou chamada de destaque
[Fundo branco] → lista/cards
[Fundo cinza]  → seção especial (carta, manifesto)
[Fundo preto]  → seção final (rede, comunidade)
```

### Hero (fundo preto `#010101`)
- Logo à esquerda
- Data e local em amarelo à direita, peso 900 uppercase
- CTA vermelho abaixo

### Seções de conteúdo (fundo branco)
- Label de categoria: vermelho `#E31B23`, uppercase, peso 900, ~20px
- Título: preto `#010101`, uppercase, peso 900, ~45px
- Corpo: cinza `#292929`, peso 400, ~25px
- Botão "LEIA O MANIFESTO": vermelho

### Seções CTA (fundo preto)
- Label no topo: amarelo `#FFD400`, uppercase
- Título grande: branco, uppercase, peso 900
- Subtítulo: branco/creme
- CTA: vermelho

### Cards de mídia / press
- Fundo branco com borda amarela `#FFD400` em destaque
- Quote em fonte grande, preto

---

## Padrões Específicos

### Label de seção (acima do título)
```html
<p class="text-[#E31B23] font-black uppercase tracking-widest text-sm mb-3">
  MANIFESTO
</p>
```

### Título de seção em dark
```html
<h2 class="text-[#FFD400] font-black uppercase text-5xl">
  PROGRAMAÇÃO:
</h2>
```

### Botão com borda amarela
```html
<a class="bg-[#E31B23] text-white font-bold px-8 py-4 border-l-4 border-[#FFD400] uppercase">
  VEJA NAS PLATAFORMAS
</a>
```

### Blockquote de destaque
```html
<blockquote class="border-l-4 border-[#E31B23] pl-6 text-[#292929]">
  ...texto...
</blockquote>
```

---

## Exemplo HTML de Seção Hero

```html
<section style="background: #010101; padding: 80px 0;">
  <div style="max-width: 900px; margin: 0 auto; padding: 0 24px; display: flex; gap: 48px; align-items: center;">
    <!-- Logo -->
    <div style="flex: 0 0 420px;">
      <img src="/banner-encontro-1080.png" alt="2º Encontro Nacional pela Soberania Digital" style="width: 100%;" />
    </div>
    <!-- Date + CTA -->
    <div style="flex: 1; color: #FFD400; font-family: Helvetica, sans-serif;">
      <h2 style="font-size: 60px; font-weight: 900; text-transform: uppercase; line-height: 1.1; margin: 0 0 16px;">
        18 E 19<br>DE MAIO<br>BRASÍLIA
      </h2>
      <a href="#inscrições"
        style="display: inline-block; background: #E31B23; color: #fff;
               font-weight: 700; font-size: 16px; padding: 16px 32px;
               border-left: 4px solid #FFD400; text-decoration: none;
               text-transform: uppercase;">
        INSCREVA-SE
      </a>
    </div>
  </div>
</section>
```

## Exemplo HTML de Seção Editorial (fundo branco)

```html
<section style="background: #ffffff; padding: 80px 0;">
  <div style="max-width: 900px; margin: 0 auto; padding: 0 24px;">
    <!-- Label categoria -->
    <p style="color: #E31B23; font-weight: 900; text-transform: uppercase;
              font-size: 14px; letter-spacing: 0.1em; margin-bottom: 12px;">
      MANIFESTO
    </p>
    <!-- Título -->
    <h2 style="color: #010101; font-weight: 900; text-transform: uppercase;
               font-size: 45px; line-height: 1.1; margin-bottom: 20px;">
      SOBERANIA DIGITAL NAS UNIVERSIDADES PÚBLICAS BRASILEIRAS
    </h2>
    <!-- Corpo -->
    <p style="color: #292929; font-size: 25px; font-weight: 400; line-height: 1.5;">
      Quem controla o software, o hardware e a conexão de rede controla o mundo digital...
    </p>
    <!-- CTA -->
    <a href="#"
      style="display: inline-block; background: #E31B23; color: #fff;
             font-weight: 700; padding: 16px 32px; text-decoration: none;
             text-transform: uppercase; margin-top: 24px;">
      LEIA O MANIFESTO
    </a>
  </div>
</section>
```

## Exemplo HTML de Seção CTA Final (fundo preto)

```html
<section style="background: #010101; padding: 120px 0; text-align: center;">
  <div style="max-width: 900px; margin: 0 auto; padding: 0 24px;">
    <p style="color: #FFD400; font-weight: 900; text-transform: uppercase;
              font-size: 14px; letter-spacing: 0.15em; margin-bottom: 16px;">
      PRESTA ATENÇÃO NAS REUNIÕES DA
    </p>
    <h2 style="color: #ffffff; font-weight: 900; text-transform: uppercase;
               font-size: 64px; line-height: 1.05; margin-bottom: 40px;">
      REDE PELA SOBERANIA DIGITAL
    </h2>
    <a href="#"
      style="display: inline-block; background: #E31B23; color: #fff;
             border-left: 4px solid #FFD400; font-weight: 700; font-size: 16px;
             padding: 16px 48px; text-decoration: none; text-transform: uppercase;">
      VEJA NAS PLATAFORMAS
    </a>
  </div>
</section>
```
