class Cidadao{
    //Criando atributos privativps
    #CPF
    #nome
    #telefone
    #numeroCasa
    #complemento
    #CEP
    
    //#codigo
    //#nome
    //#preço

    constructor(cpf, nome, numeroComDDD, numeroCasa, complemento, cep) {
        // esse construtor esta chamando os meus setters
        this.CPF         = cpf;
        this.nome        = nome;
        this.telefone    = numeroComDDD;
        this.numeroCasa  = numeroCasa;
        this.complemento = complemento;
        this.CEP         = cep;
    }

    /*
    constructor(codigo,nome,preço) {
        // esse construtor esta chamando os meus setters
        this.codigo=codigo;
        this.nome=nome;
        this.preço=preço;
    }
    */

    //Criando getters
    get CPF() {
        return this.#CPF;
    }
    get Nome() {
        return this.#nome;
    }
    get Telefone() {
        return this.#telefone;
    }
    get NumeroCasa(){
        return this.#numeroCasa;
    }
    get Complemento(){
        return this.#complemento
    }
    get CEP(){
        return this.#CEP
    }
    
    /*
    get codigo() {
        return this.#codigo;
    }
    get nome() {
        return this.#nome;
    }
    get preço() {
        return this.#preço;
    }
    */


    //Criando setters

    set CPF (cpf) {
        if (cpf === undefined || typeof cpf !== 'string' || cpf === "" )
                throw ('CPF Invalido!!');

        //for(int i = 0; i < CPF.length(); i++)
        //{
        //  if(CPF.charAt(i) < 48 || CPF.charAt(i) > 57)
        //     throw ('O CPF nao pode ter caracateres especiais');
        //}
            this.#CPF=cpf;
    }
    
    set nome (nome) {
        if (nome === undefined || typeof codigo !== 'string' || nome === "" ){
                throw ('Nome Invalido!!');
        }

       // for(int i = 0; i < nome.length(); i++)
       //{
       //   if(nome.charAt(i) < 65 || nome.charAt(i) > 90 && nome.charAt(i) < 97 || nome.charAt(i) > 122)
       //      throw new Exception("O nome nao pode ter caracteres especiais");
       //}
            this.#nome=nome;
    }

    set Telefone (numeroComDDD) {
        if (numeroComDDD === undefined || typeof numeroComDDD !== 'string' || numeroComDDD === "" || numeroComDDD.length()>11 ){
                throw ('Numero de telefone com DDD invalido!!');
        }

        this.#telefone = numeroComDDD;
    }

    set NumeroCasa (numeroCasa) {
        if (numeroCasa === undefined || typeof numeroCasa !== 'number' || isNaN(numeroCasa) || numeroCasa!==parseInt(numeroCasa) || numeroCasa <= 0 ){
                throw ('Numero de casa invalido!!');
        }

        this.#numeroCasa = numeroCasa;
    }

    set Complemento (complemento) {
        this.#complemento = complemento;
    }

    set CEP (cep) {
        if (cep === undefined || typeof cep !== 'string' || cep === "" || cep.length()>8 ){
                throw ('Numero CEP invalido!!');
        }

        this.#CEP = cep;
    }

    /*
    set codigo (codigo) {
    //Verifico se é indefinido |  se nao é um number         | se ele é nan   | se ele é um numero real   | se é menor que zero
        if (codigo === undefined || typeof codigo !== 'number' || isNaN(codigo) || codigo!==parseInt(codigo)|| codigo <= 0) {
            throw ('Codigo Invalido!!');
        }
        this.#codigo=codigo;
    }

    set nome (nome) {
        if (nome === undefined || typeof codigo !== 'string' || nome === "" ){
            throw ('Nome Invalido!!');
        }
        this.#nome=nome;
    }

    set preço (preço) {
        if (preço === undefined || typeof preço !== 'number' || isNaN(preço) || preço <= 0) {
            throw ('Preço Invalido!!');
        }
        this.#preço= preço;
    }
    */
}

function novo(CPF,nome,telefone, numeroCasa, complemento, CEP) {
    return new Cidadao(CPF,nome,telefone, numeroCasa, complemento, CEP);
}
/*
function novo(codigo,nome,preço) {
    return new Livro(codigo,nome,preço);
}
*/
module.exports={novo};
