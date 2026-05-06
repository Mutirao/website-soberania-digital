# Design Spec — Página do Programa do 2º Encontro

## Objetivo
Criar uma página web (`/encontro-2026/programa` ou `/programa-encontro`) que reproduza fielmente o conteúdo e o layout visual do PDF *PROGRAMA - 2º ENCONTRO.pdf*, mantendo a identidade visual da Rede pela Soberania Digital.

## Referências
- PDF: `PROGRAMA - 2º ENCONTRO.pdf`
- Design System: `DESIGN-encontro.md`
- Página existente: `src/pages/encontro-2026.astro`

## Estrutura da Página

### 1. Hero — Identidade Visual
- **Fundo**: `#010101` (preto)
- **Conteúdo**: Logo do 2º Encontro (imagem `/encontro-2026-banner.png` ou similar)
- **Tagline**: "SEM ELA, NÃO HÁ SOBERANIA NACIONAL" em vermelho `#E31B23`, sublinhado
- **Data/Local**: "18 E 19 DE MAIO — SINDICATO DOS BANCÁRIOS — BRASÍLIA-DF" em amarelo `#FFD400`
- **CTA**: Botão vermelho "INSCREVA-SE E SAIBA MAIS" com borda amarela

### 2. Blocos Conceituais (Frases de Impacto)
Três blocos em fundo preto com texto em branco/vermelho/amarelo:
- **"QUEM CONTROLA A TECNOLOGIA CONTROLA O PAÍS."**
- **"NÃO É TECNOLOGIA. É PODER."**
- **"CHEGOU A HORA DE DECIDIR QUEM CONTROLA O FUTURO DO BRASIL."**

### 3. Três Pilares
Cards ou seções com ícones/títulos:
- **ECONOMIA**: Dependência de plataformas e infraestruturas estrangeiras...
- **DEMOCRACIA**: Algoritmos moldam o debate público...
- **ORGANIZAÇÃO SOCIAL**: Movimentos dependem de ferramentas que podem ser desligadas...

### 4. Programação em Duas Colunas
Layout side-by-side (desktop), empilhado (mobile):

**Coluna 1 — DIA 1 • 18 DE MAIO**
- MANHÃ: 8h Credenciamento, 9h Abertura, 9h30 Cenário, 11h Movimentos sociais
- TARDE: 14h Soberania desde o Sul, 15h30 Regulação, 16h30 Infraestrutura, 17h50 Propostas
- NOITE: 20h15 Ato Político / 20h30 Encontro com o Presidente Lula (a confirmar)

**Coluna 2 — DIA 2 • 19 DE MAIO**
- MANHÃ: 9h Software livre, 10h30 Universidades
- TARDE: 13h30 Datacenters, 14h45 Soluções dos movimentos, 16h20 Lançamento do Livro, 17h30 Articulação sindical

**Estilo dos itens**:
- Horário em badge amarelo `#FFD400` ou vermelho `#E31B23`
- Título em negrito, branco ou preto conforme fundo
- Descrição menor, corpo do texto
- Divider "Intervalo" entre manhã/tarde/noite

### 5. Atividades Especiais (rodapé)
Lista de elementos destacados no PDF:
- ATO POLÍTICO CENTRAL
- ENTREGA DE PROPOSTAS PARA SOBERANIA DIGITAL DO BRASIL
- LANÇAMENTO DE LIVRO: *Teia Popular — Soberania Digital Para Vencer Essa Guerra*
- DOCUMENTÁRIO E PRODUÇÕES
- ATIVIDADES CULTURAIS
- EXPERIÊNCIAS INTERATIVAS

### 6. Footer de Mobilização
- **Texto**: "Construir Soberania digital é construir um Brasil livre, democrático e justo."
- **Canais**: WhatsApp, Instagram, Telegram, soberania.digital
- **Realização**: Rede Nacional pela Soberania Digital + Comitê Gestor da Internet no Brasil
- **Apoio**: logos

## Paleta de Cores
| Token | Valor | Uso |
|-------|-------|-----|
| Preto | `#010101` | Fundos escuros |
| Vermelho | `#E31B23` | CTAs, destaques, labels |
| Amarelo | `#FFD400` | Datas, horários, títulos em dark |
| Branco | `#FFFFFF` | Texto em fundos escuros |
| Creme | `#E7E7D8` | Corpo de texto secundário |

## Tipografia
- **Headings**: Helvetica/Arial, peso 900, uppercase
- **Corpo**: Overpass (Google Fonts), peso 400
- **Labels**: Vermelho/amarelo, uppercase, peso 900

## Componentes a Reutilizar
- `Layout` do Astro (PageLayout)
- Seção Hero existente em `encontro-2026.astro`
- Classes Tailwind já definidas no projeto

## Assets Necessários
- Logo/banner do encontro (já existente em `/public/`)
- Ícones de canais sociais (WhatsApp, Instagram, Telegram)

## Responsividade
- Desktop: duas colunas para programação
- Tablet: duas colunas com fontes menores
- Mobile: uma coluna empilhada

## Roteiro de Implementação
1. Criar arquivo `src/pages/encontro-2026/programa.astro`
2. Estruturar Hero com banner + tagline
3. Criar seção de frases de impacto
4. Criar grid dos três pilares
5. Criar programação em duas colunas com todos os itens
6. Criar seção de atividades especiais
7. Criar footer com canais e realização
8. Testar responsividade
9. Build e verificar
