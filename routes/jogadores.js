const express = require('express');
const { Jogador } = require('../models/jogador');
const router = express.Router();

// criaJogador('Lyncao', ['Meio Campo', 'Lateral', 'Lateral Direito'], new Date(1991, 10, 10, 10, 10, 10, 22));

router.get('/', async (req, res) => {
    let jogadores = await Jogador.find().sort('nome');
    res.send(jogadores);
});

router.post('/', async (req, res) => {
    let jogadorEnviado = req.body;
    let jogadorCriado = await criaJogador(jogadorEnviado.nome, jogadorEnviado.posicoes, jogadorEnviado.dataNascimento);
    if (jogadorCriado) {
        res.status(200).send(jogadorCriado);
    } else {
        res.status(404).send('Erro ao criar jogador');
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

module.exports = router;