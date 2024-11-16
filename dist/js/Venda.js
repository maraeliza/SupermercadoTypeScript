export default class Vendas {
    constructor(id, cliente, modoPagamento) {
        this._id = 0;
        this._itensVenda = [];
        this._id = id;
        this._cliente = cliente;
        this._modoPagamento = modoPagamento;
    }
    getValue(coluna) {
        switch (coluna) {
            case "id":
                return this.id.toString();
            case "cliente":
                return this.cliente.nome;
            case "Modo de Pagamento":
                return this.modoPagamento;
            case "Itens Vendidos":
                return this.itensVenda.map(item => `${item.produto.nome} ${item.quantidade}x`).join(", ");
        }
    }
    get id() {
        return this._id;
    }
    get cliente() {
        return this._cliente;
    }
    get itensVenda() {
        return this._itensVenda;
    }
    get modoPagamento() {
        return this._modoPagamento;
    }
    set id(valor) {
        this._id = valor;
    }
    set cliente(valor) {
        this._cliente = valor;
    }
    set modoPagamento(valor) {
        this._modoPagamento = valor;
    }
    addItemVenda(item) {
        this._itensVenda.push(item);
    }
    set itensVenda(valor) {
        this._itensVenda = valor;
    }
}
