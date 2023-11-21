const express = require('express');

const {
    signUp,
    login,
    findUser,
} = require('../controller/users');

const verifyLogin = require('../middleware/verifyLogin')

const routes = express();

routes.post('/usuario', signUp)
routes.post('/login',login)

routes.use(verifyLogin)

routes.get('/usuario',findUser)

module.exports = routes