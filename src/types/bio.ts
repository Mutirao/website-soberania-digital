export interface BioLink {
  rel: string;
  href: string;
}

export interface Bio {
  nomeCompleto?: string;
  subtitulo?: string;
  bio: string;
  foto?: string;
  links?: BioLink[];
}

export type BiosMap = Record<string, Bio>;
