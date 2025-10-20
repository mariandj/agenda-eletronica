const { connect, close, getDb } = require('./mongo');
const Usuario = require('./Usuario');
const Categoria = require('./Categoria');
const Evento = require('./Evento');
const { logErro } = require('./logger');

async function bootstrap() {
  try {
    await connect();

    const db = getDb();
    await db.collection('eventos').createIndex({ usuarioId: 1, inicio: 1 });
    await db.collection('categorias').createIndex({ usuarioId: 1, nome: 1 }, { unique: false });

    const u = await Usuario.inserir({
      nome: 'Maria Clara Nascimento',
      email: 'mariajesus@alunos.utfpr.edu.br',
      senhaHash: 'hash_teste'
    });

    const cat = await Categoria.inserir({
      nome: 'Trabalho',
      cor: '#00A884',
      usuarioId: String(u._id)
    });

    const ev = await Evento.inserir({
      titulo: 'Reunião de projeto',
      descricao: 'Alinhar backlog',
      inicio: new Date(Date.now() + 60 * 60 * 1000),
      fim: new Date(Date.now() + 2 * 60 * 60 * 1000),
      usuarioId: String(u._id),
      categoriaId: String(cat._id)
    });

    const inicioHoje = new Date(); inicioHoje.setHours(0,0,0,0);
    const fimHoje = new Date(); fimHoje.setHours(23,59,59,999);
    const eventosHoje = await Evento.buscarPorUsuarioEPeriodo(String(u._id), inicioHoje, fimHoje);

    console.log('Usuário criado:', u._id.toString());
    console.log('Categoria criada:', cat._id.toString());
    console.log('Evento criado:', ev._id.toString());
    console.log('Eventos de hoje:', eventosHoje.map(e => ({ id: e._id.toString(), titulo: e.titulo })));

    const deletado = await Evento.deletarPorId(String(ev._id));
    console.log('Evento deletado?', deletado);

    // Teste proposital de erro
    try {
      await Evento.inserir({
        inicio: new Date(),
        fim: new Date(Date.now() + 60 * 60 * 1000),
        usuarioId: String(u._id)
      });
    } catch (err) {
      console.error('Erro proposital capturado:', err.message);
    }

  } catch (err) {
    console.error('Falha no bootstrap:', err.message);
    logErro(err, { fase: 'bootstrap' });
  } finally {
    await close();
  }

}

bootstrap();