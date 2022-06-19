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

    if (conexao == undefined) 
        return null;

    //TODO Preciso criar tabela banco (ANA)

    const sql = 'CREATE TABLE IF NOT EXISTS livros '+
                '(codigo TINYINT UNSIGNED, '+
                'nome VARCHAR(60) NOT NULL, '+
                'preco FLOAT NOT NULL, PRIMARY KEY (codigo))';

    try {
        await conexao.query(sql);
            return true; 
    } catch (error) {
        return false; 
    }
}
module.exports = {getConexao, estrutureSe}