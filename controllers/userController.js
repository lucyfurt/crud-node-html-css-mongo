const User = require('../models/User');

// Controlador para login de usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Dados recebidos:', { email, password });
    // Verifica se o email e a senha foram fornecidos no corpo da requisição
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Procura o usuário pelo email no banco de dados
    const user = await User.findOne({ email });
    // Se o usuário não foi encontrado, retorna um erro
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Se as credenciais estiverem corretas, gera um token de autenticação (JWT) e retorna para o cliente
    const token = user.generateAuthToken();
    res.json({ token });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err); // Log do erro
    res.status(500).send('Erro ao processar o registro do usuário');
  }
};

// Controlador para registrar um novo usuário
exports.registrarUsuario = async (req, res) => {
  try {
    const { email, password, confirm_password } = req.body;
    console.log('Dados recebidos:', { email, password, confirm_password });
    // Verifica se a senha e a confirmação de senha são iguais
    if (password !== confirm_password) {
      return res.status(400).json({ error: 'As senhas não coincidem' });
    }

    // Cria um novo usuário com os dados fornecidos
    const user = new User({ email, password, confirm_password });

    // Salva o usuário no banco de dados
    await user.save();

    res.json(user); // Retorna o usuário criado
    console.log(this.registrarUsuario);
    
  } catch (err) {
    console.error('Erro ao registrar usuário:', err); // Log do erro
    res.status(500).send('Erro ao processar o registro do usuário');
  }
};
