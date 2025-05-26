const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const token = req.cookies?.session_token;
  if (!token) return res.status(401).json({ error: 'Não autorizado' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Sessão inválida ou expirada' });
  }
}

function apenasClientes(req, res, next) {
  const papel = req.user.papel;
  if (req.user?.papel !== 'cliente') return res.status(403).json({ error: 'Apenas clientes têm acesso', papel: papel });
  next();
}

function apenasTecnicos(req, res, next) {
  if (req.user?.papel !== 'tecnico') return res.status(403).json({ error: 'Apenas técnicos têm acesso' });
  next();
}

function apenasGestores(req, res, next) {
  if (req.user?.papel !== 'gestor') return res.status(403).json({ error: 'Apenas Gestores de operações têm acesso' });
  next();
}
module.exports = { autenticar, apenasClientes, apenasTecnicos, apenasGestores };
