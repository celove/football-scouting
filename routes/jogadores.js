const express = require('express');
const { Jogador } = require('../models/jogador');
const router = express.Router();
const auth = require('../middleware/auth');

// criaJogador('Lyncao', ['Meio Campo', 'Lateral', 'Lateral Direito'], new Date(1991, 10, 10, 10, 10, 10, 22));

router.get('/', async (req, res, next) => {
    try {
        let jogadores = await Jogador.find().sort('nome');
        res.send(jogadores);
    } catch (error) {
        next(error);
    }

});

router.post('/', auth, async (req, res) => {
    try {
        let jogadorEnviado = req.body;
        let jogadorCriado = await criaJogador(jogadorEnviado.nome, jogadorEnviado.posicoes, jogadorEnviado.dataNascimento);
        if (jogadorCriado) {
            res.status(200).send(jogadorCriado);
        } else {
            res.status(404).send('Erro ao criar jogador');
        }
    } catch (error) {
        next(error);
    }
});


async function criaJogador(nome, posicoes, dataNascimento) {

    const jogador = new Jogador({
        nome: nome,
        posicoes: posicoes,
        nascimento: dataNascimento
    });
    let result = await jogador.save();
    console.log(result);
    return result;
}

module.exports.router = router;
module.exports.criaJogador = criaJogador;