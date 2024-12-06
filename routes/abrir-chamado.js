const express = require('express');

router = express.Router();

router.get('/', (_, res) => {
    res.render('paginas/abrir-chamado', { titulo: 'Abrir chamado'});
});

module.exports = router;