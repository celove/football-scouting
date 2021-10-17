
const mongoose = require('mongoose');

const artigoSchema = new mongoose.Schema({
    titulo: { type: String, required: true, maxlength: 240, minlength: 4, trim: true },
    texto: String,
    jogador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jogadores'
    },
    date: { type: Date, default: Date.now },
});
const Artigo = mongoose.model('artigos', artigoSchema);

function validaArtigo(artigo) {
    //todo
    if (artigo) {
        return true;
    } else {
        return false;
    }
}
exports.Artigo = Artigo;
exports.artigoSchema = artigoSchema;
exports.validate = validaArtigo;