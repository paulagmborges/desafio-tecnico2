const bcrypt = require('bcrypt');
const pool = require('../database/conexao')
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt');

const signUp = async (req,res) => {

  const {nome, email, senha, telefone} = req.body;
  try {  
    const senhaCriptografada = await bcrypt.hash(senha,10)
        
    const buscarEmail = await pool.query(
    "select * from usuarios where email =$1",
    [email]
    )
    if (buscarEmail.rowCount > 0) {
      return res.status(401).json({ mensagem: "E-mail já existente" });
    }

    const novoUsario = await pool.query(
    "insert into usuarios (nome, email, senha, telefone) values ($1,$2,$3,$4) returning*",
    [nome, email, senhaCriptografada, telefone]
    )

    return res.status(201).json(novoUsario.rows[0]);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const login = async (req, res) => { 
   const { email, senha } = req.body;
   try {
    
    if (!email || !senha) {
      return res.status(401).json({ mensagem: "Todos os campos são obrigatórios" });
    }

   const procurarUsuario = await pool.query(
    "select * from usuarios where email = $1",
    [email]
    );

    if (!procurarUsuario.rowCount ) {
      return res.status(401).json({ messagem: "Email e/ou senha inválidos" });
        } 
  

    const senhaValida = await bcrypt.compare(senha, procurarUsuario.rows[0].senha);

    if (!senhaValida) {
      return res.status(401).json({ menssagem: "Email e/ou senha inválidos" });
      }
    
   const { senha: _, ...usuarioLogado } = procurarUsuario.rows[0];

  await pool.query(
  "update usuarios SET ultimo_login = CURRENT_TIMESTAMP where id = $1",
  [usuarioLogado.id]);
    
   const token = jwt.sign({ id: usuarioLogado.id }, senhaJwt, { expiresIn: "30m", });
    
    return res.status(200).json({ usuario: usuarioLogado, token});

      } catch (error) {
        return res.status(500).json(error.message);
      }
  }
  const buscarUsuario = async (req, res) => {
    const { id } = req.usuario;
    try {
      const obterUsuario = await pool.query(
        "select * from usuarios where id = $1 ",
        [id]
      );
  
      if (obterUsuario < 1) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }
  
      return res.status(200).json(obterUsuario.rows[0]);

    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

module.exports ={
  signUp,
  login,
  buscarUsuario
}