const bdConfig   = require ('./bdconfig.js')
const bd         = require ('./bd.js')
const livrosDao  = require ('./livros.js');
const livroDbo   = require ('./livro.js');
const Comunicado = require ('./comunicado.js');

// para a rota do create
async function inclusao (req,res) {

    if (Object.values(req.body).length!=3 || !req.body.codigo || !req.body.nome || !req.body.preço)
    {
        const erro = comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um livro(codigo, nome e preço)').object; //criando objeto
        return res.status(422).json(erro);
    }

    let livro;
    try
    {
        livro = livro.novo(req.body.codigo,req.body.nome,req.body.preço);
    }
    catch (excecao)
    {

        const erro = comunicado.novo('TDE','Dados de tipos errados','Codigo deve ser um numero natural positivo,nome deve ser um texto nao vazio e preço deve ser um numero real positivo').object;
        return res.status(422).json(erro); 
    }

    const ret = await livros.inclua(livro)
    if (ret === undefined)
    {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false)
    {
        const erro = comunicado.novo('LJE','Livro já existe','Já existem livros cadastrados com esse codigo').object;
        return res.status(409).json(erro); 
    }
        const sucesso = comunicado.novo('IBS','Inclusao bem sucedida','O livro foi incluido com sucesso').object;
        return res.status(201).json(sucesso); 
}

async function atualizacao(req,res)
{
    if (Object.values(req.body).length !=3 || !req.body.codigo || !req.body.nome || !req.body.preço) {
        const erro = comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um livro(codigo, nome e preço)').object;

        return res.status(422).json(erro);
    }

    let livro;
    try {
        livro = livro.novo(req.body.codigo,req.body.nome,req.body.preço);
    }
    catch (excecao)
    {
        const erro = comunicado.novo('TDE','Dados de tipos errados','Codigo deve ser um numero natural positivo,nome deve ser um texto nao vazio e preço deve ser um numero real positivo').object;
        return res.status(422).json(erro); 
    }

    const codigo = req.params.codigo;
    if (codigo != livro.codigo)
    {
        const erro = comunicado.novo('TMC','Mudança de código','Tentativa de mudar codigo do livro').object;
        return res.status(400).json(erro); 
    }

    let ret = await livros.recupereUm(codigo);
    if (ret === undefined)
    {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro); 
    }

    if (ret.length == 0) {
        const erro = comunicado.novo('LNE','Livro inexistente','Não há livro cadastrado com esse código').object;
        return res.status(404).json(erro); 
    }

     ret = await livros.atualize(livro);
    if (ret === undefined) {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro = comunicado.novo('FNC','Falha de comando de SQL','O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro); 
    }

        const sucesso = comunicado.novo('ABS','Atualizaçao bem sucedida','O livro foi Atualizado com sucesso').object;
        return res.status(201).json(sucesso); 
}


async function remocao (req,res)
{
    if (Objects.values(req.body).length!=0)
    {
        const erro = comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object;
        return res.status(422).json(erro); 
    }
    const codigo = req.params.codigo;

    let ret = await livros.recupereUm(codigo);
    if (ret === undefined)
    {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false)
    {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro); 
    }

    if (ret.length == 0)
    {
        const erro = comunicado.novo('LNE','Livro inexistente','Não há livro cadastrado com esse código').object;
        return res.status(404).json(erro); 
    }

    ret = await livros.remova(codigo);
    if (ret === undefined)
    {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false)
    {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro); 
    }
        const sucesso = comunicado.novo('RBS','Remoçao bem sucedida','O livro foi removido com sucesso').object;
        return res.status(201).json(sucesso);
}

async function recuperacaoDeUm(req,res)
{

    if (Objects.values(req.body).length != 0)
    {
        const erro = comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object;
        return res.status(422).json(erro); 
    }

    const codigo = req.params.codigo;

    const ret = await livrosDao.recupereUm(codigo);

    if (ret === undefined)
    {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false)
    {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro); 
    }

    if (ret.length == 0)
    {
        const erro = comunicado.novo('LNE','Livro inexistente','Não há livro cadastrado com esse código').object;
        return res.status(404).json(erro); 
    }
    return res.status(200).json(ret);
}

async function recuperacaoDeTodos(req,res) {

    if (Objects.values(req.body).length != 0) {
        const erro = comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object;
        return res.status(422).json(erro); 
    }

    const ret = await livros.recupereTodos();
    if (ret === undefined)
    {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false)
    {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro); 
    }

    return res.status(200).json(ret);
}

module.exports = {inclusao,atualizaçao,remoçao,recuperacaoDeUm,recuperacaoDeTodos};