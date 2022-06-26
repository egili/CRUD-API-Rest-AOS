const bdConfig   = require ('./bdconfig.js');
const bd         = require ('./bd.js');
const Cidadaos   = require ('./cidadaos.js');
const Cidadao    = require ('./cidadao.js');
const comunicado = require ('./comunicado.js');

// para a rota do create
async function inclusao (req,res) {

    if (Object.values(req.body).length != 6 || !req.body.CPF || !req.body.nome || !req.body.telefone || !req.body.numeroCasa || !req.body.complemento || !req.body.CEP ) {
        const erro = comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 6 informacões esperadas de um cidadao(CPF, nome, telefone, numeroCasa, complemento e CEP.)').object;
        return res.status(422).json(erro);
    }
    let cidadao;

    try{
        cidadao = Cidadao.novoCidadao(req.body.CPF, req.body.nome, req.body.telefone, req.body.numeroCasa, req.body.complemento, req.body.CEP);
    }
    catch (excecao) {
        const erro = comunicado.novo('TDE','Dados de tipos errados','CPF deve ser um numero natural positivo, nome deve ser um texto nao vazio, telefone deve ter DDD e Numeros, numero da casa deve ser um natural positivo, complemento deve ser um texto não vazio e CEP deve ser numeros naturais positivos.').object;
        return res.status(422).json(erro); 
    }

    const ret = await Cidadaos.inclua(cidadao);

    if (ret === undefined) {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro = comunicado.novo('CJE','Cidadao já existe','Já existem cidadoes cadastrados com esse codigo').object;
        return res.status(409).json(erro); 
    }

    const sucesso = comunicado.novo('IBS','Inclusao bem sucedida','O cidadao foi incluido com sucesso').object;
    return res.status(201).json(sucesso); 
}

async function atualizacao(req,res) {

    if (Object.values(req.body).length != 6 || !req.body.CPF || !req.body.nome || !req.body.telefone || !req.body.numeroCasa || !req.body.complemento || !req.body.CEP) {
        const erro = comunicado.novo('DdI','Dados inesperados','Não foram fornecidos exatamente as 6 informacões esperadas de um cidadao(CPF, nome, telefone, numeroCasa, complemento e CEP.)').object;
        return res.status(422).json(erro);
    }

    let cidadao;

    try {
        cidadao = Cidadao.novoCidadao(req.body.CPF, req.body.nome, req.body.telefone, req.body.numeroCasa, req.body.complemento, req.body.CEP);
    } catch (excecao) {
        const erro = comunicado.novo('TDE','Dados de tipos errados','CPF deve ser um numero natural positivo, nome deve ser um texto nao vazio, telefone deve ter DDD e Numeros, numero da casa deve ser um natural positivo, complemento deve ser um texto não vazio e CEP deve ser numeros naturais positivos.').object;
        return res.status(422).json(erro); 
    }

    const CPF = req.params.CPF;

    if (CPF != cidadao.CPF) {
        const erro = comunicado.novo('TMC','Mudanca de CPF','Tentativa de mudar o CPF').object;
        return res.status(400).json(erro); 
    }

    let ret = await Cidadaos.recupereUm(CPF);

    if (ret === undefined) {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro); 
    }

    if (ret.length == 0) {
        const erro = comunicado.novo('CNE','Cidadao inexistente','Não há cidadao cadastrado com esse CPF').object;
        return res.status(404).json(erro); 
    }

    ret = await Cidadaos.atualize(cidadao);

    if (ret === undefined) {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro = comunicado.novo('FNC','Falha de comando de SQL','O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro); 
    }

    const sucesso = comunicado.novo('ABS','Atualizacao bem sucedida','O cidadao foi Atualizado com sucesso').object;
    return res.status(201).json(sucesso); 
}

async function remocao (req,res) {

    if (Object.values(req.body).length != 0) {
        const erro = comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object;
        return res.status(422).json(erro); 
    }

    const CPF = req.params.CPF;
    let ret = await Cidadaos.recupereUm(CPF);

    if (ret === undefined) {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro); 
    }

    if (ret.length == 0) {
        const erro = comunicado.novo('CNE','Cidadao inexistente','Não há cidadao cadastrado com esse código').object;
        return res.status(404).json(erro); 
    }

    ret = await Cidadaos.remova(CPF);

    if (ret === undefined) {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro); 
    }

    const sucesso = comunicado.novo('RBS','Remocao bem sucedida','O cidadao foi removido com sucesso').object;
    return res.status(201).json(sucesso);
}

async function recuperacaoDeUm(req,res) {

    if (Object.values(req.body).length != 0) {
        const erro = comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object;
        return res.status(422).json(erro); 
    }

    const CPF = req.params.CPF;
    const ret = await Cidadaos.recupereUm(CPF);

    if (ret === undefined) {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro); 
    }

    if (ret.length == 0) {
        const erro = comunicado.novo('CNE','Cidadao inexistente','Não há Cidadao cadastrado com esse CPF').object;
        return res.status(404).json(erro); 
    }

    return res.status(200).json(ret);
}

async function recuperacaoDeTodos(req,res) {

    if (Object.values(req.body).length != 0) {
        const erro = comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object;
        return res.status(422).json(erro); 
    }

    const ret = await Cidadaos.recupereTodos();

    if (ret === undefined) {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;
        return res.status(500).json(erro); 
    }

    if (ret === false) {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro); 
    }

    return res.status(200).json(ret);
}

module.exports = {inclusao,atualizacao,remocao,recuperacaoDeUm,recuperacaoDeTodos};