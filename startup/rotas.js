
const jogadores = require('../routes/jogadores');
const home = require('../routes/home');
const usuarios = require('../routes/usuarios');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const morgan = require('morgan');
const express = require('express');

module.exports = function (app) {

    app.use(morgan('tiny'));
    app.use(express.json());

    app.use('/api/jogadores', jogadores);
    app.use('/api/home', home);
    app.use('/api/usuarios', usuarios);
    app.use('/api/auth', auth);
    app.use(error);
}