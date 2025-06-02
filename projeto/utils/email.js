const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'enola.marquardt88@ethereal.email',
        pass: '21YN7sxZzpPNFyS95X'
    }
});

async function enviarEmail(destinatario, assunto, texto) {
  await transporter.sendMail({
    from: 'enola.marquardt88@ethereal.email',
    to: destinatario,
    subject: assunto,
    text: texto
  });
  console.log()
}

module.exports = enviarEmail;