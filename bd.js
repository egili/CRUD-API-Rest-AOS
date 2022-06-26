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

    const sql = 'CREATE TABLE IF NOT EXISTS cidadao '+
                '(CPF  BIGINT UNSIGNED PRIMARY KEY NOT NULL, '+
                'nome TINYTEXT NOT NULL, '+
                'telefone BIGINT UNSIGNED NOT NULL, '+
                'numeroCasa SMALLINT UNSIGNED, '+
                'complemento TINYTEXT,'+
                'CEP INT UNSIGNED NOT NULL);';

    try {
        await conexao.query(sql);
            return true; 
    } catch (error) {
        return false; 
    }
}
module.exports = {getConexao, estrutureSe}