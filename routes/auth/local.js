const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const prisma = require('@prisma/client').PrismaClient; 
const prismaClient = new prisma();

passport.use(
  new LocalStrategy(
    { usernameField: 'email' }, 
    async (email, senha, done) => {
      try {
        const usuario = await prismaClient.usuario.findUnique({
          where: { email },
          select: { id: true, senha: true, nome: true }, 
        });

        if (!usuario) {
          return done(null, false, { message: 'Usuário não encontrado' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
          return done(null, false, { message: 'Senha incorreta' });
        }

        return done(null, usuario); 
      } catch (err) {
        return done(err); 
      }
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await prismaClient.usuario.findUnique({ where: { id } });
    done(null, usuario);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
