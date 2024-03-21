const express = require('express');
const bodyParser = require('body-parser');
const produtoController = require('./controllers/produtoController');
const path = require('path');

const app = express();
const PORT_BACK = 3000;
const PORT_FRONT = 3003;

// Middleware para permitir requisições de origens diferentes (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir acesso de qualquer origem
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

// Rota para listar produtos
app.get('/produtos', produtoController.listarProdutos);

// Rota para adicionar um produto
app.post('/produtos', produtoController.adicionarProduto);

// Rota para atualizar um produto
app.put('/produtos/:id', produtoController.atualizarProduto);

// Rota para deletar um produto
app.delete('/produtos/:id', produtoController.deletarProduto);

// Iniciar o servidor
app.listen(PORT_BACK, () => {
  console.log(`Servidor rodando em http://localhost:${PORT_BACK}`);
});

// Servidor para o front-end
app.listen(PORT_FRONT, () => {
  console.log(`Servidor do front-end rodando em http://localhost:${PORT_FRONT}`);
});
