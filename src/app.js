const path = require('path');
const express = require('express');
const { connect } = require('./db/mongo');
const { logErro } = require('./utils/logger');
const Evento = require('./models/Evento');
const usuariosRoutes = require('./routes/usuarios');
const categoriasRoutes = require('./routes/categorias');
const eventosRoutes = require('./routes/eventos');

const app = express();

const hbs = require('hbs');
const dayjs = require('dayjs');
hbs.registerHelper('formatarData', function (dataISO) {
  if (!dataISO) return '';
  return dayjs(dataISO).format('DD/MM/YYYY HH:mm');
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.json()); 
app.get('/health', (req, res) => res.json({ ok: true }));

connect()
  .then(() => console.log('[DB] conectado'))
  .catch(err => {
    console.error('[DB] falhou ao conectar', err.message);
    logErro(err, { fase: 'startup' });
    process.exit(1);
  });

app.get('/', async (req, res, next) => {
  try {
    const eventos = await Evento.listarTodos();

    const mapaDias = {};

    for (const ev of eventos) {
      const dia = dayjs(ev.inicio).format('YYYY-MM-DD');
      if (!mapaDias[dia]) {
        mapaDias[dia] = {
          dataISO: dia,
          label: dayjs(ev.inicio).format('DD/MM/YYYY'),
          eventos: []
        };
      }
      mapaDias[dia].eventos.push(ev);
    }

    const dias = Object.values(mapaDias).sort((a, b) =>
      a.dataISO.localeCompare(b.dataISO)
    );

    res.render('index', { dias });
  } catch (err) {
    next(err);
  }
});

app.use('/usuarios', usuariosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/eventos', eventosRoutes);

app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

app.use((err, req, res, next) => {
  logErro(err, { rota: req.path, metodo: req.method });
  res.status(500).json({ error: 'Erro interno' });
});

module.exports = app;