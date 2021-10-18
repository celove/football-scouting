const mongoose = require('mongoose');
const Joi = require('joi');


const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, unique: true, required: true, trim: true, maxlength: 255 }, //required?
    senha: { type: String, required: true, trim: true, maxlength: 255, min: 5 }
});
const Usuario = mongoose.model('usuarios', usuarioSchema);

function validaUsuario(usuario) {
    const schema = Joi.object({
        nome: Joi.string().max(100).required(),
        email: Joi.string().max(255).required().email(),
        senha: Joi.string().min(5).max(255).required(),
    })
    return schema.validate(usuario);
}

exports.Usuario = Usuario;
exports.usuarioSchema = usuarioSchema;
exports.validate = validaUsuario;