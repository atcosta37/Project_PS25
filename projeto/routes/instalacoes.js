const express = require('express');
const Instalacao = require('../models/Instalacao');
const { autenticar, apenasClientes } = require('../middleware/auth');
const router = express.Router();


router.post('/', autenticar, apenasClientes, async (req, res) => {
  try {
    const user = req.user;
   const novaInstalacao = {
      "clienteId": req.user.id,
      ...req.body,
    };
    const instalacao = new Instalacao(novaInstalacao);
    await instalacao.save();
    res.status(201).json(instalacao);
  } catch (err) {
    res.status(400).json({ error: 'Dados incorretos', user: req.user, detalhes: err.message });
  }
});


router.get('/', autenticar, async (req, res) => {
  const instalacoes = await Instalacao.find();
  res.json(instalacoes);
});

module.exports = router;
