require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const createError = require('http-errors');
const session = require('express-session');
const express = require('express');
const passport = require('passport');
const path = require('path');

const { logger } = require('./utils');
const router = require('./routes');

// Carregando estratégia do Passport
require('./routes/auth/local'); // Certifique-se de ajustar o caminho corretamente

const prisma = new PrismaClient();
const app = express();

// configurando formatos de parâmetros
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// configurando autenticação
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Defina `secure: true` se estiver usando HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// declarando ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// configurando arquivos estáticos
app.use(express.static('public'));

// declarando rotas
app.use('/', router);

// caso nenhuma rota de match, redireciona para a 404
app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, _req, res, _next) {
  res.status(err.status || 500);
  res.json({
    sucesso: false,
    erro: err.message,
  });
});

const porta = 3000;

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info(`Conexão com banco de dados bem sucedida!`);

    app.listen(porta, () => {
      logger.info(`Servidor ouvindo na porta ${porta}`);
    });
  } catch (error) {
    logger.error(`Erro ao conectar ao banco de dados: ${error.message}`);
    process.exit(1);
  }
};

startServer();

process.on('SIGINT', async () => {
  logger.info('Encerrando o servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = app;
