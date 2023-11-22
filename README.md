# desafio-tecnico2
# Descrição
Foi criado uma API RESTful para autenticação de usuários, que permita operações de cadastro , autenticação e login e recuperação de informações do usuário. 

## :man_mechanic: Linguagens e Ferramentas
- Node.js<br>
- Express.js<br>
- PostgreSQL<br>
- bcryptjs<br>
- jwt<br>
- pg<br>
- nodemon<br>
- dotenv<br>


## :sassy_man:Endpoints
1. Sign Up(Criação de Cadastro)
2. login (Autenticação/login)
3. findUser (Acesse informações detalhadas sobre seu perfil de usuário após efetuar o login)

## :writing_hand: Requisitos 
- Persistência de dados com PostgreSQL.<br>
- Sistema de build com gerenciamento de dependências.<br>
- Framework: Express.<br>
- JWT como token.<br>
- Criptografia hash na senha e token.<br>
  
## :computer: Executando Localmente<br>
- Clone o repositório.<br>
- Instale as dependências usando :
```shell 
npm install
````
- Criação do Bando de Dados
```shell
No arquivo dump.sql que está dentro da pasta database contém as queries de criação do banco, das tabelas e de iserção das categorias.
````
- Configure as variáveis de ambiente no arquivo .env.<br>
- Execute o projeto com :
```shell
npm run dev
````

## Desenvolvedora
- Paula Borges
