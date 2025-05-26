const express = require('express');
const Instalacao = require('../models/Instalacao');
const User = require('../models/Utilizador'); // Adiciona o modelo User
const { autenticar, apenasTecnicos } = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();

// Configuração do multer para aceitar apenas PDF
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/certificados/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Apenas ficheiros PDF são permitidos!'));
    }
  }
});

// Pesquisa de utilizador por id ou nome
router.get('/pesquisar', autenticar, apenasTecnicos, async (req, res) => {
  const { id, nome } = req.query;
  let query = {};
  if (id) query._id = id;
  if (nome) query.nome = { $regex: nome, $options: 'i' };
  try {
    const users = await User.find(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao pesquisar utilizadores.' });
  }
});


// Upload de certificado PDF para um utilizador
router.post('/upload/:id', autenticar, apenasTecnicos, upload.single('certificado'), async (req, res) => {
  try {
    const instalacao = await Instalacao.findById(req.params.id);
    if (!instalacao) return res.status(404).json({ message: 'Instalação não encontrado.' });

    instalacao.certificado = req.file.path;
    await instalacao.save();

    res.json({ message: 'Certificado carregado com sucesso.', path: req.file.path });
  } catch (err) {
    console.error('Erro upload certificado:', err);
    res.status(500).json({ message: 'Erro ao fazer upload do certificado.' });
  }
});

// Mantém a rota existente para certificar instalações
router.post('/', autenticar, apenasTecnicos, async (req, res) => {
  const { instalacaoId } = req.body;

  const instalacao = await Instalacao.findById(instalacaoId);
  if (!instalacao) return res.status(404).json({ error: 'Instalação não encontrada' });

  instalacao.certificada = true;
  await instalacao.save();

  res.status(201).json({ mensagem: 'Certificado emitido', instalacao });
});



module.exports = router;
