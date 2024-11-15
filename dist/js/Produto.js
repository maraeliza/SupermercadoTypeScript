export default class Produto {
    constructor(id, nome, preco, quantidade) {
        this._id = 0;
        this._id = id;
        this._nome = nome;
        this._preco = preco;
        this._quantidade = quantidade;
    }
    getValue(coluna) {
        switch (coluna) {
            case "id":
                return this.id.toString();
            case "nome":
                return this.nome;
            case "preço":
                return this.preco.toString();
            case "quantidade":
                return this.quantidade.toString();
        }
    }
    get id() {
        return this._id;
    }
    get preco() {
        return this._preco;
    }
    get quantidade() {
        return this._quantidade;
    }
    get nome() {
        return this._nome;
    }
    set id(valor) {
        this._id = valor;
    }
    set preco(valor) {
        if (valor > 0) {
            this._preco = valor;
        }
        else {
            console.log("O preço deve ser um valor positivo.");
        }
    }
    set quantidade(valor) {
        if (valor >= 0) {
            this._quantidade = valor;
        }
        else {
            console.log("A quantidade de estoque não pode ser negativa.");
        }
    }
    set nome(valor) {
        if (valor.trim() !== "") {
            this._nome = valor;
        }
        else {
            console.log("O nome não pode ser vazio.");
        }
    }
}
