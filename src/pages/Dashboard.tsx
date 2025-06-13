import { useState, useEffect } from 'react';
import { Settings, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Piece, FilterType, ChartData } from '../types';
import { generateRandomPiece, getColorForValue } from '../utils/pieceGenerator';
import FilterButtons from '../components/FilterButtons';
import PieceCard from '../components/PieceCard';
import axios from 'axios';
import LineChartComponent from '../components/LineChart';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Estados do componente
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('Cor');
  const [chartData, setChartData] = useState<ChartData[]>([]);
  
  // Estados de controle da UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- NOVOS ESTADOS PARA CONTROLE DA PAGINAÇÃO ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // --- EFEITO PRINCIPAL PARA BUSCAR DADOS PAGINADOS ---
  // Este useEffect agora é executado sempre que 'currentPage' muda.
  useEffect(() => {
    const fetchPageOfPieces = async () => {
      setLoading(true); // Ativa o loading ao trocar de página
      setError(null);
      try {
        // Envia a página desejada como um query parameter para a API
        const response = await axios.get(`http://localhost:3000/pieces?page=${currentPage}&limit=50`);
        
        // A API agora retorna um objeto com os dados e informações da página
        const { data, totalPages: newTotalPages } = response.data;

        // Formata o timestamp para um objeto Date, como antes
        const formattedData = data.map((p: any) => ({ ...p, timestamp: new Date(p.timestamp) }));

        setPieces(formattedData);
        setTotalPages(newTotalPages);

      } catch (err) {
        console.error("Falha ao buscar peças:", err);
        setError("Não foi possível carregar os dados do servidor.");
      } finally {
        setLoading(false); // Desativa o loading após a conclusão
      }
    };

    fetchPageOfPieces();
  }, [currentPage]); // O array de dependências garante que a busca ocorra ao mudar de página


  // --- ATUALIZAÇÃO DO GRÁFICO ---
  // Funcionará como antes, mas agora refletirá apenas os dados da página atual.
  useEffect(() => {
    const counts: { [key: string]: number } = {};
    pieces.forEach(piece => {
      let key: string;
      switch (activeFilter) {
        case 'Cor': key = piece.color; break;
        case 'Tamanho': key = piece.size; break;
        case 'Material': key = piece.material; break;
        default: key = piece.color;
      }
      counts[key] = (counts[key] || 0) + 1;
    });
    const data = Object.entries(counts).map(([name, value]) => ({
      name, value, color: getColorForValue(name, activeFilter)
    }));
    setChartData(data);
  }, [pieces, activeFilter]);


  // --- FUNÇÕES DE CONTROLE DA PAGINAÇÃO ---
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <h1 className="text-lg font-semibold">CLP Controller</h1>
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/about')} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Settings size={20} /></button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Mensagem de erro, se houver */}
        {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert"><p>{error}</p></div>}

        {/* Seção do Gráfico de Distribuição */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-center">Distribuição de Partes (Página Atual)</h2>
          {chartData.length > 0 ? <LineChartComponent data={chartData} /> : <div className="h-64 flex items-center justify-center text-gray-500">Sem dados para exibir no gráfico.</div>}
          <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        {/* Seção da Lista de Peças com Controles de Paginação */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Peças Geradas</h3>
            {/* --- COMPONENTES DA UI DE PAGINAÇÃO --- */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={handlePrevPage} 
                disabled={currentPage === 1 || loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <span className="text-sm text-gray-700">
                Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
              </span>
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages || loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próxima
              </button>
            </div>
          </div>
          
          {/* --- RENDERIZAÇÃO CONDICIONAL DA LISTA --- */}
          {loading ? (
            <div className="text-center text-gray-500 py-8">Carregando peças...</div>
          ) : (
            <div className="max-h-96 overflow-y-auto space-y-3">
              {pieces.length > 0 ? (
                pieces.map((piece) => (
                  <PieceCard key={piece.id} piece={piece} />
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Nenhuma peça encontrada.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;