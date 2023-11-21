const jwt = require("jsonwebtoken");
const senhaJwt = require("../senhaJwt");
const pool = require("../database/conexao");

const verificaLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {

      return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado" });
    }
    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, senhaJwt);

    const usuario = await pool.query("select * from usuarios where id = $1", [
      id,
    ]);

    if (!usuario) {

      return res.status(401).json({ mensagem: "Não autorizado" });
    }
    req.usuario = usuario.rows[0];

    const tempoAtualEmSegundos = Math.floor(Date.now() / 1000);
    const expiracaoToken = jwt.decode(token).exp;

    if (tempoAtualEmSegundos > expiracaoToken) {
      return res.status(401).json({ mensagem: "Sessão inválida" });
    }
    //console.log(req.usuario)
    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = verificaLogin;