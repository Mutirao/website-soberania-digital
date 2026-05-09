# Documentação do Site "Soberania Digital"

## Visão Geral

O site "Soberania Digital" é uma plataforma Astro baseada no template AstroWind, projetada para promover e organizar o movimento pela soberania digital no Brasil. O site serve principalmente como portal para o 2º Encontro Nacional pela Soberania Digital, que ocorrerá em 18 e 19 de maio de 2026 em Brasília.

## Arquitetura e Tecnologia

- **Framework**: Astro 6.x com TypeScript
- **Estilização**: Tailwind CSS 4.x
- **Servidor**: Node.js Express (com adaptações para execução standalone)
- **Deployment**: Docker com suporte para múltiplos ambientes

## Estrutura Principal

### Páginas Principais
- `index.astro` - Página principal do encontro com hero, programação, informações do local e inscrições
- `_manifesto.astro` - Manifesto pela soberania digital nas universidades
- `_carta.astro` - Carta ao Presidente Lula com propostas
- `_primeiro-encontro.astro` - Informações sobre o primeiro encontro realizado
- `_programa.astro` - Programação detalhada do evento
- `_about.astro` - Página padrão do template (não utilizada)

### Componentes Chave

#### Widgets
- `Header.astro` - Cabeçalho com navegação
- `Footer.astro` - Rodapé com informações de contato e parcerias
- `Hero.astro` - Seção hero com branding e CTA
- `Manifesto.astro` - Conteúdo do manifesto
- `MediaCoverage.astro` - Cobertura da mídia

### Dados do Evento

Os dados do evento são organizados em arquivos JSON no diretório `src/data/`:

- `evento.json` - Informações básicas do evento (nome, datas, local, descrição)
- `programacao-gerado.json` - Programação completa com palestrantes, horários e locais
- `assinaturas.json` - Número de inscritos e dados atualizados
- `parceiros.json` - Informações sobre parceiros e organizadores

## Funcionalidades

### Programação Dinâmica
O site apresenta três modos de visualização da programação:
1. **Grade** - Visualização em grade de tempo/auditório
2. **Sessões** - Lista cronológica de sessões
3. **Palestrantes** - Lista de palestrantes com sessões em que participam

### Integração com Plataformas
O site se integra com o sistema Plataformas (https://plantaformas.org) para:
- Obter o número de inscritos
- Atualizar informações sobre parceiros
- Autenticação para acesso a dados administrativos

### Scripts de Atualização
- `scripts/fetch-assinaturas.ts` - Obtém o número de inscritos do formulário de inscrição
- `scripts/fetch-parceiros.ts` - Atualiza informações sobre parceiros
- `scripts/build-programacao.mjs` - Gera o JSON de programação a partir de uma planilha Excel
- `scripts/gerar_programacao_atualizada.mjs` - Scripts de geração de programação

## Design e Estilo

### Paleta de Cores
- **Vermelho primário**: #E31B23 (Botões CTA, labels de categoria)
- **Amarelo/Ouro**: #FFD400 (Títulos e datas em fundo escuro)
- **Preto**: #010101 (Fundos de seção escura)
- **Branco**: #FFFFFF (Texto em fundos escuros)

### Tipografia
- Fonte principal: Overpass (Google Fonts) com fallback para Inter Variable
- Estilo de headings: Negrito ultra-bold (peso 900), maiúsculas

## Configuração e Execução

### Variáveis de Ambiente
- `PLANTAFORMAS_EMAIL` - Email para autenticação no sistema Plataformas
- `PLANTAFORMAS_PASSWORD` - Senha para autenticação
- `PLANTAFORMAS_CONFERENCE_SLUG` - Slug da conferência no Plataformas

### Scripts do Package
- `npm run dev` - Executa o servidor de desenvolvimento
- `npm run build` - Compila o site para produção (inclui busca de dados externos)
- `npm run build:data` - Atualiza dados de inscritos, parceiros e programação

### Estrutura de Pastas
```
src/
├── data/           # Dados do evento (JSON)
├── pages/          # Páginas principais
├── components/     # Componentes reutilizáveis
├── layouts/        # Layouts do site
├── assets/         # Imagens e estilos
└── config.yaml     # Configuração geral do site
```

## Funcionalidades Específicas

### Contador de Inscrições
O site exibe dinamicamente o número de inscrições no encontro atualizado periodicamente com dados provenientes do sistema Plataformas.

### Mapa de Localização
Incorpora um mapa interativo do OpenStreetMap (Leaflet) mostrando o local do evento e pontos de referência próximos ( hotéis, aeroporto, rodoviária).

### Formulário de Inscrição
Integração direta com o formulário do Plataformas, incluindo validação e envio automático para o sistema central.

## Personalização para o Encontro

O site foi adaptado especificamente para o 2º Encontro Nacional pela Soberania Digital com:
- Design escuro predominante seguindo a identidade visual do movimento
- Programação detalhada para os dois dias do evento
- Informações específicas sobre palestrantes confirmados
- Sistema de visualização interativa da agenda
- Chamadas para ação direcionadas à participação no encontro

O site serve como plataforma central para divulgação, inscrições e organização do evento, além de promover os objetivos mais amplos do movimento pela soberania digital no Brasil.