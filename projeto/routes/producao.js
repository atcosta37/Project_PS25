const express = require('express');
const { autenticar, apenasGestores} = require('../middleware/auth');
const Instalacao = require('../models/Instalacao');
const Utilizador = require('../models/Utilizador');
const router = express.Router();


router.get('/monitorizar', autenticar, apenasGestores, async (req, res) => {
  const {idCliente, idInstalacao}= req.body;

  const kwGerados = +(Math.random() * 10).toFixed(2); 
   const instalacao = await Instalacao.findById(idInstalacao);
  if (!instalacao) return res.status(404).json({ error: 'Instalação não encontrada' });
  instalacao.producaoTotal += kwGerados;
  await instalacao.save();


  const cliente = await Utilizador.findById(idCliente);
  if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
  cliente.producaoTotal += kwGerados;
  await cliente.save();

  res.json({ kwGerados, producaoInstalacao: instalacao.producaoTotal, producaoCliente: cliente.producaoTotal });
});

module.exports = router;
