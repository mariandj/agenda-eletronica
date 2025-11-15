const fs = require('fs');
const path = require('path');

function logErro(err, contexto = {}) {
  try {
    const dir = path.join(__dirname, '..', 'logs');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const dia = new Date().toISOString().slice(0, 10).replaceAll('-', '');
    const file = path.join(dir, `erros-${dia}.log`);
    const payload = {
      timestamp: new Date().toISOString(),
      message: err?.message,
      stack: err?.stack,
      contexto
    };
    fs.appendFileSync(file, JSON.stringify(payload) + '\n');
  } catch (_) {
  }
}

module.exports = { logErro };