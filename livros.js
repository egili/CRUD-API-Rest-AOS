const bd = require ('./bd');

async function inclua(livro) {
    const conexao= await bd.getConexao();

    if(conexao == null) 
        return null;

    try {
        const sql   = 'INSERT INTO livros (codigo,nome,preço) VALUES (?,?,?)';
        const dados = [livro.codigo, livro.nome, livro.preço];
        await conexao.query (sql, dados);
        return true;
    } catch (excecao) {
        return false;
    }
}

async function atualize (livro) {
    const conexao = await bd.getConexao();

    if(conexao==null) 
        return null;

    try {
        const sql   = 'UPDATE livros SET nome=?,preço=? WHERE codigo=?';
        const dados = [livro.nome,livro.preço,livro.codigo];
        await conexao.query (sql,dados);
        return true;
    } catch (excecao) {
        return false;
    }
}

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
}

async function recupereUm (codigo) {
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
}

async function recupereTodos() {
    const conexao= await bd.getConexao();

    if(conexao==null) 
        return null;

    try {
        const sql      = 'SELECT * FROM livros';
        const [linhas] = await conexao.query (sql);
        return linhas;
    } catch (excecao) {
        return false;
    }
}
module.exports = {inclua, atualize, remova, recupereUm, recupereTodos};