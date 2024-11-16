export default class ItemVenda {
    constructor(id, produto, quantidade, venda, form) {
        this._id = 0;
        this._id = id;
        this._produto = produto;
        this._quantidade = quantidade;
        this._venda = venda;
        this._form = form;
    }
    getValue(coluna) {
        switch (coluna) {
            case "id":
                return this.id.toString();
            case "id venda":
                return this.venda.id.toString();
            case "produto":
                return this.produto.nome;
            case "quantidade":
                return this.quantidade.toString();
        }
    }
    get id() {
        return this._id;
    }
    getProdutoNome() {
        return this._produto.nome;
    }
    getVendaID() {
        return this._venda.id.toString();
    }
    get produto() {
        return this._produto;
    }
    get form() {
        return this._form;
    }
    get quantidade() {
        return this._quantidade;
    }
    get venda() {
        return this._venda;
    }
    set id(valor) {
        this._id = valor;
    }
    set produto(valor) {
        this._produto = valor;
    }
    set cliente(valor) {
        this._cliente = valor;
    }
    set venda(valor) {
        this._venda = valor;
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
