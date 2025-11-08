const { Router } = require('express');
const Ctrl = require('../controllers/EventosController');
const Evento = require('../models/Evento');
const Usuario = require('../models/Usuario');

const r = Router();

r.post('/', Ctrl.criar);
r.get('/', Ctrl.listar);
r.get('/view/lista', Ctrl.listarView); 
r.put('/:id', Ctrl.atualizar);
r.delete('/:id', Ctrl.deletar);

r.get('/view/filtro', async (req, res) => {
  try {
    const { usuarioId, inicio, fim } = req.query;
    if (!usuarioId) {
      return res.status(400).send('usuarioId é obrigatório');
    }

    const usuario = await Usuario.buscarPorId(usuarioId);
    const nomeUsuario = usuario ? usuario.nome : 'Usuário não encontrado';

    const eventos = await Evento.buscarPorUsuarioEPeriodo(usuarioId, inicio, fim);

    res.render('eventosFiltro', {
      eventos,
      usuarioNome: nomeUsuario,
      inicio,
      fim,
    });
  } catch (e) {
    res.status(500).send('Erro ao renderizar a lista de eventos');
  }
});

module.exports = r;