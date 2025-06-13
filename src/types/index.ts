
export interface Piece {
  id: string;
  color: string;
  size: string;
  material: string;
  timestamp: Date;
}

export type FilterType = 'Cor' | 'Tamanho' | 'Material';

export interface ChartData {
  name: string;
  value: number;
  color: string;
}
