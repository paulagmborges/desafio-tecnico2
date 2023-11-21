const express = require('express');

const {
    signUp,
    login,
    buscarUsuario,
} = require('../controller/usuarios');

const verificaLogin = require('../middleware/verificaLogin')

const rotas = express();

rotas.post('/usuario', signUp)
rotas.post('/login',login)

rotas.use(verificaLogin)

rotas.get('/usuario',buscarUsuario)

module.exports = rotas