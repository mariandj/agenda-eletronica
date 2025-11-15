const { Router } = require('express');
const Ctrl = require('../controllers/UsuariosController');
const { exigirLogin } = require('../utils/auth');

const r = Router();
r.post('/', Ctrl.criar);          
r.get('/', exigirLogin, Ctrl.listar); 
r.get('/view/lista', exigirLogin, Ctrl.listarView);   
r.put('/:id', exigirLogin, Ctrl.atualizar);
r.get('/:id', exigirLogin, Ctrl.obterPorId);  
r.delete('/:id', exigirLogin, Ctrl.deletar);   

module.exports = r;