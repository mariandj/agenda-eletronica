const { getDb } = require('./mongo');
const { logErro } = require('./logger');
const { exigir } = require('./validar');

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