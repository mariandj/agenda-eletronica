const { getDb } = require('../db/mongo');
const { logErro } = require('../utils/logger');
const { exigir, exigirPeriodoValido } = require('../utils/validar');

class Evento {
  static collection() { return getDb().collection('eventos'); }

  static async inserir({ titulo, descricao, inicio, fim, usuarioId, categoriaId }) {
    const { ObjectId } = require('mongodb');
    try {
      exigir(['titulo', 'inicio', 'fim', 'usuarioId'], { titulo, inicio, fim, usuarioId });
      inicio = new Date(inicio);
      fim = new Date(fim);
      exigirPeriodoValido(inicio, fim);

      const doc = {
        titulo,
        descricao: descricao || null,
        inicio,
        fim,
        usuarioId: new ObjectId(usuarioId),
        categoriaId: categoriaId ? new ObjectId(categoriaId) : null,
        criadoEm: new Date()
      };
      const { insertedId } = await this.collection().insertOne(doc);
      return { _id: insertedId, ...doc };
    } catch (err) {
      logErro(err, { classe: 'Evento', metodo: 'inserir', titulo });
      throw err;
    }
  }

  static async buscarPorUsuarioEPeriodo(usuarioId, inicio, fim) {
    const { ObjectId } = require('mongodb');
    try {
      inicio = inicio ? new Date(inicio) : undefined;
      fim = fim ? new Date(fim) : undefined;

      const filtro = { usuarioId: new ObjectId(usuarioId) };
      if (inicio && fim) {
        filtro.inicio = { $gte: inicio, $lte: fim };
      }
      return await this.collection().find(filtro).sort({ inicio: 1 }).toArray();
    } catch (err) {
      logErro(err, { classe: 'Evento', metodo: 'buscarPorUsuarioEPeriodo', usuarioId, inicio, fim });
      throw err;
    }
  }

  static async listarTodos() {
    try {
      const db = getDb();

      const eventos = await db.collection('eventos').find({}).toArray();
      const usuarios = await db.collection('usuarios').find({}).toArray();

      const mapaUsuarios = {};
      for (const u of usuarios) {
        mapaUsuarios[u._id.toString()] = u.nome;
      }

      for (const ev of eventos) {
        ev.usuarioNome = mapaUsuarios[ev.usuarioId] || 'Usuário não encontrado';
      }

      return eventos;
    } catch (err) {
      logErro(err, { classe: 'Evento', metodo: 'listarTodos' });
      throw err;
    }
  }

  static async atualizarPorId(id, dados) {
  const { ObjectId } = require('mongodb');
  try {
    const campos = {};
    if (dados.titulo) campos.titulo = dados.titulo;
    if (dados.descricao) campos.descricao = dados.descricao;
    if (dados.inicio) campos.inicio = new Date(dados.inicio);
    if (dados.fim) campos.fim = new Date(dados.fim);
    if (dados.cor) campos.cor = dados.cor;

    const r = await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: campos }
    );
    return r.matchedCount === 1;
  } catch (err) {
    logErro(err, { classe: 'Evento', metodo: 'atualizarPorId', id });
    throw err;
  }
}

  static async deletarPorId(id) {
    const { ObjectId } = require('mongodb');
    try {
      const r = await this.collection().deleteOne({ _id: new ObjectId(id) });
      return r.deletedCount === 1;
    } catch (err) {
      logErro(err, { classe: 'Evento', metodo: 'deletarPorId', id });
      throw err;
    }
  }
}

module.exports = Evento;