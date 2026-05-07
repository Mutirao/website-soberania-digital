# Design: Rodapé de Parceiros — Página Encontro

**Data:** 2026-05-07  
**Escopo:** Substituir a seção 8 (PARCEIROS E APOIO) de `src/pages/encontro.astro`

---

## Objetivo

Apresentar realizadores, apoiadores institucionais, organização e apoio do 2º Encontro Nacional pela Soberania Digital seguindo boas práticas de apresentação de financiadores em eventos políticos/sociais: hierarquia visual clara, espaço para logos e suporte a temas claro e escuro.

---

## Hierarquia de grupos

| Tier | Grupo JSON | Destaque | Logo |
|------|-----------|----------|------|
| 1 | `realizacao` | Principal — label vermelho, logo grande | Sim (240×80px) |
| 2 | `patrocinio` | Principal — label vermelho, logo médio | Sim (180×60px) |
| 3 | `producao` | Secundário — label muted, texto inline | Não |
| 4 | `apoio` | Secundário — label muted, tags flex-wrap | Não |

---

## Layout (abordagem A — faixas horizontais)

```
bg-white / dark:bg-[#080808]
border-t border-[#e5e7eb] / dark:border-[#1a1a1a]
py-16 md:py-20
max-w-6xl mx-auto px-4 sm:px-6

REALIZAÇÃO                 ← enc-label, text-[#E31B23]
[logo 240×80px centrada]   ← fallback: borda tracejada + nome em texto

── border-t border-[#e5e7eb] dark:border-[#1a1a1a] ──

APOIO INSTITUCIONAL        ← enc-label, text-[#E31B23]
[logo 180×60px centrada]   ← mesmo tratamento de fallback

── border-t ──

ORGANIZAÇÃO                ← enc-label, text-[#777] dark:text-[#555]
Instituto Mutirão · Coletivo Digital · FENADADOS

── border-t ──

APOIO                      ← enc-label, text-[#777] dark:text-[#555]
[tag] [tag] [tag] ...      ← border border-[#ddd] dark:border-[#222]
```

---

## Dados — mudanças em `evento.json`

`realizacao` e `patrocinio` migram de `string[]` para `object[]`:

```json
"realizacao": [
  { "nome": "Rede pela Soberania Digital", "url": "https://soberania.digital", "logo": "/identidade-visual-soberania.png", "logoType": "color" }
],
"patrocinio": [
  { "nome": "Comitê Gestor da Internet no Brasil (CGI.br)", "url": "https://cgi.br", "logo": "/logos/cgibr.svg", "logoType": "color" }
]
```

`producao` e `apoio` permanecem como `string[]`.

---

## Logos

- **Pasta:** `public/logos/`
- **Rede pela Soberania Digital:** usar `/identidade-visual-soberania.png` (já existe em `public/`) — referenciar diretamente
- **CGI.br:** baixar SVG/PNG do site oficial `cgi.br`
- **Fallback (logo ausente):** `<div>` com `border border-dashed border-[#333] dark:border-[#555]`, altura fixa, nome da org centralizado em texto muted

---

## Tratamento de logos no dark mode

- `logoType: "mono"` → `dark:brightness-0 dark:invert` (inverte para branco)
- `logoType: "color"` → `dark:opacity-80` (mantém cor, reduz brilho)
- Campo `logoType` obrigatório em cada objeto de `realizacao` e `patrocinio`

---

## Tipografia e cores

Segue tokens existentes da página encontro:

| Elemento | Classe / valor |
|----------|---------------|
| Label tier destaque | `enc-label text-[#E31B23]` |
| Label tier secundário | `enc-label text-[#777] dark:text-[#555]` |
| Nome org (fallback logo) | `font-bold text-[#292929] dark:text-[#777]` |
| Nome org organização | `text-[#555] dark:text-[#777] enc-caption` |
| Tag apoio | `border border-[#ddd] dark:border-[#222] text-[#555] dark:text-[#777] px-3 py-1.5 enc-caption` |
| Fundo seção | `bg-white dark:bg-[#080808]` |
| Divisória entre tiers | `border-t border-[#e5e7eb] dark:border-[#1a1a1a]` |

---

## Implementação

- **Arquivo principal:** `src/pages/encontro.astro` — substituir seção 8 (linhas 912–931)
- **Dados:** `src/data/evento.json` — atualizar `realizacao` e `patrocinio`
- **Logos:** criar `public/logos/`, baixar CGI.br, referenciar logo Soberania Digital
- **Nenhum novo componente** — HTML inline, seguindo padrão do arquivo
- **Sem JavaScript** — seção estática pura

---

## Critérios de aceite

- [ ] Substitui a seção 8 sem regressão nas demais seções
- [ ] Renderiza corretamente em light e dark mode
- [ ] Logo de Realização visível com fallback funcional se arquivo ausente
- [ ] Logo de Apoio Institucional (CGI.br) visível com fallback funcional
- [ ] Organização e Apoio renderizam em texto/tags
- [ ] Layout responsivo: mobile empilhado, desktop centralizado
- [ ] `evento.json` atualizado sem quebrar outros usos de `partnersGrid`
