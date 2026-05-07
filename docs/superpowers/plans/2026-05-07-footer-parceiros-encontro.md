# Footer de Parceiros — Página Encontro — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir a seção 8 de `src/pages/encontro.astro` por um rodapé de parceiros com hierarquia visual clara (Realização e Apoio Institucional em destaque com logos; Organização e Apoio em texto), suporte a light/dark mode.

**Architecture:** Modificação inline de `encontro.astro` (sem novo componente), atualização de `evento.json` para migrar `realizacao` e `patrocinio` de `string[]` para `{nome, url, logo, logoType}[]`, e download de logos para `public/logos/`.

**Tech Stack:** Astro 5, Tailwind CSS v3 (dark mode via `.dark` class), JSON data, HTML estático sem JS.

---

## Arquivos

- Modificar: `src/pages/encontro.astro` — substituir seção 8 (linhas 912–931)
- Modificar: `src/data/evento.json` — migrar `partnersGrid.realizacao` e `partnersGrid.patrocinio`
- Criar: `public/logos/cgibr.png` — logo do CGI.br baixada do site oficial

---

## Task 1: Baixar logo do CGI.br e criar estrutura de logos

**Files:**
- Criar: `public/logos/cgibr.png`

- [ ] **Step 1: Criar diretório e baixar logo**

```bash
mkdir -p /mnt/data/code/mutirao/website-soberania-digital/website-soberania-digital/public/logos
curl -L "https://cgi.br/docs-assets/images/logo_CGIbr.png" \
  -o /mnt/data/code/mutirao/website-soberania-digital/website-soberania-digital/public/logos/cgibr.png
```

Verificar que o arquivo foi criado e tem tamanho > 0:

```bash
ls -lh /mnt/data/code/mutirao/website-soberania-digital/website-soberania-digital/public/logos/cgibr.png
```

Saída esperada: arquivo listado com tamanho em KB.

- [ ] **Step 2: Verificar logo da Rede Soberania Digital (já existe)**

```bash
ls -lh /mnt/data/code/mutirao/website-soberania-digital/website-soberania-digital/public/identidade-visual-soberania.png
```

Saída esperada: arquivo listado. Será referenciada como `/identidade-visual-soberania.png` (public/).

- [ ] **Step 3: Commit**

```bash
cd /mnt/data/code/mutirao/website-soberania-digital/website-soberania-digital
git add public/logos/
git commit -m "assets: adiciona logo CGI.br para rodapé de parceiros"
```

---

## Task 2: Atualizar evento.json — migrar realizacao e patrocinio para objetos

**Files:**
- Modificar: `src/data/evento.json`

- [ ] **Step 1: Alterar `partnersGrid.realizacao` de string[] para object[]**

Localizar no arquivo (linha ~284):
```json
"realizacao": ["Rede pela Soberania Digital"],
```

Substituir por:
```json
"realizacao": [
  {
    "nome": "Rede pela Soberania Digital",
    "url": "https://soberania.digital",
    "logo": "/identidade-visual-soberania.png",
    "logoType": "color"
  }
],
```

- [ ] **Step 2: Alterar `partnersGrid.patrocinio` de string[] para object[]**

Localizar no arquivo (linha ~287):
```json
"patrocinio": ["Comitê Gestor da Internet no Brasil (CGI.br)"],
```

Substituir por:
```json
"patrocinio": [
  {
    "nome": "Comitê Gestor da Internet no Brasil (CGI.br)",
    "url": "https://cgi.br",
    "logo": "/logos/cgibr.png",
    "logoType": "color"
  }
],
```

- [ ] **Step 3: Validar JSON**

```bash
cd /mnt/data/code/mutirao/website-soberania-digital/website-soberania-digital
node -e "const d = require('./src/data/evento.json'); console.log('realizacao:', JSON.stringify(d.partnersGrid.realizacao)); console.log('patrocinio:', JSON.stringify(d.partnersGrid.patrocinio));"
```

Saída esperada:
```
realizacao: [{"nome":"Rede pela Soberania Digital","url":"https://soberania.digital","logo":"/identidade-visual-soberania.png","logoType":"color"}]
patrocinio: [{"nome":"Comitê Gestor da Internet no Brasil (CGI.br)","url":"https://cgi.br","logo":"/logos/cgibr.png","logoType":"color"}]
```

- [ ] **Step 4: Commit**

```bash
git add src/data/evento.json
git commit -m "data(evento): migra realizacao e patrocinio para objetos com logo"
```

---

## Task 3: Substituir seção 8 em encontro.astro

**Files:**
- Modificar: `src/pages/encontro.astro` linhas 912–931

- [ ] **Step 1: Localizar bloco a substituir**

O bloco atual começa em:
```astro
    <!-- ═══════════════════════════════════════════════════════════
         8. PARCEIROS E APOIO
    ═══════════════════════════════════════════════════════════ -->
    <section class="bg-[#080808] py-12 border-t border-[#1a1a1a]">
```

e termina em:
```astro
    </section>

  </div>
</Layout>
```

- [ ] **Step 2: Substituir a seção 8 inteira pelo novo markup**

Substituir o bloco completo da seção 8 (do comentário até `</section>`) por:

```astro
    <!-- ═══════════════════════════════════════════════════════════
         8. PARCEIROS E APOIO
    ═══════════════════════════════════════════════════════════ -->
    <section class="bg-white dark:bg-[#080808] py-16 md:py-20 border-t border-[#e5e7eb] dark:border-[#1a1a1a]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">

        <!-- REALIZAÇÃO -->
        <div class="mb-10 text-center">
          <p class="text-[#E31B23] text-[0.6875rem] font-bold uppercase tracking-[0.12em] mb-6">Realização</p>
          <div class="flex justify-center gap-8 flex-wrap">
            {partnersGrid.realizacao.map((org: any) => (
              org.logo ? (
                <a href={org.url} target="_blank" rel="noopener noreferrer"
                  class="inline-flex items-center justify-center">
                  <img
                    src={org.logo}
                    alt={org.nome}
                    class={`h-20 w-auto object-contain transition-opacity hover:opacity-80 ${org.logoType === 'mono' ? 'dark:brightness-0 dark:invert' : 'dark:opacity-80'}`}
                  />
                </a>
              ) : (
                <div class="border border-dashed border-[#ccc] dark:border-[#444] h-20 w-64 flex items-center justify-center">
                  <span class="text-[#555] dark:text-[#777] font-bold text-sm text-center px-4">{org.nome}</span>
                </div>
              )
            ))}
          </div>
        </div>

        <!-- APOIO INSTITUCIONAL -->
        <div class="border-t border-[#e5e7eb] dark:border-[#1a1a1a] pt-10 mb-10 text-center">
          <p class="text-[#E31B23] text-[0.6875rem] font-bold uppercase tracking-[0.12em] mb-6">Apoio Institucional</p>
          <div class="flex justify-center gap-8 flex-wrap">
            {partnersGrid.patrocinio.map((org: any) => (
              org.logo ? (
                <a href={org.url} target="_blank" rel="noopener noreferrer"
                  class="inline-flex items-center justify-center">
                  <img
                    src={org.logo}
                    alt={org.nome}
                    class={`h-14 w-auto object-contain transition-opacity hover:opacity-80 ${org.logoType === 'mono' ? 'dark:brightness-0 dark:invert' : 'dark:opacity-80'}`}
                  />
                </a>
              ) : (
                <div class="border border-dashed border-[#ccc] dark:border-[#444] h-14 w-48 flex items-center justify-center">
                  <span class="text-[#555] dark:text-[#777] font-bold text-sm text-center px-4">{org.nome}</span>
                </div>
              )
            ))}
          </div>
        </div>

        <!-- ORGANIZAÇÃO -->
        <div class="border-t border-[#e5e7eb] dark:border-[#1a1a1a] pt-10 mb-10">
          <p class="text-[#777] dark:text-[#555] text-[0.6875rem] font-bold uppercase tracking-[0.12em] mb-3">Organização</p>
          <p class="text-[#555] dark:text-[#666] text-sm">
            {partnersGrid.producao.join(' · ')}
          </p>
        </div>

        <!-- APOIO -->
        <div class="border-t border-[#e5e7eb] dark:border-[#1a1a1a] pt-10">
          <p class="text-[#777] dark:text-[#555] text-[0.6875rem] font-bold uppercase tracking-[0.12em] mb-3">Apoio</p>
          <div class="flex flex-wrap gap-2">
            {partnersGrid.apoio.map((item: string) => (
              <span class="border border-[#e5e7eb] dark:border-[#222] text-[#555] dark:text-[#777] px-3 py-1.5 text-xs">
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
```

- [ ] **Step 3: Verificar build sem erros TypeScript**

```bash
cd /mnt/data/code/mutirao/website-soberania-digital/website-soberania-digital
npx astro check 2>&1 | tail -20
```

Saída esperada: sem erros em `encontro.astro`. Warnings sobre outros arquivos são ignoráveis.

- [ ] **Step 4: Commit**

```bash
git add src/pages/encontro.astro
git commit -m "feat(encontro): rodapé de parceiros com hierarquia visual e logos"
```

---

## Task 4: Verificação visual no browser

**Files:** nenhum (somente verificação)

- [ ] **Step 1: Subir dev server**

```bash
cd /mnt/data/code/mutirao/website-soberania-digital/website-soberania-digital
npm run dev -- --port 4321
```

- [ ] **Step 2: Verificar em light mode**

Abrir `http://localhost:4321/encontro` no browser. Rolar até o final da página.

Checar:
- Label "REALIZAÇÃO" em vermelho (#E31B23)
- Logo da Rede Soberania Digital visível e com altura razoável (~80px)
- Separador horizontal entre os grupos
- Label "APOIO INSTITUCIONAL" em vermelho
- Logo do CGI.br visível
- "ORGANIZAÇÃO" e "APOIO" em cor muted
- Tags de apoio com borda sutil
- Fundo branco (light mode)

- [ ] **Step 3: Verificar em dark mode**

Alternar para dark mode (botão no header ou `document.documentElement.classList.add('dark')` no console do browser).

Checar:
- Fundo escuro (#080808)
- Logos com `dark:opacity-80` aplicado (ligeiramente transparentes)
- Separadores e tags com bordas escuras visíveis
- Sem logos quebradas ou placeholders inesperados

- [ ] **Step 4: Verificar mobile (375px)**

No browser, redimensionar para 375px de largura.

Checar:
- Logo centralizada e não cortada
- Tags de apoio fazendo wrap corretamente
- Sem overflow horizontal

- [ ] **Step 5: Commit final se ajustes foram necessários**

Se foi preciso ajustar algum detalhe visual:

```bash
git add src/pages/encontro.astro
git commit -m "fix(encontro): ajustes visuais rodapé de parceiros"
```

---

## Critérios de aceite

- [ ] Seção 8 substituída sem regressão nas seções 1–7
- [ ] Logo da Rede Soberania Digital visível em light e dark mode
- [ ] Logo do CGI.br visível em light e dark mode
- [ ] Organização renderiza como texto inline com `·` entre orgs
- [ ] Apoio renderiza como tags com borda sutil
- [ ] Responsivo: sem overflow em 375px
- [ ] `evento.json` válido e sem quebra de outros usos de `partnersGrid`
- [ ] `npx astro check` sem erros em `encontro.astro`
