# 🚀 Website Soberania Digital

Site oficial do **2º Encontro Nacional pela Soberania Digital**, realizado em Brasília nos dias 18 e 19 de Maio.

Este projeto utiliza **Astro 6** e **Tailwind CSS 4**, construído sobre uma base altamente customizada do template AstroWind.

## 📌 O que está ativo e renderizado

O site é focado em uma Landing Page única (`src/pages/index.astro`) que contém as seguintes seções:

1.  **Hero:** Banner principal com informações de data, local e chamada para inscrição.
2.  **Provocação:** Seção política sobre a soberania de dados, algoritmos e informação no Brasil.
3.  **Sobre o Encontro:** Detalhamento dos objetivos do evento e citação principal.
4.  **Diferenciais:** Explicação sobre o caráter político e prático do encontro (entrega de propostas à Presidência).
5.  **Programação (Grade Dinâmica):**
    *   **Visão Grade:** Cronograma visual por auditórios.
    *   **Visão Sessões:** Lista detalhada por períodos (Manhã, Tarde, Noite).
    *   **Visão Palestrantes:** Lista de convidados confirmados.
6.  **Contador de Inscritos:** Exibição dinâmica do total de assinaturas (sincronizado via script com o Plantaformas).
7.  **Localização:** Mapa interativo (Leaflet/OSM) com pontos de interesse (Hotéis, Aeroporto, Rodoviária).
8.  **Formulário de Inscrição:** Integração direta com a API do Plantaformas.org para processamento de novos participantes.
9.  **Parceiros e Apoio:** Grade de logotipos de realizadores, patrocinadores e apoiadores.

## ⚙️ Funcionalidades Desativadas

Embora os componentes e a estrutura ainda existam no código, as seguintes funcionalidades do template original estão **desativadas** via `src/config.yaml` ou não são importadas na página principal:

*   **Blog:** Toda a estrutura de posts, categorias e tags está desabilitada (`apps.blog.isEnabled: false`).
*   **RSS Feed:** Desativado junto com o blog.
*   **Páginas Secundárias:** Páginas como `_about.astro`, `_services.astro`, `_pricing.astro` estão renomeadas com prefixo `_` (indicando que não são rotas ativas) ou não são utilizadas na navegação atual.
*   **Analytics:** Google Analytics está configurado como `null`.

## 🛠️ Comandos Principais

| Comando | Ação |
| :--- | :--- |
| `npm install` | Instala as dependências. |
| `npm run build:data` | Sincroniza dados externos (Inscrições, Excel de Programação, Parceiros). |
| `npm run dev` | Inicia o servidor de desenvolvimento em `localhost:4321/encontro`. |
| `npm run build` | Gera o site estático final em `./dist/` (executa `build:data` automaticamente). |
| `npm run fix` | Aplica correções de Lint (ESLint) e Formatação (Prettier). |

## 📝 Gestão de Conteúdo

### 📅 Programação, Sessões e Palestrantes
A gestão de toda a agenda do evento é feita via Excel para facilitar a edição colaborativa:
1.  Edite o arquivo `src/data/programacao.xlsx`.
2.  O arquivo possui três abas principais:
    *   **Programação:** Define o horário (`inicio`/`fim`), `local`, `tipo` (Mesa, Intervalo, Especial), `titulo` e `mesa` (ID de conexão).
    *   **Palestrantes:** Lista os participantes vinculando-os à `mesa` correspondente. Defina o `status` como "Confirmado" para que apareçam no site.
    *   **Stands:** Lista de organizações com stands (uso futuro ou administrativo).
3.  Após salvar o Excel, execute `npm run build:data` para gerar o JSON que alimenta o site.

### 🤝 Parceiros e Realizadores
A gestão de parceiros foi unificada na planilha de programação para facilitar o controle:
1.  Edite o arquivo `src/data/programacao.xlsx` na aba **Parceiros**.
2.  Preencha as colunas:
    *   **Categoria:** Realização, Produção, Patrocínio ou Apoio.
    *   **Nome:** Nome da organização.
    *   **URL:** Link para o site (opcional).
    *   **Logo:** Caminho para a imagem (ex: `/logos/exemplo.png`) ou URL externa.
    *   **LogoType:** `color` ou `mono` (parceiros `mono` são invertidos no modo escuro).
3.  Execute `npm run build:data` para atualizar o site.

Os logotipos locais devem ser colocados na pasta `public/logos/`.

### ℹ️ Informações Gerais
Para alterar textos fixos, data do evento, local ou links de redes sociais, edite o arquivo `src/data/evento.json`.

---

Para detalhes técnicos sobre a arquitetura de dados e integração com o Plantaformas, consulte o arquivo [GEMINI.md](./GEMINI.md).
