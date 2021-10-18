
const express = require('express');
const { Usuario, validate } = require('../models/usuario');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {

        let usuarios = await Usuario.find();
        res.status(200).send(usuarios);
    } catch (err) {
        console.log('error: ', err);
        res.status(404).send(err)
    }
});

router.get('/me', auth, async (req, res) => {
    try {
        let usuario = await Usuario.findById(req.usuario._id).select('-senha');
        res.status(200).send(usuario);
    } catch (err) {
        console.log('error: ', err);
        res.status(404).send(err)
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        let usuarioRecebido = req.body;
        let usuario = await Usuario.findOne({ email: usuarioRecebido.email });
        if (usuario) {
            return res.status(400).send('Usuario já existe na base de dados.')
        }

        usuario = await criaUsuario(usuarioRecebido.nome, usuarioRecebido.email, usuarioRecebido.senha);
        if (usuario) {
            const token = jwt.sign({ _id: usuario._id }, config.get('jwtPrivateKey'));
            res.header('x-auth-token', token).status(200).send(_.pick(usuario, ['id', 'nome', 'email']));
        } else {
            res.status(404).send('Erro ao criar usuario');
        }
    } catch (err) {
        console.log(err);
    }

});

async function criaUsuario(nome, email, senha) {
    const usuario = new Usuario({
        nome: nome,
        email: email,
        senha: senha
    });
    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(usuario.senha, salt);

    let result = await usuario.save();
    console.log(result);
    return result;
}

module.exports = router;