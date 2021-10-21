
function admin(req, res, next) {
    if (!req.usuario.isAdmin) { return res.status(403).send('Acesso negado.') }
    next();
}

module.exports = admin;