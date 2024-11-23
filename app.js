require('dotenv').config()

const { PrismaClient } = require('@prisma/client');
const createError = require('http-errors');
const express = require('express');
const passport = require('passport');

const { logger } = require('./utils');
const router = require('./routes');

const prisma = new PrismaClient();
const app = express();

//  configurando autenticação
app.use(passport.initialize());

// configurando formatos de parâmetros
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// declarando rotas
app.use('/', router);

// caso nenhuma rota de match, redireciona para a 404
app.use(function(_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, _req, res, _next) {
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
}

startServer();

process.on('SIGINT', async () => {
  logger.info('Encerrando o servidor...');
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = app;