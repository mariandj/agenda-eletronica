const Usuario = require('../models/Usuario');
const { logErro } = require('../utils/logger');

class LoginController {
  static formLogin(req, res) {
    if (req.session.usuarioId) {
      return res.redirect('/');
    }
    res.render('login', { erro: null });
  }

  static async autenticar(req, res) {
    try {
      const { email, senhaHash } = req.body;

      if (!email || !senhaHash) {
        return res.status(400).render('login', {
          erro: 'Informe e-mail e senha.',
          email
        });
      }

      const usuario = await Usuario.autenticar(email, senhaHash);

      if (!usuario) {
        return res.status(401).render('login', {
          erro: 'E-mail ou senha inválidos.',
          email
        });
      }

      req.session.usuarioId = usuario._id.toString();
      req.session.usuario = {
        id: usuario._id.toString(),
        nome: usuario.nome,
        email: usuario.email
      };

      res.redirect('/'); 
    } catch (err) {
      logErro(err, { ctrl: 'LoginController', acao: 'autenticar' });
      res.status(500).render('login', {
        erro: 'Erro ao efetuar login. Tente novamente mais tarde.'
      });
    }
  }

  static logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
}

module.exports = LoginController;