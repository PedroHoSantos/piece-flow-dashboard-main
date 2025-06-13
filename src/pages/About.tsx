
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-gray-200">
        <button 
          onClick={() => navigate('/')}
          className="mr-3 p-1"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold">Sobre</h1>
        <div className="ml-auto text-sm text-gray-500">
          {new Date().toLocaleDateString('pt-BR')}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Desenvolvido por:</h2>
          <div className="space-y-1 text-gray-700">
            <div>Nicolas Torquato Simões Messias</div>
            <div>Pedro Henrique Oliveira Santos</div>
            <div>Rafael Inêas Peretta</div>
            <div>Kayã Morgado de Lima</div>
            <div>Luiz Guilherme Soares Luciano</div>
            <div>Lhaiza Souza</div>
            <div>Letícia Honório</div>
          </div>
        </div>

        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Período:</span> 3º Semestre
          </div>
          
          <div>
            <span className="font-medium">Turma e Curso:</span><br />
            Desenvolvimento de Sistemas<br />
            Faculdade: SENAI "Felix Guisard"
          </div>
          
          <div>
            <span className="font-medium">Período de Desenvolvimento:</span><br />
            1 Mês
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
