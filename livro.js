class Livro{
    //Criando atributos privativps
    #codigo
    #nome
    #preço

    constructor(codigo,nome,preço) {
        // esse construtor esta chamando os meus setters
        this.codigo=codigo;
        this.nome=nome;
        this.preço=preço;
    }

    //Criando getters
    get codigo() {
        return this.#codigo;
    }
    get nome() {
        return this.#nome;
    }
    get preço() {
        return this.#preço;
    }

    //Criando setters

    set codigo (codigo) {
    //Verifico se é indefinido |  se nao é um number         | se ele é nan   | se ele é um numero real   | se é menor que zero
        if (codigo === undefined || typeof codigo !== 'number' || isNaN(codigo) || codigo!==parseInt(codigo)|| codigo <= 0) {
            throw ('Codigo Invalido!!');
        }
        this.#codigo=codigo;
    }

    set nome (nome) {
        if (nome === undefined || typeof codigo !== 'string' || nome === '' ){
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
}

function novo(codigo,nome,preço) {
    return new Livro(codigo,nome,preço);
}

module.exports={novo};