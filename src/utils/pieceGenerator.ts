
import { Piece } from '../types';

const colors = ['Vermelho', 'Verde', 'Amarelo', 'Azul'];
const sizes = ['Pequeno', 'Médio', 'Grande'];
const materials = ['Metal', 'Plástico'];

const colorMap: { [key: string]: string } = {
  'Azul': '#3B82F6',
  'Vermelho': '#EF4444',
  'Verde': '#10B981',
  'Amarelo': '#F59E0B'
};

export const generateRandomPiece = (): Piece => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    color: colors[Math.floor(Math.random() * colors.length)],
    size: sizes[Math.floor(Math.random() * sizes.length)],
    material: materials[Math.floor(Math.random() * materials.length)],
    timestamp: new Date()
  };
};

export const getColorForValue = (value: string, filterType: string): string => {
  if (filterType === 'Cor') {
    return colorMap[value] || '#6B7280';
  }
  
  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'];
  const hash = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};
