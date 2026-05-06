# Página do Programa — 2º Encontro Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Criar uma página web (`/encontro-2026/programa`) que reproduza fielmente o conteúdo e layout visual do PDF *PROGRAMA - 2º ENCONTRO.pdf*, usando a identidade visual da Rede pela Soberania Digital.

**Architecture:** Página Astro com Layout padrão (PageLayout), seções em HTML+Tailwind CSS, dados do programa em arrays TypeScript no frontmatter, assets já existentes em `/public/`.

**Tech Stack:** Astro, Tailwind CSS, TypeScript, HTML semântico.

---

## Contexto do Projeto

- Repo: `/home/lucas/workspace/website-soberania-digital`
- Branch atual: `feat/encontro-2026-programacao`
- Layout base: `src/layouts/PageLayout.astro`
- Página existente: `src/pages/encontro-2026.astro` (referência de estilo)
- Design system: `DESIGN-encontro.md`
- Assets: banners em `/public/encontro-2026-banner.png`, etc.
- Build: `npm run build` ou `npm run dev`

---

### Task 1: Criar estrutura da página com Layout

**Objective:** Criar o arquivo da página do programa com metadata e Layout base.

**Files:**
- Create: `src/pages/encontro-2026/programa.astro`

**Step 1: Criar o arquivo base**

```astro
---
import Layout from '~/layouts/PageLayout.astro';

const metadata = {
  title: 'Programa — 2º Encontro Nacional pela Soberania Digital Já!',
  description: 'Programação completa do 2º Encontro Nacional pela Soberania Digital Já! Brasília, 18 e 19 de Maio de 2026.',
  robots: { index: true, follow: true },
};
---

<Layout metadata={metadata}>
  <!-- Hero → Task 2 -->
  <!-- Frases de impacto → Task 3 -->
  <!-- Três pilares → Task 4 -->
  <!-- Programação → Task 5 -->
  <!-- Atividades especiais → Task 6 -->
  <!-- Footer mobilização → Task 7 -->
</Layout>
```

**Step 2: Verificar que a página carrega**

Run: `npm run dev`
Acesse: `http://localhost:4321/encontro-2026/programa`
Expected: Página em branco carrega sem erros.

**Step 3: Commit**

```bash
git add src/pages/encontro-2026/programa.astro
git commit -m "feat: estrutura base da página do programa"
```

---

### Task 2: Hero com identidade visual

**Objective:** Reproduzir o hero do PDF com logo, tagline, data e CTA.

**Files:**
- Modify: `src/pages/encontro-2026/programa.astro`

**Step 1: Adicionar seção Hero**

Inserir dentro do `<Layout>`:

```astro
  <!-- Hero — Identidade Visual -->
  <section class="relative bg-[#010101] py-10 md:py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Banner desktop -->
      <div class="hidden md:block mb-6">
        <img
          src="/encontro-2026-banner.png"
          alt="2º Encontro Nacional pela Soberania Digital Já!"
          class="w-full shadow-2xl"
          loading="eager"
        />
      </div>
      <!-- Mobile: texto empilhado -->
      <div class="md:hidden text-center mb-6">
        <h1 class="text-[#FFD400] text-4xl font-black uppercase leading-tight">
          2º Encontro Nacional pela Soberania Digital Já!
        </h1>
        <p class="text-[#E31B23] font-bold uppercase mt-2 text-lg">
          Sem ela, não há soberania nacional
        </p>
      </div>

      <!-- Data e local -->
      <div class="text-center md:text-left">
        <p class="text-[#FFD400] text-xl md:text-2xl font-black uppercase">
          18 e 19 de Maio • Brasília-DF
        </p>
        <p class="text-white text-base md:text-lg mt-1">
          Sindicato dos Bancários • Brasília-DF
        </p>
      </div>

      <!-- CTA -->
      <div class="mt-8 text-center">
        <a
          href="/encontro"
          class="inline-block bg-[#E31B23] hover:bg-[#b01015] text-white font-bold py-4 px-10 text-lg uppercase border-l-4 border-[#FFD400] transition-colors shadow-lg"
        >
          Inscreva-se e saiba mais
        </a>
      </div>
    </div>
  </section>
```

**Step 2: Verificar visual**

Run: `npm run dev`
Acesse a página.
Expected: Hero preto com texto amarelo/vermelho/branco, botão vermelho com borda amarela.

**Step 3: Commit**

```bash
git commit -am "feat: hero da página do programa"
```

---

### Task 3: Frases de impacto

**Objective:** Criar seção com as frases conceituais do PDF.

**Files:**
- Modify: `src/pages/encontro-2026/programa.astro`

**Step 1: Adicionar seção de frases**

```astro
  <!-- Frases de Impacto -->
  <section class="relative bg-[#010101] py-12 md:py-20 border-t border-gray-800">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
      <div class="text-center">
        <h2 class="text-white text-2xl md:text-4xl font-black uppercase leading-tight">
          Quem controla a tecnologia <span class="text-[#E31B23]">controla o país.</span>
        </h2>
      </div>
      <div class="text-center">
        <h2 class="text-white text-2xl md:text-4xl font-black uppercase leading-tight">
          Não é tecnologia. <span class="text-[#FFD400]">É poder.</span>
        </h2>
      </div>
      <div class="text-center border-t border-gray-800 pt-10">
        <p class="text-[#E7E7D8] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Um espaço de articulação nacional onde movimentos, sindicatos, pesquisadores e ativistas constroem juntos a resposta à dependência tecnológica do Brasil.
        </p>
      </div>
    </div>
  </section>
```

**Step 2: Verificar**

Run: `npm run dev`
Expected: Frases em branco com destaques vermelho/amarelo.

**Step 3: Commit**

```bash
git commit -am "feat: frases de impacto"
```

---

### Task 4: Três Pilares

**Objective:** Criar grid com os três pilares conceituais do PDF.

**Files:**
- Modify: `src/pages/encontro-2026/programa.astro`

**Step 1: Adicionar seção dos pilares**

```astro
  <!-- Três Pilares -->
  <section class="relative bg-white py-12 md:py-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="grid md:grid-cols-3 gap-6 md:gap-8">
        <!-- Economia -->
        <div class="bg-[#010101] p-6 md:p-8">
          <h3 class="text-[#E31B23] text-lg font-black uppercase mb-4">Economia</h3>
          <p class="text-[#E7E7D8] text-sm leading-relaxed">
            Dependência de plataformas e infraestruturas estrangeiras que controlam os fluxos do país.
          </p>
        </div>
        <!-- Democracia -->
        <div class="bg-[#010101] p-6 md:p-8">
          <h3 class="text-[#FFD400] text-lg font-black uppercase mb-4">Democracia</h3>
          <p class="text-[#E7E7D8] text-sm leading-relaxed">
            Algoritmos moldam o debate público, a informação e o processo eleitoral.
          </p>
        </div>
        <!-- Organização Social -->
        <div class="bg-[#010101] p-6 md:p-8">
          <h3 class="text-[#E31B23] text-lg font-black uppercase mb-4">Organização Social</h3>
          <p class="text-[#E7E7D8] text-sm leading-relaxed">
            Movimentos dependem de ferramentas que podem ser desligadas a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  </section>
```

**Step 2: Verificar**

Run: `npm run dev`
Expected: Três cards pretos com títulos coloridos e texto creme.

**Step 3: Commit**

```bash
git commit -am "feat: tres pilares conceituais"
```

---

### Task 5: Programação em Duas Colunas

**Objective:** Criar o programa completo dos dois dias, idêntico ao PDF.

**Files:**
- Modify: `src/pages/encontro-2026/programa.astro`

**Step 1: Adicionar dados do programa no frontmatter**

No frontmatter, após `const metadata = {...}`:

```astro
interface ProgramItem {
  time: string;
  title: string;
  description?: string;
  highlight?: boolean;
  type?: 'talk' | 'break' | 'meal' | 'special';
}

const day1Morning: ProgramItem[] = [
  { time: '08h', title: 'Credenciamento e café', type: 'break' },
  { time: '09h', title: 'Abertura do encontro', type: 'special' },
  { time: '09h30', title: 'Cenário da soberania digital no Brasil', description: 'Diagnóstico político, econômico e social', type: 'talk' },
  { time: '11h', title: 'Movimentos sociais e soberania digital', description: 'A construção popular da soberania', type: 'talk' },
];

const day1Afternoon: ProgramItem[] = [
  { time: '14h', title: 'Soberania digital desde o Sul', description: 'Desenvolvimento, autonomia e geopolítica', type: 'talk' },
  { time: '15h30', title: 'Regulação da internet e soberania', description: 'Plataformas, algoritmos e poder', type: 'talk' },
  { time: '16h30', title: 'Infraestrutura soberana', description: 'Datacenters, chips e nuvem', type: 'talk' },
  { time: '16h50', title: 'Intervalo + atividade cultural', type: 'break' },
  { time: '17h50', title: 'Propostas para o Brasil', description: 'Caminhos concretos para a soberania digital', type: 'talk', highlight: true },
];

const day1Night: ProgramItem[] = [
  { time: '19h', title: 'Articulação Institucional, Debates e encaminhamentos', type: 'special' },
  { time: '20h15', title: 'Ato Político Central', description: 'Entrega de propostas para soberania digital do Brasil', type: 'special' },
  { time: '20h30', title: 'Encontro com o Presidente Lula', description: '(Aguardando confirmar)', type: 'special' },
];

const day2Morning: ProgramItem[] = [
  { time: '09h', title: 'Software livre e soberania digital', description: 'Fundamentos e alternativas', type: 'talk' },
  { time: '10h30', title: 'Universidades e soberania digital', description: 'Pesquisa, formação e autonomia', type: 'talk' },
];

const day2Afternoon: ProgramItem[] = [
  { time: '13h30', title: 'Soluções da Sociedade Civil', description: 'Tecnologias livres e organização coletiva', type: 'talk' },
  { time: '14h45', title: 'Redes, movimentos e infraestruturas populares', description: 'Experiências concretas', type: 'talk' },
  { time: '16h20', title: 'Lançamento do Livro Teia Popular', description: 'Soberania Digital Para Vencer Essa Guerra — Autor: Henrique Pereira', type: 'special', highlight: true },
  { time: '17h30', title: 'Soberania digital e a articulação sindical', type: 'talk' },
];
```

**Step 2: Adicionar markup da programação**

```astro
  <!-- Programação -->
  <section id="programacao" class="relative py-12 md:py-20 bg-[#F2F2F2]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#010101] text-center mb-12">
        Programação
      </h2>

      <div class="grid md:grid-cols-2 gap-8 md:gap-12">
        <!-- Dia 1 -->
        <div>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-3 h-3 bg-[#E31B23]"></div>
            <h3 class="text-2xl font-black uppercase text-[#010101]">Dia 1 • 18 de Maio</h3>
          </div>

          <div class="text-xs font-black uppercase tracking-wider text-[#E31B23] mb-3">Manhã</div>
          <div class="space-y-1">
            {day1Morning.map((item) => (
              <div class:list={[
                'p-3 border-l-4',
                item.type === 'break' ? 'border-gray-300 bg-white' :
                item.type === 'special' ? 'border-[#FFD400] bg-[#FFD400]/10' :
                'border-[#E31B23]'
              ]}>
                <div class="flex items-start gap-3">
                  <span class="text-xs font-bold px-2 py-0.5 bg-[#FFD400] text-black shrink-0">{item.time}</span>
                  <div>
                    <div class="font-bold text-[#010101] text-sm">{item.title}</div>
                    {item.description && <div class="text-xs text-gray-600 mt-0.5">{item.description}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div class="text-xs font-black uppercase tracking-wider text-[#E31B23] mb-3 mt-6">Tarde</div>
          <div class="space-y-1">
            {day1Afternoon.map((item) => (
              <div class:list={[
                'p-3 border-l-4',
                item.type === 'break' ? 'border-gray-300 bg-white' :
                item.type === 'special' ? 'border-[#FFD400] bg-[#FFD400]/10' :
                item.highlight ? 'border-[#E31B23] bg-[#E31B23]/5' :
                'border-[#E31B23]'
              ]}>
                <div class="flex items-start gap-3">
                  <span class:list={[
                    'text-xs font-bold px-2 py-0.5 shrink-0',
                    item.type === 'break' ? 'bg-gray-200 text-gray-700' :
                    item.type === 'special' ? 'bg-[#FFD400] text-black' :
                    'bg-[#E31B23] text-white'
                  ]}>{item.time}</span>
                  <div>
                    <div class:list={['font-bold text-sm', item.highlight ? 'text-[#E31B23]' : 'text-[#010101]']}>
                      {item.title}
                    </div>
                    {item.description && <div class="text-xs text-gray-600 mt-0.5">{item.description}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div class="text-xs font-black uppercase tracking-wider text-[#E31B23] mb-3 mt-6">Noite</div>
          <div class="space-y-1">
            {day1Night.map((item) => (
              <div class="p-3 border-l-4 border-[#FFD400] bg-[#FFD400]/10">
                <div class="flex items-start gap-3">
                  <span class="text-xs font-bold px-2 py-0.5 bg-[#FFD400] text-black shrink-0">{item.time}</span>
                  <div>
                    <div class="font-bold text-[#010101] text-sm">{item.title}</div>
                    {item.description && <div class="text-xs text-gray-600 mt-0.5">{item.description}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <!-- Dia 2 -->
        <div>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-3 h-3 bg-[#010101]"></div>
            <h3 class="text-2xl font-black uppercase text-[#010101]">Dia 2 • 19 de Maio</h3>
          </div>

          <div class="text-xs font-black uppercase tracking-wider text-[#010101] mb-3">Manhã</div>
          <div class="space-y-1">
            {day2Morning.map((item) => (
              <div class="p-3 border-l-4 border-[#010101]">
                <div class="flex items-start gap-3">
                  <span class="text-xs font-bold px-2 py-0.5 bg-[#010101] text-white shrink-0">{item.time}</span>
                  <div>
                    <div class="font-bold text-[#010101] text-sm">{item.title}</div>
                    {item.description && <div class="text-xs text-gray-600 mt-0.5">{item.description}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div class="text-xs font-black uppercase tracking-wider text-[#010101] mb-3 mt-6">Tarde</div>
          <div class="space-y-1">
            {day2Afternoon.map((item) => (
              <div class:list={[
                'p-3 border-l-4',
                item.type === 'special' ? 'border-[#FFD400] bg-[#FFD400]/10' :
                item.highlight ? 'border-[#E31B23] bg-[#E31B23]/5' :
                'border-[#010101]'
              ]}>
                <div class="flex items-start gap-3">
                  <span class:list={[
                    'text-xs font-bold px-2 py-0.5 shrink-0',
                    item.type === 'special' ? 'bg-[#FFD400] text-black' :
                    'bg-[#010101] text-white'
                  ]}>{item.time}</span>
                  <div>
                    <div class:list={['font-bold text-sm', item.highlight ? 'text-[#E31B23]' : 'text-[#010101]']}>
                      {item.title}
                    </div>
                    {item.description && <div class="text-xs text-gray-600 mt-0.5">{item.description}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
```

**Step 3: Verificar**

Run: `npm run dev`
Expected: Duas colunas com programação completa, horários em badges, divisórias manhã/tarde/noite.

**Step 4: Commit**

```bash
git commit -am "feat: programacao completa em duas colunas"
```

---

### Task 6: Atividades Especiais

**Objective:** Criar seção com as atividades especiais do PDF.

**Files:**
- Modify: `src/pages/encontro-2026/programa.astro`

**Step 1: Adicionar seção**

```astro
  <!-- Atividades Especiais -->
  <section class="relative py-12 md:py-16 bg-[#010101]">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <h2 class="text-[#FFD400] text-lg font-black uppercase tracking-wider text-center mb-8">
        Eventos ao longo do encontro
      </h2>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="border-l-4 border-[#E31B23] pl-4 py-3">
          <h3 class="text-white font-black uppercase text-sm">Ato Político Central</h3>
          <p class="text-[#E7E7D8] text-xs mt-1">Entrega de propostas para soberania digital do Brasil</p>
        </div>
        <div class="border-l-4 border-[#FFD400] pl-4 py-3">
          <h3 class="text-white font-black uppercase text-sm">Lançamento de Livro</h3>
          <p class="text-[#E7E7D8] text-xs mt-1">Teia Popular — Soberania Digital Para Vencer Essa Guerra</p>
        </div>
        <div class="border-l-4 border-[#E31B23] pl-4 py-3">
          <h3 class="text-white font-black uppercase text-sm">Documentário e Produções</h3>
          <p class="text-[#E7E7D8] text-xs mt-1">Exibição de documentários e produções audiovisuais</p>
        </div>
        <div class="border-l-4 border-[#FFD400] pl-4 py-3">
          <h3 class="text-white font-black uppercase text-sm">Atividades Culturais</h3>
          <p class="text-[#E7E7D8] text-xs mt-1">Rodas de conversa e espaço permanente de tecnologias livres</p>
        </div>
        <div class="border-l-4 border-[#E31B23] pl-4 py-3 md:col-span-2">
          <h3 class="text-white font-black uppercase text-sm">Experiências Interativas</h3>
          <p class="text-[#E7E7D8] text-xs mt-1">Redes sociais livres — Alternativas às big techs</p>
        </div>
      </div>
    </div>
  </section>
```

**Step 2: Commit**

```bash
git commit -am "feat: atividades especiais"
```

---

### Task 7: Footer de Mobilização

**Objective:** Criar footer com canais, realização e apoio.

**Files:**
- Modify: `src/pages/encontro-2026/programa.astro`

**Step 1: Adicionar seção**

```astro
  <!-- Footer — Mobilização -->
  <section class="relative py-12 md:py-20 bg-[#010101] border-t border-gray-800">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <h2 class="text-white text-2xl md:text-4xl font-black uppercase leading-tight mb-6">
        Construir Soberania digital é construir um Brasil <span class="text-[#FFD400]">livre, democrático e justo.</span>
      </h2>

      <div class="flex justify-center gap-6 mb-8">
        <a href="https://whatsapp.com" class="text-white hover:text-[#FFD400] transition-colors">
          <span class="sr-only">WhatsApp</span>
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
        <a href="https://instagram.com/soberania.digital" class="text-white hover:text-[#FFD400] transition-colors">
          <span class="sr-only">Instagram</span>
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="https://t.me/soberaniadigital" class="text-white hover:text-[#FFD400] transition-colors">
          <span class="sr-only">Telegram</span>
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </a>
      </div>

      <div class="mb-6">
        <a href="https://soberania.digital" class="text-[#FFD400] hover:text-white text-lg font-bold uppercase transition-colors">
          soberania.digital
        </a>
      </div>

      <div class="border-t border-gray-800 pt-6">
        <div class="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-400">
          <span>Realização:</span>
          <span class="text-white font-bold">Rede Nacional pela Soberania Digital</span>
          <span class="hidden md:inline">|</span>
          <span class="text-white font-bold">Comitê Gestor da Internet no Brasil</span>
        </div>
      </div>
    </div>
  </section>
```

**Step 2: Verificar build**

Run: `npm run build`
Expected: Build completa sem erros.

**Step 3: Commit final**

```bash
git commit -am "feat: footer mobilizacao e canais"
```

---

### Task 8: Verificação Final e Link na Página Principal

**Objective:** Garantir que a página funciona e adicionar link de navegação.

**Files:**
- Modify: `src/pages/encontro-2026.astro` (adicionar link para programa)

**Step 1: Adicionar link na página principal**

No `encontro-2026.astro`, perto do CTA "Ver programação completa", mudar o `href` para `/encontro-2026/programa`.

**Step 2: Build e teste**

Run: `npm run build`
Expected: Sucesso.

**Step 3: Commit**

```bash
git commit -am "feat: link para pagina do programa"
```

---

## Resumo de Arquivos

| Arquivo | Ação | Conteúdo |
|---------|------|----------|
| `src/pages/encontro-2026/programa.astro` | Criar | Página completa do programa |
| `src/pages/encontro-2026.astro` | Modificar | Link para /encontro-2026/programa |

## Comandos de Verificação

```bash
# Dev server
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Critérios de Aceitação

- [ ] Página `/encontro-2026/programa` carrega sem erros
- [ ] Hero com identidade visual (preto + amarelo + vermelho)
- [ ] Frases de impacto reproduzidas
- [ ] Três pilares em grid
- [ ] Programação dos dois dias em duas colunas
- [ ] Atividades especiais listadas
- [ ] Footer com canais e realização
- [ ] Responsivo (mobile: uma coluna)
- [ ] Build passa sem erros
