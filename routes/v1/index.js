const express = require('express');
const { checaAutenticado } = require('./middlewares/checa-autenticacao');


const statusRouter = require('./status');
const usuariosRouter = require('./usuarios');
const authRouter = require('./auth');

const router = express.Router();

router.use('/status', statusRouter);
router.use('/usuarios', usuariosRouter);
router.use('/auth', authRouter);


module.exports = router;