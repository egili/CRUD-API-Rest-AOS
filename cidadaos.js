const bd = require ('./bd');

async function inclua(cidadao) {
    const conexao= await bd.getConexao();

    if(conexao == null) 
        return null;

    try {
        const sql   = 'INSERT INTO cidadao (cid_cpf, cid_nome, cid_telefone, cid_numeroDaCasa, cid_complemento, cid_cep ) VALUES (?,?,?,?,?,?)';
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
        const sql   = 'UPDATE cidadao SET cid_nome=?, cid_telefone=?, cid_numeroDaCasa=?, cid_complemento=?, cid_cep=?  WHERE cid_cpf=?';
        const dados = [cidadao.nome, cidadao.telefone, cidadao.numeroCasa, cidadao.complemento, cidadao.CEP,cidadao.CPF];
        await conexao.query (sql,dados);
        return true;
    } catch (excecao) {
        return false;
    }
}
//ISSUE: Aqui devemos mesmo passar o CPF? No codigo antigo o professor passava o "Codigo" que seria primary key 
/*
async function remova(codigo) {
    const conexao = await bd.getConexao();

    if(conexao==null) 
        return null;

    try {
        const sql    = 'DELETE FROM livros WHERE codigo=?';
        const dados  = [codigo];
        await conexao.query (sql,dados);
        return true;
    } catch (excecao) {
        return false;
    }
*/
async function remova(CPF) {
    const conexao = await bd.getConexao();

    if(conexao==null) 
        return null;

    try {
        const sql    = 'DELETE FROM cidadao WHERE cid_cpf=?';
        const dados  = [CPF];
        await conexao.query (sql,dados);
        return true;
    } catch (excecao) {
        return false;
    }
}

//ISSUE: Aqui devemos mesmo passar o CPF? No codigo antigo o professor passava o "Codigo" que seria primary key 
/*async function recupereUm (codigo) {
    const conexao = await bd.getConexao();

    if(conexao==null) 
        return null;

    try {
        const sql      = 'SELECT * FROM livros WHERE codigo=?';
        const dados    = [codigo];
        const [linhas] = await conexao.query (sql,dados);
        return linhas;
    } catch (excecao) {
        return false;
    }
}*/

async function recupereUm (CPF) {
    const conexao = await bd.getConexao();

    if(conexao==null) 
        return null;

    try {
        const sql      = 'SELECT * FROM cidadao WHERE cid_cpf=?';
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