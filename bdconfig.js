// criando um modulo, ele cria um obj e permite que a gente utilize
module.exports = {
    //pegando das variaveis de ambiente e exportando
    host: process.env.NODE_MYSQL_SERVIDOR,
    user: process.env.NODE_MYSQL_USUARIO,
    password: process.env.NODE_MYSQL_SENHA,
    database: process.env.NODE_MYSQL_BD
};
/*
Para criar variavel de ambiente:
@echo off → evita escrever os comando na tela pela própria segurança dos usuário
set NODE_MYSQL_SERVIDOR=a_maquina_que_roda_mysql
set NODE_MYSQL_USUARIO=seu_usuario_no_mysql
set NODE_MYSQL_SENHA=sua_senha_no_mysql
set NODE_MYSQL_BD=seu_bd_no_mysql
@echo Variaveis de ambiente ajustadas com sucesso!
*/