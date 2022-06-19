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
   cid_cpf  BIGINT UNSIGNED PRIMARY KEY NOT NULL,
   cid_nome TINYTEXT NOT NULL,
   cid_telefone BIGINT UNSIGNED NOT NULL,
   cid_numeroDaCasa SMALLINT UNSIGNED,
   cid_complemento TINYTEXT,
   cid_cep INT UNSIGNED NOT NULL
);

select * from cidadao
*/
