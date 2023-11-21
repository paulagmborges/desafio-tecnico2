const express = require('express');

const rotas = express();

rotas.get('/',(req,res) => {
    res.send('tudo ok');
})


module.exports = rotas