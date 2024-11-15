import Form from "./Form.js";
import Produto from "./Produto.js";

export default class ProdutoForm  extends Form{

  Lista: Produto[] = [];

  constructor() {
    super();
    this.Lista = [] ;
    this.Lista.push(new Produto(1, "Arroz Vasconcelos", 30.99, 90));
    this.Lista.push(new Produto(2, "Feijão Carioca", 25.49, 120));
    this.Lista.push(new Produto(3, "Açúcar União", 15.99, 200));
    this.Lista.push(new Produto(4, "Macarrão Adria", 8.49, 150));
    this.Lista.push(new Produto(5, "Óleo Liza", 10.99, 80));
  }

  create(): boolean {
    console.log("aa");
    var idElemento = <HTMLInputElement>document.getElementById("id");
    var nomeElemento = <HTMLInputElement>document.getElementById("nome");
    var precoElemento = <HTMLInputElement>document.getElementById("preço");
    var quantidadeElemento = <HTMLInputElement>(
      document.getElementById("quantidade")
    );

    var id = parseInt(idElemento.value);
    if (typeof id == "number" && id != 0) {
      var nome = nomeElemento.value;
      if (nome.length > 0) {
        var preco = parseFloat(precoElemento.value);
        if (typeof preco == "number" && preco > 0) {
          var quantidade = parseInt(quantidadeElemento.value);
          if (typeof quantidade == "number" && quantidade > 0) {
            var newP = new Produto(id, nome, preco, quantidade);
            this.Lista.push(newP);
            return true;
          }
        }
      }
    }
    return false;
  }
  update(id: number): boolean {
    var alterado = false;
  
    var nomeElemento = <HTMLInputElement>document.getElementById("nome");
    var precoElemento = <HTMLInputElement>document.getElementById("preço");
    var quantidadeElemento = <HTMLInputElement>(
      document.getElementById("quantidade")
    );

    if (typeof id == "number" && id != 0) {
      var produto = <Produto> this.getItemByID(id);
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
      if (typeof quantidade == "number" && quantidade > 0 && produto.quantidade != quantidade) {
        produto.quantidade = quantidade;
        alterado = true;
      }
    }
    return alterado;
  }

  getCampos(): Array<string> {
    return ["id", "nome", "preço", "quantidade"];
  }


}
