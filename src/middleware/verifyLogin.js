const jwt = require("jsonwebtoken");
const senhaJwt = require("../senhaJwt");
const pool = require("../config/connection");

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(401).json({ message:'Não autorizado'});
    }
    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, senhaJwt);

    const usuario = await pool.query("select * from usuarios where id = $1", [
      id,
    ]);

    if (!usuario) {
      return res.status(401).json({ message: 'Não autorizado' });
    }
    req.usuario = usuario.rows[0];

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const expirationToken = jwt.decode(token).exp;

    if (currentTimeInSeconds > expirationToken) {
      return res.status(401).json({ message: 'Sessão inválida' });
    }
    //console.log(req.usuario)
    next();
  } catch (error) {
    return res.status(500).json({message:'Erro interno no servidor'});
  }
};
module.exports = verifyLogin;
