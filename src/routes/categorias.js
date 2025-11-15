const { Router } = require('express');
const Ctrl = require('../controllers/CategoriasController');
const { exigirLogin } = require('../utils/auth');

const r = Router();

r.post('/', exigirLogin, Ctrl.criar);
r.get('/', exigirLogin, Ctrl.listar);
r.put('/:id', exigirLogin, Ctrl.atualizar);
r.delete('/:id', exigirLogin, Ctrl.deletar);
r.get('/view/lista',exigirLogin, Ctrl.listarView);

module.exports = r;