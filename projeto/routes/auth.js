const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Utilizador = require('../models/Utilizador');


router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await Utilizador.findOne({ email, senha });
  console.log("utilizador:", user);

  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = jwt.sign({ id: user.id, papel: user.papel }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('session_token', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 60 * 60 * 1000 }); 
  res.json({ mensagem: 'Autenticado com sucesso'});
});

module.exports = router;
