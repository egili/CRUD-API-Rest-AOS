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

    const sql = 'CREATE TABLE IF NOT EXISTS livros ' +
                    '(codigo TINYINT UNSIGNED, ' +
                    'nome VARCHAR(60) NOT NULL, ' +
                    'preco FLOAT NOT NULL, PRIMARY KEY (codigo))';

    try {
        await conexao.query(sql);
            return true; // retorna true se a quey foi executada
    } catch (error) {
        return false; // retorna false se a conexao nao foi executada
    }
}

module.exports = {getConexao, estrutureSe}