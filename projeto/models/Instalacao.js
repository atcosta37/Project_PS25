const mongoose = require('mongoose');

const InstalacaoSchema = new mongoose.Schema({
  clienteId: {
    type: String,
    required: true
  },
  localizacao: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    morada: { type: String, required: true }
  },
  capacidadeKw: {
    type: Number,
    required: true
  },
  tipoPainel: {
    type: String,
    required: true,
    enum: ['Monocristalino', 'Policristalino', 'Outro']
  },
  orientacao: {
    type: String,
    required: true
  },
  inclinacao: {
    type: Number,
    required: true
  },
  dataInstalacao: {
    type: Date,
    required: true
  },
  certificado: { 
    type:String
  },
  producaoTotal: { type: Number, default: 0 }
  
});

module.exports = mongoose.model('Instalacao', InstalacaoSchema);
