const express = require('express');
const bodyParser = require('body-parser');
const produtoController = require('./controllers/produtoController');
const userController = require('./controllers/userController'); // Importando o controller de usuário
const path = require('path');
const cors = require('cors');

const app = express();
const PORT_BACK = 3000;
const PORT_FRONT = 3003;
app.use(cors({
  origin: 'http://localhost:3003',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
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

// Rotas de produtos
app.get('/produtos', produtoController.listarProdutos);
app.post('/produtos', produtoController.adicionarProduto);
app.put('/produtos/:id', produtoController.atualizarProduto);
app.delete('/produtos/:id', produtoController.deletarProduto);

// Rotas de usuário
app.post('/login', userController.login); // Rota para o controller de login
app.post('/register', userController.registrarUsuario); // Rota para o controller de registro de usuário

// Iniciar o servidor do back-end
app.listen(PORT_BACK, () => {
  console.log(`Servidor do back-end rodando em http://localhost:${PORT_BACK}`);
});

// Iniciar o servidor do front-end
const frontApp = express();
frontApp.use(express.static(path.join(__dirname, 'public')));
frontApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});
frontApp.listen(PORT_FRONT, () => {
  console.log(`Servidor do front-end rodando em http://localhost:${PORT_FRONT}`);
});
