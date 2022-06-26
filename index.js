const bd       = require('./bd.js');
const rotas    = require('./rotas.js');
var cors = require('cors')

function middleWareGlobal(req, res, next) {

    console.time('Duracao'); 
    console.log(`Iniciou o processamento da requisicao ${req.metod} em ${req.url}`);
    
    next(); 
    
    console.log(`Iniciou o processamento da requisicao ${req.metod} em ${req.url}`);
    console.timeEnd('Duracao'); 
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

    app.use(express.json()); 
    app.use(middleWareGlobal); 

    // Evitar erro do CORS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.post('/cidadaos'           , rotas.inclusao);
    app.put('/cidadaos/:CPF'       , rotas.atualizacao);
    app.delete('/cidadaos/:CPF'    , rotas.remocao);
    app.get('/cidadaos/:CPF'       , rotas.recuperacaoDeUm);
    app.get('/cidadaos'            , rotas.recuperacaoDeTodos);

    console.log('Servidor rodando na porta 3000...');
    app.listen(3000);
}
ativacaoDoServidor();