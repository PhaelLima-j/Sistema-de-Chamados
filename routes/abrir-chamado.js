const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', (_, res) => {
  res.render('paginas/abrir-chamado', { titulo: 'Abrir chamado' });
});

router.post('/criar-chamado', upload.single('anexo'), async (req, res) => {
  const { titulo, identificador, urgencia, gravidade, dataChamado, ferramenta, emails, descricao } = req.body;
  const usuarioId = req.user.id;

  let anexoBase64 = null;
  if (req.file) {
    anexoBase64 = req.file.buffer.toString('base64');
  }

  try {
    const novoChamado = await prisma.chamado.create({
      data: {
        titulo,
        identificador,
        urgencia,
        gravidade,
        dataChamado,
        ferramenta,
        emails,
        descricao,
        anexo: anexoBase64,
        usuarioId,
      },
    });

    res.status(201).json({
      sucesso: true,
      chamado: novoChamado,
    });
  } catch (e) {
    logger.error(`Erro na criação do chamado: ${e.message}`);
    res.status(422).json({
      sucesso: false,
      erro: e.message,
    });
  }
});

module.exports = router;
