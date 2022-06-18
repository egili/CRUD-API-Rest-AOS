const bdConfig   = require ('./bdconfig.js');
const bd         = require ('./bd.js');
const livrosDao  = require ('./livrosDao.js');
const livroDbo   = require ('./livroDbo.js');
const comunicado = require  ('./comunicado.js');

// para a rota do create
async function inclusao(req, res) {

    //o corpo da req foi menor que 3      | nao tiver codigo|nao tiver nome|nao tiver preço
    if (Object.values(req.body).length!=3 || !req.body.codigo|| !req.body.nome|| !req.body.preço) {
        
        const erro = comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um livro(codigo, nome e preço)').object; //criando objeto
        // Qualquer código 400 e alguma coisa é erro do cliente
        return res.status(422).json(erro); //transformo o obj erro em json
    }

    let livro;
    try {
        livro = livroDbo.novo(req.body.codigo,req.body.nome,req.body.preço);
    } catch (excecao) {
        const erro = comunicado.novo('TDE','Dados de tipos errados','Codigo deve ser um numero natural positivo,nome deve ser um texto nao vazio e preço deve ser um numero real positivo').object;
        return res.status(422).json(erro); 
    }

    const ret = await livrosDao.inclua(livro); //Incluindo o livro

    //Tratando erros do Inclua
    if (ret === undefined) {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        // 500 erro de servidor
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro = comunicado.novo('LJE','Livro já existe','Já existem livros cadastrados com esse codigo').object;
        return res.status(409).json(erro); 
    }

    //if (ret === true){
    // Se chegou até aqui significa que a inclusao ocorreu com sucesso
        const sucesso = comunicado.novo('IBS','Inclusao bem sucedida','O livro foi incluido com sucesso').object;
        return res.status(201).json(sucesso); 
    //}
}

//para a rota UPDATE
async function atualizacao(req, res) {

    if (Object.values(req.body).length !=3 || !req.body.codigo || !req.body.nome || !req.body.preço) {
        const erro = Comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um livro(codigo, nome e preço)').object;
        return res.status(422).json(erro);
    }

    let livro;
    try {
        livro = livro.novo(req.body.codigo,req.body.nome,req.body.preço);
    } catch (error) {
        const erro=comunicado.novo('TDE','Dados de tipos errados','Codigo deve ser um numero natural positivo,nome deve ser um texto nao vazio e preço deve ser um numero real positivo').object; 
        return res.status(422).json(erro); 
    }

    const codigo=req.params.codigo; // pegando o codigo
    // testanto se foi tentado alterar o codigo do livro
    if (codigo!=livro.codigo) {
        const erro=comunicado.novo('TMC','Mudança de código','Tentativa de mudar codigo do livro').object; 
        return res.status(400).json(erro); 
    }

    let ret= await livrosDao.recupereUm(codigo); //Testando se o livro existe
    //Tratando erros do recupereUm
    if (ret === null) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro=comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
    }

    if (ret.length == 0) {
        const erro=comunicado.novo('LNE','Livro inexistente','Não há livro cadastrado com esse código').object; 
        return res.status(404).json(erro); 
    }

     ret = await livrosDao.atualize(livro); // Atualizando o livro
    // Tratando erros do Atualize
    if (ret === null) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro=comunicado.novo('FNC','Falha de comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
    }

    //Se chegou ate aqui significa que a atualizaçao ocorreu com sucesso

        const sucesso=comunicado.novo('ABS','Atualizaçao bem sucedida','O livro foi Atualizado com sucesso').object; 
        return res.status(201).json(sucesso); 
}


async function remoçao (req,res) {
    if (Objects.values(req.body).length!=0) {
        const erro=comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
    }
    const codigo=req.params.codigo; // recupero o codigo
    let ret= await livrosDao.recupereUm(codigo); // faço isso para checar se o livro existe
    //Tratando erros do recupereUm
    if (ret === null) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro=comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
    }

    if (ret.length == 0) {
        const erro=comunicado.novo('LNE','Livro inexistente','Não há livro cadastrado com esse código').object; 
        return res.status(404).json(erro); 
    }

    // removendo o livro
    ret = await livrosDao.remova(codigo);

    //Tratando erros do remova
    if (ret === null) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro=comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
    }

    // se chegou aqui é porque deu certo
        const sucesso=comunicado.novo('RBS','Remoçao bem sucedida','O livro foi removido com sucesso').object; 
        return res.status(201).json(sucesso);
}

async function recuperacaoDeUm(req,res) {

    if (Objects.values(req.body).length != 0) {
        const erro=comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
    }

    const codigo = req.params.codigo; // pego o codigo

    const ret = await livrosDao.recupereUm(codigo); // utilizo o recupera um

    //Trato os erros do recupera um
    if (ret === null) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro=comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
    }

    if (ret.length == 0) {
        const erro=comunicado.novo('LNE','Livro inexistente','Não há livro cadastrado com esse código').object; 
        return res.status(404).json(erro); 
    }

    //Se chegou ate aqui deu tudo certo, entao retorno o meu livro
    return res.status(200).json(ret);
}

async function recupereTodos(req,res) {

    if (Objects.values(req.body).length != 0) {
        const erro=comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
    }

    const ret = await livrosDao.recupereTodos(); // recuperando 

    //Tratando erros
    if (ret === null) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro=comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
    }

    // se chegou até aqui ocorreu tudo certo
    return res.status(200).json(ret); // retorno ret
}

module.exports={inclusao,atualizaçao,remoçao,recuperacaoDeUm,recupereTodos};