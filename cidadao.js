class Cidadao {

    #CPF
    #nome
    #telefone
    #numeroCasa
    #complemento
    #CEP

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
        return this.#CEP
    }

    set CPF (cpf) {
        if (cpf === undefined || typeof cpf !== 'string' || cpf === "" )
            throw ('CPF Invalido!!');
        //TODO transformar para numero
        this.#CPF=cpf;
    }
    
    set nome (nome) {
        if (nome === undefined || typeof codigo !== 'string' || nome === "" )
            throw ('Nome Invalido!!');
       //TODO transformar para numero
       // for(int i = 0; i < nome.length(); i++)
       //{
       //   if(nome.charAt(i) < 65 || nome.charAt(i) > 90 && nome.charAt(i) < 97 || nome.charAt(i) > 122)
       //      throw new Exception("O nome nao pode ter caracteres especiais");
       //}
        this.#nome=nome;
    }

    set Telefone (numeroComDDD) {
        if (numeroComDDD === undefined || typeof numeroComDDD !== 'string' || numeroComDDD === "" || numeroComDDD.length() > 11 )
            throw ('Numero de telefone com DDD invalido!!');
        //TODO transformar para numero
        this.#telefone = numeroComDDD;
    }

    set NumeroCasa (numeroCasa) {
        if (numeroCasa === undefined || typeof numeroCasa !== 'number' || isNaN(numeroCasa) || numeroCasa !== parseInt(numeroCasa) || numeroCasa <= 0 )
            throw ('Numero de casa invalido!!');
        this.#numeroCasa = numeroCasa;
    }

    set Complemento (complemento) {
        this.#complemento = complemento;
        //TODO rever se não precisa validar nd
    }

    set CEP (cep) {
        if (cep === undefined || typeof cep !== 'string' || cep === "" || cep.length() > 8 )
            throw ('Numero CEP invalido!!');
        //TODO transformar para numero
        this.#CEP = cep;
    }
}

function novoCidadao(CPF, nome, telefone, numeroCasa, complemento, CEP) {
    return new Cidadao(CPF, nome, telefone, numeroCasa, complemento, CEP);
}

module.exports={novoCidadao};
