import express, { json } from 'express';
import cors from 'cors';
import { createConnection } from 'mysql2';

const app = express();
app.use(cors());
app.use(json());

// Conexão com o banco MySQL da rede IoT
const db = createConnection({
  host: '10.108.34.95',
  user: 'root', 
  password: 'root', 
  database: 'db_prod',
  port: 3306
});

// Endpoint para listar peças - AGORA COM PAGINAÇÃO
app.get('/pieces', (req, res) => {
  // Define um limite padrão de itens por página, pode ser ajustado
  const limit = parseInt(req.query.limit) || 50; 
  // Pega o número da página da URL, começando em 1
  const page = parseInt(req.query.page) || 1; 
  // Calcula o offset (ponto de partida) para a query SQL
  const offset = (page - 1) * limit;

  // Query 1: Pega o número total de itens para calcular o total de páginas
  const countQuery = 'SELECT COUNT(*) as count FROM tb_prod';

  db.query(countQuery, (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const totalItems = countResult[0].count;
    const totalPages = Math.ceil(totalItems / limit);

    // Query 2: Pega os itens da página atual
    const dataQuery = 'SELECT * FROM tb_prod ORDER BY data_hora DESC LIMIT ? OFFSET ?';

    db.query(dataQuery, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Funções de mapeamento (as mesmas que você já tem)
      const mapColor = (code) => ({ 1: 'Preto', 2: 'Branco', 3: 'Azul' }[code] || 'Desconhecida');
      const mapMaterial = (code) => ({ 1: 'Metálico', 2: 'Plástico' }[code] || 'Desconhecido');
      const mapSize = (code) => ({ 1: 'Pequeno', 2: 'Médio', 3: 'Grande' }[code] || 'Desconhecido');

      const formattedPieces = results.map(piece => ({
        id: piece.id_prod,
        timestamp: new Date(piece.data_hora).toISOString(),
        color: mapColor(piece.cor),
        material: mapMaterial(piece.material),
        size: mapSize(piece.tamanho)
      }));

      // Envia uma resposta com os dados da página e as informações de paginação
      res.json({
        data: formattedPieces,
        totalPages: totalPages,
        currentPage: page
      });
    });
  });
});
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});