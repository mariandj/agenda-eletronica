# Agenda Eletrônica
Projeto 1 da disciplina de **Programação Web Back-End (EC48B - C71)**.

## 📌 Tema
Tema escolhido: **Agenda Eletrônica (estilo Google Calendar)**

O sistema implementa classes em Node.js que acessam o MongoDB para inserção, busca e deleção de dados. Possui, também, validação de campos obrigatórios, tratamento de execeções e armazenamento em arquivos de log, conforme especificações da entrega.  

## 🚀 Tecnologias utilizadas
- Node.js (LTS)
- MongoDB (Community Server)
- Bibliotecas: 
    - [mongodb](https://www.npmjs.com/package/mongodb) - driver oficial do MongoDB
    - [dotenv](https://www.npmjs.com/package/dotenv) - gerneciamento de variáveis de ambiente
    - [nodemon](https://www.npmjs.com/package/nodemon) - para o desenvolvimento 

## 📂 Estrutura do projeto

```
agenda-eletronica/  
  / node_modules
  logger.js
  validar.js
  mongo.js
  erros-AAAAMMDD.log
  Evento.js
  Usuario.js
  Categoria.js         
  index.js      
  .env           
  package.json
  README.md
```

## 🗄️ Estrutura das coleções (MongoDB)
- usuarios
    - _id, nome, email, senhaHash, criadoEm
- categorias
    - _id, nome, cor, usuarioId, criadoEm
- eventos
    - _id, titulo, descricao, inicio, fim, usuarioId, categoriaId, criadoEm

## ▶️ Como executar
1. Clonar repositório e instalar dependências
```
git clone <link-do-repositorio>
cd agenda-eletronica
npm install
```

2. Configurar MongoDB  
Se certificar que tem o `.env` na pasta baixada. Caso não tiver, crie um arquivo `.env` com:
```
MONGODB_URI=mongodb://localhost:27017
DB_NAME=agenda_dev
```

3. Rodar o projeto
```
# ambiente de desenvolvimento (reinicia automático)
npm run dev

# ambiente normal
npm start
```

## 🔍 Resultado esperado
Ao rodar `src/index.js`, o sistema executa: 
1. Criação de um usuário
2. Criação de uma categoria vinculada
3. Criação de um evento
4. Busca de eventos do usuário
5. Deleção de um usuário 

Saída esperada no terminal: 
```
Usuário criado: <id_usuario>
Categoria criada: <id_categoria>
Evento criado: <id_evento>
Eventos de hoje: [ { id: <id_evento>, titulo: 'Reunião de projeto' } ]
Evento deletado? true
```

## ⚠️ Logs de exceções
- Qualquer erro é capturado em `src/logs/`.  
Exemplo: criação de evento sem título. 
- O arquivo terá nome no formato: `erros-YYYYMMDD.log`
- Exemplo de log gerado: 
```
{
  "timestamp": "2025-09-30T15:00:00.000Z",
  "message": "Campos obrigatórios ausentes: titulo",
  "stack": "...",
  "contexto": { "classe": "Evento", "metodo": "inserir" }
}
```

## 👩‍💻 Autoria
Desenvolvido por [Maria Clara Nascimento de Jesus](https://www.linkedin.com/in/mariaclarandj).  
📚 UTFPR – Programação Web Back-End (EC48B-C71)