
const mongoose = require('mongoose');

const jogadorSchema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true },
    posicoes: [String],
    date: { type: Date, default: Date.now },
    nascimento: Date
});
const Jogador = mongoose.model('jogadores', jogadorSchema);

exports.Jogador = Jogador;
exports.jogadorSchema = jogadorSchema;