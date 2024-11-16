import Form from "./Form.js";
import Venda from "./Venda.js";
import Cliente from "./Cliente.js";
import ItemVenda from "./ItemVenda.js";
import Produto from "./Produto.js";
import ProdutoForm from "./ProdutoForm.js";
import ClienteForm from "./ClienteForm.js";
import IItem from "./IItem.js";

export default class VendasForm extends Form {
  Lista: Venda[] = [];

  formProduto: ProdutoForm;
  formCliente: ClienteForm;

  constructor(formProduto: ProdutoForm, formCliente: ClienteForm) {
    super();
    this.formProduto = formProduto;
    this.formCliente = formCliente;
    this.Lista = [];
    this.Total++;
    this.addItensInicial();
  }
  addItemLista(venda: Venda) {
    this.Total++;
    this.Lista.push(venda);
  }
  addItensInicial() {
    this.addItemLista(
      new Venda(this.Total, this.formCliente.Lista[0], "Crédito")
    );
    this.addItemLista(
      new Venda(this.Total, this.formCliente.Lista[1], "Débito")
    );
    this.addItemLista(new Venda(this.Total, this.formCliente.Lista[1], "Pix"));
    this.addItemLista(
      new Venda(this.Total, this.formCliente.Lista[2], "Crédito")
    );
  }
  create(): boolean {
    var id = this.Total;

    var modoPagamentoElemento = <HTMLInputElement>(
      document.getElementById("modo_de_pagamento")
    );

    var clienteElemento = <HTMLSelectElement>document.getElementById("cliente");
    var cliente = this.formCliente.getClienteByNome(clienteElemento.value);

    if (cliente != null && modoPagamentoElemento.value.length > 0) {
      var venda = new Venda(id, cliente, modoPagamentoElemento.value);
      this.addItemLista(venda);
      return true;
    }
    return false;
  }

  update(id: number): boolean {
    var alterado = false;
    var venda = <Venda>this.getItemByID(id);

    var clienteElemento = <HTMLSelectElement>document.getElementById("cliente");
    var cliente = this.formCliente.getClienteByNome(clienteElemento.value);

    if (cliente != null) {
      venda.cliente = cliente;
      alterado = true;
    }
    var modoPagamentoElemento = <HTMLInputElement>(
      document.getElementById("modo_de_pagamento")
    );

    var modoPagamento = modoPagamentoElemento.value;
    if (modoPagamento.length > 0 && venda.modoPagamento !== modoPagamento) {
      venda.modoPagamento = modoPagamento;
      alterado = true;
    }

    return alterado;
  }

  getCampos(): Array<string> {
    return ["id", "cliente", "Modo de Pagamento", "Itens Vendidos"];
  }
  montarLinhaAdd(): string {
    var linhaAdd = "<tr>";

    for (var coluna of this.getCampos()) {
      var idInput = coluna.toLocaleLowerCase().replace(/ /g, "_");
      if (coluna == "id") {
        linhaAdd += "<th>" + this.Total + "</th>";
      } else if (coluna == "cliente") {
        //montar select com todos os clientes
        linhaAdd += "<th> <select class='inputTabela' id='" + idInput + "'>";
        for (var nome of this.formCliente.getNomes()) {
          var valorInput = nome
            .toLocaleLowerCase()
            .replace(/ /g, "_")
            .split(" ")
            .join("_");
          linhaAdd += "<option value=" + valorInput + ">" + nome + "</option>";
        }
        linhaAdd += "</select></th>";
      } else if (coluna == "Modo de Pagamento") {
        linhaAdd +=
          "<th> <input class='inputTabela' id='" +
          idInput +
          "' placeholder='" +
          coluna +
          "...'></th>";
      } else {
        linhaAdd += "<th></th>";
      }
    }
    linhaAdd +=
      "<th class=acao> <button class='btm'><img id='addBtn' src='./imgs/add.png'></button> </th>";
    linhaAdd += "</tr>";
    return linhaAdd;
  }
  getIDS(): Array<string> {
    var ids: string[] = [];
    for (var venda of this.Lista) {
      ids.push(venda.id.toString());
    }
    return ids;
  }

  getVendaByID(id: number): Venda {
    for (var venda of this.Lista) {
      if (venda.id == id) {
        return venda;
      }
    }
    return null;
  }
  addItemListaIV(itemVenda: ItemVenda) {
    this.getVendaByID(itemVenda.venda.id).addItemVenda(itemVenda);
  }

  delete(id: number): boolean {
    //achar elemento pelo id
    for (var item of this.Lista) {
      if (item.id == id) {
        if (item.itensVenda.length > 0) {
          item.itensVenda.forEach((itemVenda) => {
            itemVenda.form.removeFromListVenda(itemVenda.venda.id);
          });
        }

        this.Lista.splice(this.Lista.indexOf(item), 1);
        return true;
      }
    }
    //remover da lista
    return false;
  }
  montarTabelaUpdate(id: number) {
    var tabela = "";
    for (var item of this.Lista) {
      tabela += "<tr>";

      if (item.id == id) {
        for (var coluna of this.getCampos()) {
          var idInput = coluna.toLocaleLowerCase().replace(/ /g, "_");
          if (coluna == "id") {
            tabela += "<th>" + this.Total + "</th>";
          } else if (coluna == "cliente") {
            //montar select com todos os clientes
            tabela +=
              "<th> <select class='inputTabela' id='" + idInput + "'>";
            for (var nome of this.formCliente.getNomes()) {
              var valorInput = nome
                .toLocaleLowerCase()
                .replace(/ /g, "_")
                .split(" ")
                .join("_");
                if(item.cliente.nome == nome){
                tabela +=
                "<option value=" + valorInput + " selected>" + nome + "</option>";
                }else{
                  tabela +=
                "<option value=" + valorInput + ">" + nome + "</option>";
                }
            }
            tabela += "</select></th>";
          } else if (coluna == "Modo de Pagamento") {
            tabela +=
              "<th> <input class='inputTabela' id='" +
              idInput +
              "' value='" +
              item.modoPagamento +
              "'></th>";
          } else {
            tabela += "<th></th>";
          }
        }
        tabela += this.montarColunaAcaoUpdate(item.id);
      } else {
        for (var coluna of this.getCampos()) {
          tabela += "<th>" + item.getValue(coluna) + "</th>";
        }
        tabela += "<th></th>";
      }
      tabela += "</tr>";
    }
    return tabela;
  }
}
