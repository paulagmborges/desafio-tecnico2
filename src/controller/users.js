const bcrypt = require("bcrypt");
const pool = require("../config/connection");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../senhaJwt");

const signUp = async (req, res) => {
  const { nome, email, senha, telefone } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(senha, 10);

    const searchEmail = await pool.query(
      "select * from usuarios where email =$1",
      [email]
    );
    if (searchEmail.rowCount > 0) {
      return res.status(401).json({ message: "E-mail já existente" });
    }

    const newUser = await pool.query(
      "insert into usuarios (nome, email, senha, telefone) values ($1,$2,$3,$4) returning*",
      [nome, email, encryptedPassword, telefone]
    );

    return res.status(201).json(newUser.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    if (!email || !senha) {
      return res
        .status(401)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const searchUser = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (!searchUser.rowCount) {
      return res.status(401).json({ message: "Email e/ou senha inválidos" });
    }

    const validPassword = await bcrypt.compare(senha, searchUser.rows[0].senha);

    if (!validPassword) {
      return res.status(401).json({message : "Email e/ou senha inválidos" });
    }

    const { senha: _, ...loggedUser } = searchUser.rows[0];

    await pool.query(
      "update usuarios SET ultimo_login = CURRENT_TIMESTAMP where id = $1",
      [loggedUser.id]
    );

    const token = jwt.sign({ id: loggedUser.id }, senhaJwt, {
      expiresIn: "30m",
    });

    return res.status(200).json({ usuario: loggedUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};
const findUser = async (req, res) => {
  const { id } = req.usuario;
  try {
    const getUser = await pool.query(
      "select * from usuarios where id = $1 ",
      [id]
    );

    if (getUser < 1) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(getUser.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

module.exports = {
  signUp,
  login,
  findUser,
};
