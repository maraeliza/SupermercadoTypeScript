import Form from "./Form.js";
import Produto from "./Produto.js";
export default class ProdutoForm extends Form {
    constructor() {
        super();
        this.Lista = [];
        console.log(this.Total);
        this.Total++;
        this.Lista = [];
        this.addItensInicial();
    }
    addItemLista(produto) {
        this.Total++;
        this.Lista.push(produto);
    }
    addItensInicial() {
        this.addItemLista(new Produto(this.Total, "Feijão Carioca", 25.49, 120));
        this.addItemLista(new Produto(this.Total, "Açúcar União", 15.99, 200));
        this.addItemLista(new Produto(this.Total, "Macarrão Adria", 8.49, 150));
        this.addItemLista(new Produto(this.Total, "Óleo Liza", 10.99, 80));
    }
    create() {
        var nomeElemento = document.getElementById("nome");
        var precoElemento = document.getElementById("preço");
        var quantidadeElemento = (document.getElementById("quantidade"));
        var nome = nomeElemento.value;
        if (nome.length > 0) {
            var preco = parseFloat(precoElemento.value);
            if (typeof preco == "number" && preco > 0) {
                var quantidade = parseInt(quantidadeElemento.value);
                if (typeof quantidade == "number" && quantidade > 0) {
                    var newP = new Produto(this.Total, nome, preco, quantidade);
                    this.addItemLista(newP);
                    return true;
                }
            }
        }
        return false;
    }
    update(id) {
        var alterado = false;
        var nomeElemento = document.getElementById("nome");
        var precoElemento = document.getElementById("preço");
        var quantidadeElemento = (document.getElementById("quantidade"));
        if (typeof id == "number" && id != 0) {
            var produto = this.getItemByID(id);
            var nome = nomeElemento.value;
            if (nome.length > 0 && produto.nome != nome) {
                produto.nome = nome;
                alterado = true;
            }
            var preco = parseFloat(precoElemento.value);
            if (typeof preco == "number" && preco > 0 && produto.preco != preco) {
                produto.preco = preco;
                alterado = true;
            }
            var quantidade = parseInt(quantidadeElemento.value);
            if (typeof quantidade == "number" &&
                quantidade > 0 &&
                produto.quantidade != quantidade) {
                produto.quantidade = quantidade;
                alterado = true;
            }
        }
        return alterado;
    }
    getCampos() {
        return ["id", "nome", "preço", "quantidade"];
    }
}
