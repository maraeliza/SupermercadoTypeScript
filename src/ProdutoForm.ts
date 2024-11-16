import Form from "./Form.js";
import Produto from "./Produto.js";

export default class ProdutoForm extends Form {
  Lista: Produto[] = [];
  

  constructor() {
    super();
    this.Total++;
    this.Lista = [];
    this.addItensInicial();
  }
  addItemLista(produto:Produto){
    this.Total++;
    this.Lista.push(produto);
  }

  addItensInicial(){
    this.addItemLista(new Produto(this.Total, "Feijão Carioca", 25.49, 120));
    this.addItemLista(new Produto(this.Total, "Açúcar União", 15.99, 200));
    this.addItemLista(new Produto(this.Total, "Macarrão Adria", 8.49, 150));
    this.addItemLista(new Produto(this.Total, "Óleo Liza", 10.99, 80));
  }

  create(): boolean {
    var nomeElemento = <HTMLInputElement>document.getElementById("nome");
    var precoElemento = <HTMLInputElement>document.getElementById("preço");
    var quantidadeElemento = <HTMLInputElement>(
      document.getElementById("quantidade")
    );

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
  update(id: number): boolean {
    var alterado = false;

    var nomeElemento = <HTMLInputElement>document.getElementById("nome");
    var precoElemento = <HTMLInputElement>document.getElementById("preço");
    var quantidadeElemento = <HTMLInputElement>(
      document.getElementById("quantidade")
    );

    if (typeof id == "number" && id != 0) {
      var produto = <Produto>this.getItemByID(id);
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
      if (
        typeof quantidade == "number" &&
        quantidade > 0 &&
        produto.quantidade != quantidade
      ) {
        produto.quantidade = quantidade;
        alterado = true;
      }
    }
    return alterado;
  }

  getCampos(): Array<string> {
    return ["id", "nome", "preço", "quantidade"];
  }
  getNomes(): Array<string> {
    var nomes:string[] = [];
    for(var produto of this.Lista){
      nomes.push(produto.nome);
    }
    return nomes;
  }
  getProdutoByNome(nome:string):Produto{
 
    for(var produto of this.Lista){
      var nomeproduto = produto.nome.toLocaleLowerCase().replace(/ /g, "_").split(" ").join("_");
      if(nomeproduto == nome){
        return produto;
      }
    }
    return null;
  }
}
