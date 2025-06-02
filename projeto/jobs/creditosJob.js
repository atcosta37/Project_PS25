const cron = require('node-cron');
const Utilizador = require('../models/Utilizador');
const enviarEmail = require('../utils/email');

cron.schedule('0 0 0 1 *', async () => { 
  const clientes = await Utilizador.find({ papel: 'cliente' });
  const taxaPorKw = 0.15;

  for (const cliente of clientes) {
    const kwAcumulados = cliente.producaoTotal || 0;
    const valorCredito = +(kwAcumulados * taxaPorKw).toFixed(2);

    const texto = `Olá ${cliente.nome},\n\nA sua produção acumulada é ${kwAcumulados} kW.\nCréditos do mês: €${valorCredito}.\n\nObrigado.`;
    await enviarEmail('enola.marquardt88@ethereal.email', 'Relatório Mensal de Créditos de Energia', texto);
  }
 
  console.log('Relatórios mensais enviados!');
});