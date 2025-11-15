const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'agenda_dev';

let client;
let db;

async function connect() {
  if (db) return db;
  client = new MongoClient(uri, { ignoreUndefined: true });
  await client.connect();
  db = client.db(dbName);
  return db;
}

function getDb() {
  if (!db) throw new Error('DB não inicializado. Chame connect() antes.');
  return db;
}

async function close() {
  if (client) await client.close();
  client = undefined;
  db = undefined;
}

module.exports = { connect, getDb, close };