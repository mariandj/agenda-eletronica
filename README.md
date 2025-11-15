# Agenda Eletrônica
Projeto da disciplina de **Programação Web Back-End (EC48B - C71)**.

## 📌 Tema
Tema escolhido: **Agenda Eletrônica (estilo Google Calendar)**

O sistema implementa classes em Node.js que acessam o MongoDB para inserção, busca e deleção de dados. Possui, também, validação de campos obrigatórios, tratamento de execeções e armazenamento em arquivos de log, conforme especificações da entrega.  
Para o projeto final foi utilizado o Express.js e o Postman para testar as rotas.

## 🚀 Tecnologias utilizadas
- Node.js (LTS)
- Express.js
- Handlebar(hbs)
- MongoDB (Community Server)
- Postman - utilizado para testar e validar todas as rotas da API
- Bibliotecas: 
    - mongodb - driver ofical do MongoDB
    - express - servidor e roteamento
    - express-session
    - cookie-parser - leitura e escrita de cookies
    - dotenv - variáveis de ambiente
    - nodemon - suporte ao desenvolvimento 

## 📂 Estrutura do projeto

```
agenda-eletronica/  
  src/
    controllers/      # lógica das rotas (Usuários, Eventos, Categorias, Login)
    routes/           # definição das rotas
    models/           # classes: Usuario, Categoria, Evento
    views/            # páginas Handlebars (.hbs)
    public/           # CSS e JS estáticos
    utils/            # logger, validações e autenticação
    logs/             # arquivos .log de exceções
    db/               # conexão com MongoDB
  app.js
  server.js           # inicialização do servidor Express
  .env            # credenciais do MongoDB
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