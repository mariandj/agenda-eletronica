const { Router } = require('express');
const Ctrl = require('../controllers/LoginController');

const r = Router();

r.get('/login', Ctrl.formLogin);
r.post('/login', Ctrl.autenticar);
r.get('/logout', Ctrl.logout);

module.exports = r;