export interface CallToAction {
  text: string;
  link: string;
}

export interface EventoConf {
  name: string;
  date: string;
  venue: string;
  tagline: string;
  description: string;
  callToAction: CallToAction;
}

export interface EventoAbout {
  text: string;
  quote: string;
}

export interface EventoLocation {
  name: string;
  address: string;
  room?: string;
  mapLink?: string;
}

export interface PartnerOrg {
  nome: string;
  url?: string;
  logo?: string;
  logoType?: 'mono' | 'color' | string;
}

export interface PartnersGrid {
  realizacao: PartnerOrg[];
  patrocinio: PartnerOrg[];
  producao: PartnerOrg[];
  apoio: PartnerOrg[];
}

export interface AssinaturasData {
  total: number;
  atualizadoEm: string;
  fonte?: string;
}
