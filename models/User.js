const mongoose = require('mongoose');
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
  confirm_password: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return value === this.password;
      },
      message: 'As senhas não coincidem'
    }
  },
  // Outros campos opcionais, como nome, sobrenome, data de nascimento, etc.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
