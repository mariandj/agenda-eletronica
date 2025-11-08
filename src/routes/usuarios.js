const { Router } = require('express');
const Ctrl = require('../controllers/UsuariosController');

const r = Router();
r.post('/', Ctrl.criar);          
r.get('/', Ctrl.listar); 
r.get('/view/lista', Ctrl.listarView);   
r.put('/:id', Ctrl.atualizar);
r.get('/:id', Ctrl.obterPorId);  
r.delete('/:id', Ctrl.deletar);   

module.exports = r;