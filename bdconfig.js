// criando um modulo, ele cria um obj e permite que a gente utilize
module.exports={
    //pegando das variaveis de ambiente e exportando
    host: process.env.NODE_MYSQL_SERVIDOR,
    user: process.env.NODE_MYSQL_USUARIO,
    password: process.env.NODE_MYSQL_SENHA,
    database: process.env.NODE_MYSQL_BD
};