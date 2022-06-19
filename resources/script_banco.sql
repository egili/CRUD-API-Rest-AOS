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
