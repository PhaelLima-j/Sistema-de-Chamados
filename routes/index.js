const express = require('express');
const { checaAutenticado } = require('./middlewares/checa-autenticacao');
const passport = require('passport');


const statusRouter = require('./status');
const usuariosRouter = require('./usuarios');
const authRouter = require('./auth');
const homeRouter = require('./home');

const router = express.Router();

router.use('/status', statusRouter);
router.use('/usuarios', usuariosRouter);
router.use('/auth', authRouter);
router.use('/', homeRouter);


module.exports = router;