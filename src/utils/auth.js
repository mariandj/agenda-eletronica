function exigirLogin(req, res, next) {
  if (!req.session || !req.session.usuarioId) {
    return res.redirect('/login');
  }
  next();
}

module.exports = { exigirLogin };