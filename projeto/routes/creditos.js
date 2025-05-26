const express = require('express');
const { autenticar, apenasGestores } = require('../middleware/auth');
const Utilizador = require('../models/Utilizador'); 
const router = express.Router();

router.post('/calcular', autenticar, apenasGestores, async (req, res) => {
  const { clienteId} = req.body;

  const cliente =  await Utilizador.findById(clienteId);
  if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
  
  const taxaPorKw = 0.15;
  const kwAcumulados = cliente.producaoTotal || 0; 
  const valorCredito = +(kwAcumulados * taxaPorKw).toFixed(2);

  res.json({ kwAcumulados, valorCreditos: valorCredito });
});

module.exports = router;
