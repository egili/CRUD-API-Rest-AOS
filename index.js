const express=require('express');
const bd =require('./bd.js');
const rotas = require('./rotas.js');

function middleWareGlobal(req,res,next) {

    console.time('Duraçao'); // Marca o inicio da requisiçao
    console.log('Iniciou o processamento da requisiçao'+req.metod+'em'+req.url);// indica onde aconteceu
    
    next(); // funçao que chama o processamento, propiamente dito da requisiçao

    console.log('Terminou o processamento da requisiçao'+req.metod+'em'+req.url);// indica onde aconteceu
    console.timeEnd('Duraçao'); // Informa duraçao do processamento da requisiçao
}

async function ativaçaoDoServidor() {
    
    const ret= await bd.estruturese(); // crio  a tabela la no bd
    //Trato os erros 

    if (ret===null) {
        console.log('Não foi possivel estabelecer conexao com o BD');
        process.exit(1); // encerro a aplicaçao
    }

    if (ret===false) {
        console.log('Não foi possivel estruturar o BD!');
        process.exit(1); // encerro a aplicaçao
    }

    const express=require('express');
    const app= express(); // criei a minha aplicaçao roteada

    app.use(express.json()); // faz com que o express consiga processar json
    app.use(middleWareGlobal); // cria um middleare global

    //Criando minhas rotas
    app.post('/livros',rotas.inclusao);
    app.put('/livros/:codigo',rotas.atualizaçao);
    app.delete('/livros/:codigo',rotas.remoçao);
    app.get('/livros/:codigo',rotas.recuperacaoDeUm);
    app.get('/livros',rotas.recupereTodos);

    console.log('Servidor Rodando na porta 3000');
    app.listen(3000); // 'escutando na porta 3000'
}
ativaçaoDoServidor();