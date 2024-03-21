const Produto = require('../models/produto');

// Controlador para listar todos os produtos
exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Controlador para adicionar um novo produto
exports.adicionarProduto = async (req, res) => {
  try {
    const { nome, preco } = req.body;
    const produto = new Produto({ nome, preco });
    await produto.save();
    res.json(produto);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Controlador para atualizar um produto existente
exports.atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body;
    const produto = await Produto.findByIdAndUpdate(id, { nome, preco }, { new: true });
    res.json(produto);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Controlador para deletar um produto
exports.deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    await Produto.findByIdAndDelete(id);
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
