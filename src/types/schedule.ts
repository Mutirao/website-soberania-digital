export interface Palestrante {
  nome: string;
  org?: string;
  role?: string;
}

export interface Sessao {
  titulo: string;
  tipo: string;
  dia: string;
  inicio: string;
  fim?: string;
  local: string;
  descricao?: string;
  palestrantes?: Palestrante[];
}

export interface ProcessedSession extends Sessao {
  _startMin: number | null;
  _endMin: number | null;
  _startRow: number;
  _endRow: number;
}

export interface TimeAxisItem {
  row: number;
  label: string;
  isHour: boolean;
}

export interface PalestranteResumo {
  nome: string;
  org: string;
  sessoes: string[];
}

export interface DiaData {
  key: string;
  diaVal: string;
  label: string;
  color: string;
  endMin: number;
  locaisPresentes: string[];
  processed: ProcessedSession[];
  nSlots: number;
  timeAxis: TimeAxisItem[];
  palList: PalestranteResumo[];
  sessoesList: ProcessedSession[];
}

export interface DiaConfig {
  key: string;
  diaVal: string;
  label: string;
  color: string;
  endMin: number;
}
