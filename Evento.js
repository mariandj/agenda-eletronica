const { getDb } = require('./mongo');
const { logErro } = require('./logger');
const { exigir, exigirPeriodoValido } = require('./validar');

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