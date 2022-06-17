async function getConexao() {  

    //verifico se a conexao ja foi estabelecida, caso ja tenha sido apenas retorno ela
    if (global.conexao && global.conexao.state !== 'disconnected') {
        return global.conexao;
    }

    const mysql2= require('mysql2/promise'); 
    const bdConfig= require('./bdconfig.js'); 

    try {
        const conexao = await mysql2.createConnection(bdConfig); 
        global.conexao = conexao;
        return conexao;
        
    } catch (error) {
        return null; // retorna null caso nao seja possivel criar a conexao
    }
}

async function estruturese() {
    const conexao= await getConexao(); 

    if (conexao===undefined) {
        return null; // retorna null caso a conexao seja nula
    }
    const sql = 'CREATE TABLE IF NOT EXISTS livros (codigo TINYINT UNSIGNED, nome VARCHAR(60) NOT NULL, preço FLOAT NOT NULL, PRIMARY KEY (codigo))';
    try {
        await conexao.query(sql);
            return true; // retorna true se a quey foi executada
    } catch (error) {
        return false; // retorna false se a conexao nao foi executada
    }
}

module.exports={getConexao,estruturese} 