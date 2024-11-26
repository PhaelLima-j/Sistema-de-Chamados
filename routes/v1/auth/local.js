const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

// Importando o Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

passport.use(new LocalStrategy({
    usernameField: 'nome'
}, async (nomeDeUsuario, senha, done) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { nome: nomeDeUsuario }
        });

        if (!usuario) {
            return done(null, false, { message: 'Usuário não encontrado.' });
        }

        const aSenhaEstaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (aSenhaEstaCorreta) {
            return done(null, usuario);
        } else {
            return done(null, false, { message: 'Senha incorreta.' });
        }
    } catch (err) {
        done(err);
    }
}));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id); 
});

passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id }
        });
        done(null, usuario);
    } catch (err) {
        done(err);
    }
});
