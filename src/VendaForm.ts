import Form from "./Form.js";
import Venda from "./Venda.js";
import Cliente from "./Cliente.js";
import ItensVenda from "./ItensVenda.js";
import Produto from "./Produto.js";

export default class VendasForm extends Form {

  Lista: Venda[] = [];

  constructor() {
    super();
    this.Lista = [];
    // Aqui você pode popular a lista com exemplos
    // Supondo que você já tenha instanciado alguns objetos de Cliente e Produto
    let cliente = new Cliente(1, "João Silva", "Rua A, 123", "1234-5678");
    let produto1 = new Produto(1, "Arroz Vasconcelos", 30.99, 90);
    let produto2 = new Produto(2, "Feijão Carioca", 25.49, 120);
    let itemVenda1 = new ItensVenda(1,produto1, 5);
    let itemVenda2 = new ItensVenda(2,produto2, 3);
    let venda = new Venda(1, cliente, "Cartão de Crédito");
    venda.addItemVenda(itemVenda1);
    venda.addItemVenda(itemVenda2);
    this.Lista.push(venda);
  }

  create(): boolean {
    var idElemento = <HTMLInputElement>document.getElementById("id");
    var clienteElemento = <HTMLInputElement>document.getElementById("cliente");
    var modoPagamentoElemento = <HTMLInputElement>document.getElementById("modoPagamento");

    var id = parseInt(idElemento.value);
    if (typeof id == "number" && id != 0) {
      // Aqui você selecionaria o cliente da lista existente, com base no id (exemplo)
      var cliente = new Cliente(1, "João Silva", "Rua A, 123", "1234-5678");
      if (cliente) {
        var modoPagamento = modoPagamentoElemento.value;
        if (modoPagamento.length > 0) {
          var newV = new Venda(id, cliente, modoPagamento);
          // Adicionar itens à venda
          let produto1 = new Produto(1, "Arroz Vasconcelos", 30.99, 90);
          let itemVenda1 = new ItensVenda(4,produto1, 2);
          newV.addItemVenda(itemVenda1);
          this.Lista.push(newV);
          return true;
        }
      }
    }
    return false;
  }

  update(id: number): boolean {
    var alterado = false;
    
    var clienteElemento = <HTMLInputElement>document.getElementById("cliente");
    var modoPagamentoElemento = <HTMLInputElement>document.getElementById("modoPagamento");

    if (typeof id == "number" && id != 0) {
      var venda = <Venda>this.getItemByID(id);
      
      var modoPagamento = modoPagamentoElemento.value;
      if (modoPagamento.length > 0 && venda.modoPagamento !== modoPagamento) {
        venda.modoPagamento = modoPagamento;
        alterado = true;
      }
    }
    return alterado;
  }

  getCampos(): Array<string> {
    return ["id", "cliente", "modoPagamento", "itensVenda"];
  }


}
