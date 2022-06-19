const express  = require('express');
const bd       = require('./bd.js');
const rotas    = require('./rotas.js');

function middleWareGlobal(req, res, next) {

    console.time('Duracao'); // Marca o inicio da requisiçao
    console.log(`Iniciou o processamento da requisicao ${req.metod} em ${req.url}`);// indica onde aconteceu
    
    next(); // funçao que chama o processamento, propiamente dito da requisiçao
    
    console.log(`Iniciou o processamento da requisicao ${req.metod} em ${req.url}`);// indica onde aconteceu
    console.timeEnd('Duracao'); // Informa duraçao do processamento da requisiçao
}

async function ativacaoDoServidor() {
    
    const rec = await bd.estrutureSe();

    if (rec === undefined) {
        console.log('Não foi possivel estabelecer conexao com o BD!');
        process.exit(1);
    }

    if (rec === false) {
        console.log('Não foi possivel estruturar o BD!');
        process.exit(1);
    }

    //Passar esses const lá para cima
    const express = require('express');
    const app     = express();

    app.use(express.json()); // faz com que o express consiga processar json
    app.use(middleWareGlobal); // cria um middleare global

    //Criando minhas rotas
    app.post('/livros'           ,rotas.inclusao);
    app.put('/livros/:codigo'    ,rotas.atualizacao);
    app.delete('/livros/:codigo' ,rotas.remocao);
    app.get('/livros/:codigo'    ,rotas.recuperacaoDeUm);
    app.get('/livros'            ,rotas.recuperacaoDeTodos);

    console.log('Servidor rodando na porta 3000...');
    app.listen(3000); // 'escutando na porta 3000'
}
ativacaoDoServidor();