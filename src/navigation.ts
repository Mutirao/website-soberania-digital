import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Carta',
      href: getPermalink('/carta'),
    },
    {
      text: 'Manifesto',
      href: getPermalink('/manifesto'),
    },
    {
      text: 'Encontros',
      links: [
        {
          text: '2º Encontro Soberania Já',
          href: getPermalink('/encontro'),
        },
        {
          text: '1º Encontro Soberania Já',
          href: getPermalink('/primeiro-encontro'),
        },
      ],
    }
  ],
  actions: [
    {
      text: 'Inscreva-se',
      href: getPermalink('/encontro'),
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Sobre',
      links: [
        { text: 'Início', href: getPermalink('/') },
        { text: 'Carta ao Presidente Lula', href: getPermalink('/carta') },
        { text: '2º Encontro', href: getPermalink('/encontro') },
        { text: '1º Encontro', href: getPermalink('/primeiro-encontro') },
        { text: 'Manifesto', href: getPermalink('/manifesto') },
      ],
    },
    {
      title: 'Plantaformas',
      links: [
        { text: 'Conferência', href: 'https://plantaformas.org/conferences/SoberaniaDigital' },
        { text: 'Inscrições 2º Encontro', href: 'https://plantaformas.org/conferences/SoberaniaDigital/f/529/' },
        { text: 'Reuniões da Rede', href: 'https://plantaformas.org/assemblies/soberaniadigital/f/29/meetings' },
        { text: 'Pad Colaborativo', href: 'https://pad.riseup.net/p/SoberaniaDigital' },
      ],
    },
    {
      title: 'Participe',
      links: [
        { text: 'Telegram', href: 'https://t.me/SoberaniaDigitalBR' },
        { text: 'Matrix', href: 'https://matrix.to/#/%23soberaniadigital:matrix.org' },
        { text: 'Mastodon', href: 'https://organica.social/@soberania' },
        { text: 'PeerTube', href: 'https://videos.organica.social/a/soberania/' },
      ],
    },
    // {
    //   title: 'Na Mídia',
    //   links: [
    //     { text: 'NeoFEED', href: 'https://neofeed.com.br/experts/e-preciso-falar-sobre-soberania-digital/' },
    //     { text: 'Época Negócios', href: 'https://epocanegocios.globo.com/colunas/iagora/coluna/2023/10/democracia-e-soberania-digital.ghtml' },
    //     { text: 'Outras Palavras', href: 'https://outraspalavras.net/tecnologiaemdisputa/nao-havera-soberania-digital-sem-o-estado/' },
    //   ],
    // },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Mastodon', icon: 'tabler:brand-mastodon', href: 'https://organica.social/@soberania' },
    { ariaLabel: 'Telegram', icon: 'tabler:brand-telegram', href: 'https://t.me/SoberaniaDigitalBR' },
  ],
  footNote: `
    Rede pela Soberania Digital · Código aberto
  `,
};
