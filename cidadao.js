class Cidadao {

    #CPF;
    #nome;
    #telefone;
    #numeroCasa;
    #complemento;
    #CEP;

    constructor(cpf, nome, numeroComDDD, numeroCasa, complemento, cep) {
        this.CPF         = cpf;
        this.nome        = nome;
        this.telefone    = numeroComDDD;
        this.numeroCasa  = numeroCasa;
        this.complemento = complemento;
        this.CEP         = cep;
    }

    get CPF() {
        return this.#CPF;
    }
    get Nome() {
        return this.#nome;
    }
    get Telefone() {
        return this.#telefone;
    }
    get NumeroCasa() {
        return this.#numeroCasa;
    }
    get Complemento() {
        return this.#complemento
    }
    get CEP() {
        return this.#CEP;
    }

    set CPF (cpf) {
        if (cpf === undefined || typeof cpf !== 'number' || isNaN(cpf) || cpf !== parseInt(cpf) || cpf <= 0 || cpf.length() > 11 )
            throw ('CPF Invalido!!');

        this.#CPF=cpf;
    }

    
    set nome (nome) {
        if (nome === undefined || typeof nome !== 'string' || nome === "" )
            throw ('Nome Invalido!!');

        this.#nome=nome;
    }

    set Telefone (numeroComDDD) {
        if (numeroComDDD === undefined || typeof numeroComDDD !== 'number' || isNaN(numeroComDDD) || numeroComDDD !== parseInt(numeroComDDD) ||  numeroComDDD.length() > 11  || numeroComDDD <= 0)
            throw ('Numero de telefone com DDD invalido!!');

        this.#telefone = numeroComDDD;
    }

    set NumeroCasa (numeroCasa) {
        if (numeroCasa === undefined || typeof numeroCasa !== 'number' || isNaN(numeroCasa) || numeroCasa !== parseInt(numeroCasa) || numeroCasa <= 0 )
            throw ('Numero de casa invalido!!');

        this.#numeroCasa = numeroCasa;
    }

    set Complemento (complemento) {
        if ( typeof complemento !== 'string' )
            throw ('Complemento Invalido!!');
        // NOTE: Complemento nao eh not null no bd, ent verifica somente se é uma string
        this.#complemento = complemento;
    }

    set CEP (cep) {
        if (cep === undefined || typeof cep !== 'number' || isNaN(cep) || cep !== parseInt(cep) || cep <= 0 ||  cep.length() > 8 )
            throw ('Numero CEP invalido!!');

        this.#CEP = cep;
    }
}

function novoCidadao(CPF, nome, telefone, numeroCasa, complemento, CEP) {
    return new Cidadao(CPF, nome, telefone, numeroCasa, complemento, CEP);
}

module.exports={novoCidadao};
