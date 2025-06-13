
import { Piece } from '../types';

interface PieceCardProps {
  piece: Piece;
}

const PieceCard = ({ piece }: PieceCardProps) => {
const formatTimestamp = (timestamp?: string | Date) => {
  if (!timestamp) return 'Data inválida';

  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

  return isNaN(date.getTime())
    ? 'Data inválida'
    : date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="text-sm">
              <span className="font-medium">Cor:</span> {piece.color}
            </div>
            <div className="text-sm">
              <span className="font-medium">Tamanho:</span> {piece.size}
            </div>
            <div className="text-sm">
              <span className="font-medium">Material:</span> {piece.material}
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500 pt-1 border-t border-gray-100">
          {formatTimestamp(piece.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default PieceCard;
