const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/auth', require('./routes/auth'));
app.use('/instalacoes', require('./routes/instalacoes'));
app.use('/certificados', require('./routes/certificados'));
app.use('/producao', require('./routes/producao'));
app.use('/creditos', require('./routes/creditos'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Servidor a correr em http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('Erro ao ligar à base de dados:', err));
