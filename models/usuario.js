const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const Usuario = async (dadosUsuario) => {    

    const result = await prisma.usuario.create({
        data: {
            nome: dadosUsuario.nome,
            email: dadosUsuario.email,
            senha: dadosUsuario.senha,
            criadoem: dadosUsuario.criadoem,
        },
    });

    return !! result;

};

module.exports = Usuario;