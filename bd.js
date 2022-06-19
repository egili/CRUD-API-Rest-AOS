async function getConexao() {
    if (global.conexao && global.conexao.state !== 'disconnected')
        return global.conexao;

    const mysql    = require("mysql2/promise");
    const bdConfig = require('./bdconfig.js');

    try {
        const conexao = await mysql.createConnection (bdConfig);
        global.conexao = conexao;
        return conexao;
    } catch (error) {
        return null;
    }
}

async function estrutureSe () {
    const conexao = await getConexao ();

    if (conexao==undefined) 
        return null;

    const sql = 'CREATE TABLE IF NOT EXISTS cidadao '+
                '(cid_cpf varchar(15) primary key not null, '+
                'cid_nome varchar (50) not null, '+
                'cid_telefone varchar(12) not null, '+
                'cid_numeroDaCasa int, '+
                'cid_complemento varchar(15),'+
                ' cid_cep varchar (10) not null)';

    try {
        await conexao.query(sql);
            return true; 
    } catch (error) {
        return false; 
    }
}
module.exports = {getConexao, estrutureSe}