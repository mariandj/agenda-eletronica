const { getDb } = require('../db/mongo');
const { logErro } = require('../utils/logger');
const { exigir } = require('../utils/validar');

class Categoria {
  static collection() { return getDb().collection('categorias'); }

  static async inserir({ nome, cor, usuarioId }) {
    const { ObjectId } = require('mongodb');
    try {
      exigir(['nome', 'usuarioId'], { nome, usuarioId });
      const doc = { nome, cor: cor || null, usuarioId: new ObjectId(usuarioId), criadoEm: new Date() };
      const { insertedId } = await this.collection().insertOne(doc);
      return { _id: insertedId, ...doc };
    } catch (err) {
      logErro(err, { classe: 'Categoria', metodo: 'inserir', nome });
      throw err;
    }
  }

  static async listarPorUsuario(usuarioId) {
    const { ObjectId } = require('mongodb');
    try {
      return await this.collection().find({ usuarioId: new ObjectId(usuarioId) }).toArray();
    } catch (err) {
      logErro(err, { classe: 'Categoria', metodo: 'listarPorUsuario', usuarioId });
      throw err;
    }
  }

  static async listarTodos() {
  try {
    const db = getDb();
    const categorias = await db.collection('categorias').find({}).toArray();

    const usuarios = await db.collection('usuarios').find({}).toArray();

    const mapaUsuarios = {};
    for (const u of usuarios) {
      mapaUsuarios[u._id.toString()] = u.nome;
    }

    for (const c of categorias) {
      const chaveUsuario = c.usuarioId?.toString();
      c.usuarioNome = mapaUsuarios[chaveUsuario] || 'Usuário não encontrado';
    }

    return categorias;
  } catch (err) {
    logErro(err, { classe: 'Categoria', metodo: 'listarTodos' });
    throw err;
  }
}

static async atualizarPorId(id, dados) {
  const { ObjectId } = require('mongodb');
  try {
    const campos = {};
    if (dados.nome) campos.nome = dados.nome;
    if (dados.cor) campos.cor = dados.cor;

    const r = await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: campos }
    );
    return r.matchedCount === 1;
  } catch (err) {
    logErro(err, { classe: 'Categoria', metodo: 'atualizarPorId', id });
    throw err;
  }
}

  static async deletarPorId(id) {
    const { ObjectId } = require('mongodb');
    try {
      const r = await this.collection().deleteOne({ _id: new ObjectId(id) });
      return r.deletedCount === 1;
    } catch (err) {
      logErro(err, { classe: 'Categoria', metodo: 'deletarPorId', id });
      throw err;
    }
  }
}

module.exports = Categoria;