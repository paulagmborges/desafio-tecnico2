create database desafio_tec_escribo;


    create table usuarios (
    id serial primary key,
    nome text not null,
    email text UNIQUE,
    senha text not null,
    telefone varchar(15),
    data_criacao TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );