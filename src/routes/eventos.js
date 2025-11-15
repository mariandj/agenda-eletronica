const { Router } = require('express');
const Ctrl = require('../controllers/EventosController');
const Evento = require('../models/Evento');
const Usuario = require('../models/Usuario');
const { exigirLogin } = require('../utils/auth');

const r = Router();

r.post('/', exigirLogin, Ctrl.criar);
r.get('/', exigirLogin, Ctrl.listar);
r.put('/:id', exigirLogin, Ctrl.atualizar);
r.delete('/:id', exigirLogin, Ctrl.deletar);

r.get('/view/lista', exigirLogin, Ctrl.listarView);

r.get('/view/filtro', exigirLogin, async (req, res) => {
  try {
    const { titulo } = req.query;
    if (!titulo) return res.status(400).send('titulo é obrigatório');

    const eventos = await Evento.listarPorTitulo(titulo);

    res.cookie('ultimoTitulo', titulo, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'Lax'
    });

    res.render('eventosFiltro', {
      eventos,
      filtroTitulo: titulo
    });
  } catch (e) {
    res.status(500).send('Erro ao filtrar eventos');
  }
});

module.exports = r;