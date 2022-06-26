const bd = require ('./bd');

async function inclua(cidadao) {
    const conexao= await bd.getConexao();

    if(conexao == null) 
        return null;
    try {
        const sql   = 'INSERT INTO cidadao (CPF, nome, telefone, numeroCasa, complemento, CEP ) VALUES (?,?,?,?,?,?)';
        const dados = [cidadao.CPF, cidadao.nome, cidadao.telefone, cidadao.numeroCasa, cidadao.complemento, cidadao.CEP];
        await conexao.query (sql, dados);
        return true;
    } catch (excecao) {
        return false;
    }
}

async function atualize (cidadao) {
    const conexao = await bd.getConexao();

    if(conexao==null) 
        return null;

    try {
        const sql   = 'UPDATE cidadao SET nome=?, telefone=?, numeroCasa=?, complemento=?, CEP=?  WHERE CPF=?';
        const dados = [cidadao.nome, cidadao.telefone, cidadao.numeroCasa, cidadao.complemento, cidadao.CEP,cidadao.CPF];
        await conexao.query (sql,dados);
        return true;
    } catch (excecao) {
        return false;
    }
}

async function remova(CPF) {
    const conexao = await bd.getConexao();

    if(conexao==null) 
        return null;

    try {
        const sql    = 'DELETE FROM cidadao WHERE CPF=?';
        const dados  = [CPF];
        await conexao.query (sql,dados);
        return true;
    } catch (excecao) {
        return false;
    }
}

async function recupereUm (CPF) {
    const conexao = await bd.getConexao();

    if(conexao==null) 
        return null;

    try {
        const sql      = 'SELECT * FROM cidadao WHERE CPF=?';
        const dados    = [CPF];
        const [linhas] = await conexao.query (sql,dados);
        return linhas;
    } catch (excecao) {
        return false;
    }
}

async function recupereTodos() {
    const conexao= await bd.getConexao();

    if(conexao==null) 
        return null;

    try {
        const sql      = 'SELECT * FROM cidadao';
        const [linhas] = await conexao.query (sql);
        return linhas;
    } catch (excecao) {
        return false;
    }
}
module.exports = {inclua, atualize, remova, recupereUm, recupereTodos};