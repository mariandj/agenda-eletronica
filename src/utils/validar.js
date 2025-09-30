function exigir(campos, obj) {
  const faltando = campos.filter(c => obj[c] === undefined || obj[c] === null || obj[c] === '');
  if (faltando.length) {
    const e = new Error(`Campos obrigatórios ausentes: ${faltando.join(', ')}`);
    e.code = 'VALIDACAO_OBRIGATORIOS';
    throw e;
  }
}

function exigirPeriodoValido(inicio, fim) {
  if (!(inicio instanceof Date) || isNaN(inicio)) throw new Error('Data de início inválida');
  if (!(fim instanceof Date) || isNaN(fim)) throw new Error('Data de fim inválida');
  if (inicio >= fim) throw new Error('Fim deve ser após o início');
}

module.exports = { exigir, exigirPeriodoValido };