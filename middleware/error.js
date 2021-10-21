module.exports = function (err, req, res, next) {
    console.error('Erro durante o processamento da requisição.');
    res.status(500).send('Erro ao realizar a operação.');
}