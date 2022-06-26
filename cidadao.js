class Cidadao {

    #CPF;
    #nome;
    #telefone;
    #numeroCasa;
    #complemento;
    #CEP;

    constructor(CPF, nome, telefone, numeroCasa, complemento, CEP) {
        this.CPF         = CPF;
        this.nome        = nome;
        this.telefone    = telefone;
        this.numeroCasa  = numeroCasa;
        this.complemento = complemento;
        this.CEP         = CEP;
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

    set CPF (CPF) {
        if (CPF === undefined || typeof CPF !== 'number' || isNaN(CPF) || CPF !== parseInt(CPF) || CPF <= 0 || CPF.length() > 11 )
            throw ('CPF Invalido!!');

        this.#CPF = CPF;
    }

    
    set Nome (nome) {
        if (nome === undefined || typeof nome !== 'string' || nome === "" )
            throw ('Nome Invalido!!');

        this.#nome = nome;
    }

    set Telefone (telefone) {
        if (telefone === undefined || typeof telefone !== 'number' || isNaN(telefone) || telefone !== parseInt(telefone) ||  telefone.length() > 11  || telefone <= 0)
            throw ('Numero de telefone com DDD invalido!!');

        this.#telefone = telefone;
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

    set CEP (CEP) {
        if (CEP === undefined || typeof CEP !== 'number' || isNaN(CEP) || CEP !== parseInt(CEP) || CEP <= 0 ||  CEP.length() > 8 )
            throw ('Numero CEP invalido!!');

        this.#CEP = CEP;
    }
}

function novoCidadao(CPF, nome, telefone, numeroCasa, complemento, CEP) {
    return new Cidadao(CPF, nome, telefone, numeroCasa, complemento, CEP);
}

module.exports={novoCidadao};
