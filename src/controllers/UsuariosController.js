const Usuario = require('../models/Usuario');
const { logErro } = require('../utils/logger');

class UsuariosController {
  static async criar(req, res) {
    try {
      const novo = await Usuario.inserir(req.body);
      res.status(201).json(novo);
    } catch (err) {
      logErro(err, { ctrl: 'UsuariosController', acao: 'criar' });
      res.status(400).json({ error: err.message });
    }
  }

  static async obterPorId(req, res) {
    try {
      const { id } = req.params;
      const user = await Usuario.buscarPorId(id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(user);
    } catch (err) {
      logErro(err, { ctrl: 'UsuariosController', acao: 'obterPorId' });
      res.status(400).json({ error: err.message });
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const ok = await Usuario.deletarPorId(id);
      res.json({ deletado: ok });
    } catch (err) {
      logErro(err, { ctrl: 'UsuariosController', acao: 'deletar' });
      res.status(400).json({ error: err.message });
    }
  }

  static async listar(req, res) {
  try {
    const usuarios = await Usuario.listarTodos();
    res.json(usuarios);
  } catch (err) {
    logErro(err, { ctrl: 'UsuariosController', acao: 'listar' });
    res.status(500).json({ error: err.message });
  }
}

static async listarView(req, res) {
  try {
    const usuarios = await Usuario.listarTodos();
    res.render('usuarios', { usuarios });
  } catch (err) {
    logErro(err, { ctrl: 'UsuariosController', acao: 'listarView' });
    res.status(500).send('Erro ao renderizar a lista de usuários');
  }
}

static async atualizar(req, res) {
  try {
    const { id } = req.params;
    const ok = await Usuario.atualizarPorId(id, req.body);
    if (!ok) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ atualizado: true });
  } catch (err) {
    logErro(err, { ctrl: 'UsuariosController', acao: 'atualizar' });
    res.status(400).json({ error: err.message });
  }
}
}

module.exports = UsuariosController;