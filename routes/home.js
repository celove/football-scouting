
const express = require('express');
const { Artigo } = require('../models/artigo');
const { Jogadores, criaJogador } = require('../routes/jogadores');
const router = express.Router();

router.get('/', async (req, res) => {
    try {

        let artigos = await Artigo.find().populate('jogador', '-_id');
        res.status(200).send(artigos);
    } catch (err) {
        console.log('error: ', err);
        res.status(404).send(err)
    }
});

router.post('/', async (req, res) => {
    let artigoRecebido = req.body;
    let artigoCriado = await criaArtigo(artigoRecebido.titulo, artigoRecebido.texto, artigoRecebido.jogador);
    if (artigoCriado) {
        res.status(200).send(artigoRecebido);
    } else {
        res.status(404).send('Erro ao criar artigo');
    }
});

async function criaArtigo(titulo, texto, novoJogador) {
    const jogador = await criaJogador(novoJogador.nome, novoJogador.posicoes, novoJogador.dataNascimento);
    const artigo = new Artigo({
        titulo: titulo,
        texto: texto,
        jogador: jogador
    });
    let result = await artigo.save();
    console.log(result);
    return result;
}

module.exports = router;