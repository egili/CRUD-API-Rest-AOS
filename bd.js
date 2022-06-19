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
                '(cid_cpf  BIGINT UNSIGNED PRIMARY KEY NOT NULL, '+
                'cid_nome TINYTEXT NOT NULL, '+
                'cid_telefone BIGINT UNSIGNED NOT NULL, '+
                'cid_numeroDaCasa SMALLINT UNSIGNED, '+
                'cid_complemento TINYTEXT,'+
                'cid_cep INT UNSIGNED NOT NULL);';

    try {
        await conexao.query(sql);
            return true; 
    } catch (error) {
        return false; 
    }
}
module.exports = {getConexao, estrutureSe}