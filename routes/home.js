
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

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let artigo = await Artigo.findById(id).populate('jogador', '-_id');
        res.status(200).send(artigo);
    } catch (err) {
        console.log('error: ', err);
        res.status(404).send(err)
    }
});

router.post('/paginacao/:artigosPorLinha', async (req, res) => {
    try {
        let artigos = await Artigo.find().populate('jogador', '-_id').sort('-date');
        const artigosPorLinha = req.params.artigosPorLinha;
        if (req.body && req.body.length > 0) {
            console.log("entrou");
            let body = new Set(req.body);
            artigos = artigos.filter(a => {
                let jogaNaPosicao = false;
                a.jogador.posicoes.forEach(p => {
                    if (body.has(p)) {
                        console.log(body);
                        console.log(p);
                        jogaNaPosicao = true;
                    }
                });
                return jogaNaPosicao;
            })
        }
        let artigosResultado = [];
        artigos.forEach((artigo, index) => {
            if ((index % artigosPorLinha) == 0) {
                artigosResultado.push([artigo]);
            } else {
                artigosResultado[Math.trunc(index / artigosPorLinha)].push(artigo);
            }
        });

        res.status(200).send(artigosResultado);
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