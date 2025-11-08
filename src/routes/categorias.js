const { Router } = require('express');
const Ctrl = require('../controllers/CategoriasController');

const r = Router();

r.post('/', Ctrl.criar);
r.get('/', Ctrl.listar);
r.put('/:id', Ctrl.atualizar);
r.delete('/:id', Ctrl.deletar);
r.get('/view/lista', Ctrl.listarView);

module.exports = r;