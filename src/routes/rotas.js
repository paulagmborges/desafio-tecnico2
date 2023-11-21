const express = require('express');

const {signUp} = require('../controller/usuarios');

const rotas = express();

rotas.post('/usuario', signUp)


module.exports = rotas