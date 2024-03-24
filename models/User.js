const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importe o bcryptjs para hash de senha

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  // Outros campos opcionais, como nome, sobrenome, data de nascimento, etc.
});

// Adicione o método comparePassword ao schema do usuário
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    // Use bcrypt para comparar a senha fornecida com a senha armazenada no banco de dados
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
