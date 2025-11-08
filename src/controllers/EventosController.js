const Evento = require('../models/Evento');
const { logErro } = require('../utils/logger');

class EventosController {
  static async criar(req, res) {
    try {
      const novo = await Evento.inserir(req.body);
      res.status(201).json(novo);
    } catch (err) {
      logErro(err, { ctrl: 'EventosController', acao: 'criar' });
      res.status(400).json({ error: err.message });
    }
  }

  static async listar(req, res) {
    try {
      const { usuarioId, inicio, fim } = req.query;
      if (!usuarioId) return res.status(400).json({ error: 'usuarioId é obrigatório' });
      const lista = await Evento.buscarPorUsuarioEPeriodo(usuarioId, inicio, fim);
      res.json(lista);
    } catch (err) {
      logErro(err, { ctrl: 'EventosController', acao: 'listar' });
      res.status(400).json({ error: err.message });
    }
  }

  static async listarView(req, res) {
  try {
    const eventos = await Evento.listarTodos();
    res.render('eventos', { eventos });
  } catch (err) {
    logErro(err, { ctrl: 'EventosController', acao: 'listarView' });
    res.status(500).send('Erro ao renderizar a lista de eventos');
  }
}

static async atualizar(req, res) {
  try {
    const { id } = req.params;
    const ok = await Evento.atualizarPorId(id, req.body);
    if (!ok) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }
    res.json({ atualizado: true });
  } catch (err) {
    logErro(err, { ctrl: 'EventosController', acao: 'atualizar' });
    res.status(400).json({ error: err.message });
  }
}

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const ok = await Evento.deletarPorId(id);
      res.json({ deletado: ok });
    } catch (err) {
      logErro(err, { ctrl: 'EventosController', acao: 'deletar' });
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = EventosController;