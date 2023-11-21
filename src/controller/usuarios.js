const pool = require('../database/conexao')

const signUp = async (req,res) => {

  const {nome, email, senha, telefone} = req.body;
  try {  

    const novoUsario = await pool.query(
      "insert into usuarios (nome, email, senha, telefone) values ($1,$2,$3,$4) returning*",
      [nome, email, senha, telefone]
    )

    return res.status(201).json(novoUsario.rows[0]);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports ={
  signUp,
}