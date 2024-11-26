
const { Usuario } = require('../models');

const bcrypt = require('bcrypt');
const validator = require('validator');

const criaUsuario = async(dadosUsuario) => {
    if (!dadosUsuario.senha) {
        throw new Error('O campo senha é obrigatório');
    }

    if (dadosUsuario.senha.length <= 4) {
        throw new Error('O campo senha deve ter no mínimo 5 caracteres');
    }

    const hashSenha = await bcrypt.hash(dadosUsuario.senha, 10);

    if (!validator.isEmail(dadosUsuario.email)) {
        throw new Error('E-mail inválido');
    }

    const dataAtual = new Date();

    const usuarioData = {
        ...dadosUsuario,
        senha: hashSenha,
        criadoem: dataAtual,
      };

    return await Usuario(usuarioData);
}

module.exports = criaUsuario;