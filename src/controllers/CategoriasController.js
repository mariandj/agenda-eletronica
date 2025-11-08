const Categoria = require('../models/Categoria');
const { logErro } = require('../utils/logger');

class CategoriasController {
  static async criar(req, res) {
    try {
      const novo = await Categoria.inserir(req.body);
      res.status(201).json(novo);
    } catch (err) {
      logErro(err, { ctrl: 'CategoriasController', acao: 'criar' });
      res.status(400).json({ error: err.message });
    }
  }

  static async listarPorUsuario(req, res) {
    try {
      const { usuarioId } = req.params;
      const lista = await Categoria.listarPorUsuario(usuarioId);
      res.json(lista);
    } catch (err) {
      logErro(err, { ctrl: 'CategoriasController', acao: 'listarPorUsuario' });
      res.status(400).json({ error: err.message });
    }
  }

  static async listar(req, res) {
    try {
      const categorias = await Categoria.listarTodos();
      res.json(categorias);
    } catch (err) {
      logErro(err, { ctrl: 'CategoriasController', acao: 'listar' });
      res.status(500).json({ error: err.message });
    }
  }

  static async atualizar(req, res) {
  try {
    const { id } = req.params;
    const ok = await Categoria.atualizarPorId(id, req.body);
    if (!ok) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.json({ atualizado: true });
  } catch (err) {
    logErro(err, { ctrl: 'CategoriasController', acao: 'atualizar' });
    res.status(400).json({ error: err.message });
  }
}

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const ok = await Categoria.deletarPorId(id);
      res.json({ deletado: ok });
    } catch (err) {
      logErro(err, { ctrl: 'CategoriasController', acao: 'deletar' });
      res.status(400).json({ error: err.message });
    }
  }

  static async listarView(req, res) {
    try {
      const categorias = await Categoria.listarTodos();
      res.render('categorias', { categorias });
    } catch (err) {
      logErro(err, { ctrl: 'CategoriasController', acao: 'listarView' });
      res.status(500).send('Erro ao renderizar a lista de categorias');
    }
  }
}

module.exports = CategoriasController;