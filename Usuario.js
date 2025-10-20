const { getDb } = require('./mongo');
const { logErro } = require('./logger');
const { exigir } = require('./validar');

class Usuario {
  static collection() { return getDb().collection('usuarios'); }

  static async inserir({ nome, email, senhaHash }) {
    try {
      exigir(['nome', 'email', 'senhaHash'], { nome, email, senhaHash });
      const doc = { nome, email, senhaHash, criadoEm: new Date() };
      const { insertedId } = await this.collection().insertOne(doc);
      return { _id: insertedId, ...doc };
    } catch (err) {
      logErro(err, { classe: 'Usuario', metodo: 'inserir', email });
      throw err;
    }
  }

  static async buscarPorId(id) {
    const { ObjectId } = require('mongodb');
    try {
      return await this.collection().findOne({ _id: new ObjectId(id) });
    } catch (err) {
      logErro(err, { classe: 'Usuario', metodo: 'buscarPorId', id });
      throw err;
    }
  }

  static async deletarPorId(id) {
    const { ObjectId } = require('mongodb');
    try {
      const r = await this.collection().deleteOne({ _id: new ObjectId(id) });
      return r.deletedCount === 1;
    } catch (err) {
      logErro(err, { classe: 'Usuario', metodo: 'deletarPorId', id });
      throw err;
    }
  }
}

module.exports = Usuario;