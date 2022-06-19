// criando um modulo, ele cria um obj e permite que a gente utilize
module.exports = {
    //pegando das variaveis de ambiente e exportando
    host: process.env.NODE_MYSQL_SERVIDOR,
    user: process.env.NODE_MYSQL_USUARIO,
    password: process.env.NODE_MYSQL_SENHA,
    database: process.env.NODE_MYSQL_BD
};
/*
REVIEW: Configurado para o banco, somente necessario executar.
Para criar variavel de ambiente:
@echo off 
set NODE_MYSQL_SERVIDOR=127.0.0.1
set NODE_MYSQL_USUARIO=Usu_TrabMag
set NODE_MYSQL_SENHA=ProjMag
set NODE_MYSQL_BD=cidadaobd
@echo Variaveis de ambiente ajustadas com sucesso!
*/

/* NOTE: Comando que eu usei no banco.
CREATE DATABASE cidadaoBD

USE cidadaoBD
CREATE TABLE IF NOT EXISTS cidadao 
(
   cid_cpf varchar(15) primary key not null, 
   cid_nome varchar (50) not null,
   cid_telefone varchar(12) not null,
   cid_numeroDaCasa int,
   cid_complemento varchar(15),
   cid_cep varchar (10) not null
);

select * from cidadao
*/
