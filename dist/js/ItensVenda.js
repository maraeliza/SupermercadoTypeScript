export default class ItensVenda {
    constructor(id, produto, quantidade) {
        this._id = 0;
        this._id = id;
        this._produto = produto;
        this._quantidade = quantidade;
    }
    getValue(coluna) {
        switch (coluna) {
            case "id":
                return this.id.toString();
            case "produto":
                return this.produto.nome;
            case "quantidade":
                return this.quantidade.toString();
        }
    }
    get id() {
        return this._id;
    }
    get produto() {
        return this._produto;
    }
    get quantidade() {
        return this._quantidade;
    }
    set id(valor) {
        this._id = valor;
    }
    set produto(valor) {
        this._produto = valor;
    }
    set quantidade(valor) {
        if (valor > 0) {
            this._quantidade = valor;
        }
        else {
            console.log("A quantidade deve ser maior que zero.");
        }
    }
}
