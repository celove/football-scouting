
const express = require('express');
const { Usuario } = require('../models/usuario');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
// const jwt = require('jsonwebtoken');
// const config = require('config');

router.get('/', async (req, res) => {
    try {
        let usuarios = await Usuario.find();
        res.status(200).send(usuarios);
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
        let usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) {
            return res.status(400).send('Email ou senha inválidos.');
        }
        const senhaValida = await bcrypt.compare(req.body.senha, usuario.senha);
        if (!senhaValida) {
            return res.status(400).send('Email ou senha inválidos.');
        }
        const token = usuario.generateAuthToken();
        res.send(token);

    } catch (err) {
        console.log(err);
    }

});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().max(255).required().email(),
        senha: Joi.string().min(5).max(255).required(),
    })
    return schema.validate(req);
}

module.exports = router;