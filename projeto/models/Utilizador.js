const mongoose = require('mongoose');

const utilizadorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  papel: { type: String, enum: ['cliente', 'tecnico', 'gestor'], required: true },
  certificado: { type: String },
  producaoTotal: { type: Number, default: 0 }
});

module.exports = mongoose.model('Utilizador', utilizadorSchema);
