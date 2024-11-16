import Form from "./Form.js";
import Venda from "./Venda.js";

import ItemVenda from "./ItemVenda.js";
import Produto from "./Produto.js";
import ProdutoForm from "./ProdutoForm.js";
import VendasForm from "./VendaForm.js";

export default class ItemVendaForm extends Form {
  Lista: ItemVenda[] = [];

  formProduto: ProdutoForm;
  formVenda: VendasForm;

  constructor(formProduto: ProdutoForm, formVenda: VendasForm) {
    super();
    this.formProduto = formProduto;
    this.formVenda = formVenda;
    this.Lista = [];
    this.addItensInicial();
  }
  addItensInicial() {
    this.addItemLista(
      new ItemVenda(
        this.Total,
        this.formProduto.Lista[0],
        3,
        this.formVenda.Lista[0],
        this
      )
    );
    this.addItemLista(
      new ItemVenda(
        this.Total,
        this.formProduto.Lista[1],
        1,
        this.formVenda.Lista[0],
        this
      )
    );
    this.addItemLista(
      new ItemVenda(
        this.Total,
        this.formProduto.Lista[3],
        2,
        this.formVenda.Lista[0],
        this
      )
    );
    this.addItemLista(
      new ItemVenda(
        this.Total,
        this.formProduto.Lista[3],
        1,
        this.formVenda.Lista[1],
        this
      )
    );
    this.addItemLista(
      new ItemVenda(
        this.Total,
        this.formProduto.Lista[2],
        2,
        this.formVenda.Lista[1],
        this
      )
    );
  }

  removeFromListVenda(idVenda: number) {
    this.Lista = this.Lista.filter((itemVenda) => {
      return itemVenda.venda.id != idVenda;
    });
  }
  addItemLista(itemVenda: ItemVenda) {
    this.Total++;
    this.Lista.push(itemVenda);
    this.formVenda.addItemListaIV(itemVenda);
  }

  create(): boolean {
    var id = this.Total;
    var produtoElemento = <HTMLSelectElement>document.getElementById("produto");
    var produtoObj: Produto = this.formProduto.getProdutoByNome(
      produtoElemento.value
    );
    if (produtoObj == null) {
      return false;
    }
    var vendaElemento = <HTMLSelectElement>document.getElementById("id_venda");

    var vendaObj: Venda = this.formVenda.getVendaByID(
      parseInt(vendaElemento.value)
    );

    if (vendaObj == null) {
      return false;
    }

    var quantidadeElemento = <HTMLInputElement>(
      document.getElementById("quantidade")
    );
    var quantidade = parseInt(quantidadeElemento.value);

    if (quantidade <= 0) {
      return false;
    }
    var itemVenda = new ItemVenda(id, produtoObj, quantidade, vendaObj, this);
    this.addItemLista(itemVenda);
    return true;
  }

  update(id: number): boolean {
    var alterado = false;
    var itemVenda = <ItemVenda>this.getItemByID(id);

    var vendaElemento = <HTMLSelectElement>document.getElementById("id_venda");
    var venda = this.formVenda.getVendaByID(parseInt(vendaElemento.value));

    if (venda != null) {
      itemVenda.venda.itensVenda.splice(
        itemVenda.venda.itensVenda.indexOf(itemVenda),
        1
      );
      itemVenda.venda = venda;
      itemVenda.venda.itensVenda.push(itemVenda);
      alterado = true;
    }
    var produtoElemento = <HTMLSelectElement>document.getElementById("produto");
    var produto = this.formProduto.getProdutoByNome(produtoElemento.value);

    if (produto != null) {
      itemVenda.produto = produto;
      alterado = true;
    }

    var quantidadeElemento = <HTMLInputElement>(
      document.getElementById("quantidade")
    );
    var quantidade = parseInt(quantidadeElemento.value);
    if (quantidade > 0) {
      itemVenda.quantidade = quantidade;
      alterado = true;
    }

    return alterado;
  }

  getCampos(): Array<string> {
    return ["id", "id venda", "produto", "quantidade"];
  }
  montarLinhaAdd(): string {
    var linhaAdd = "<tr>";

    for (var coluna of this.getCampos()) {
      var idInput = coluna.toLocaleLowerCase().replace(/ /g, "_");
      if (coluna == "id") {
        linhaAdd += "<th>" + this.Total + "</th>";
      } else if (coluna == "id venda") {
        //montar select com todos os clientes
        linhaAdd += "<th> <select class='inputTabela' id='" + idInput + "'>";
        for (var idVenda of this.formVenda.getIDS()) {
          linhaAdd += "<option value=" + idVenda + ">" + idVenda + "</option>";
        }
        linhaAdd += "</select></th>";
      } else if (coluna == "produto") {
        //montar select com todos os clientes
        linhaAdd += "<th> <select class='inputTabela' id='" + idInput + "'>";
        for (var nome of this.formProduto.getNomes()) {
          var valorInput = nome
            .toLocaleLowerCase()
            .replace(/ /g, "_")
            .split(" ")
            .join("_");
          linhaAdd += "<option value=" + valorInput + ">" + nome + "</option>";
        }
        linhaAdd += "</select></th>";
      } else if (coluna == "quantidade") {
        linhaAdd +=
          "<th> <input type='number' class='inputTabela' id='" +
          idInput +
          "' placeholder='" +
          coluna +
          "...'></th>";
      }
    }
    linhaAdd +=
      "<th class=acao> <button class='btm'><img id='addBtn' src='./imgs/add.png'></button> </th>";
    linhaAdd += "</tr>";
    return linhaAdd;
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
          } else if (coluna == "id venda") {
            //montar select com todos os clientes
            tabela += "<th> <select class='inputTabela' id='" + idInput + "'>";
            for (var idVenda of this.formVenda.getIDS()) {
              if (Number(idVenda) == item.venda.id) {
                tabela +=
                  "<option selected value=" +
                  idVenda +
                  ">" +
                  idVenda +
                  "</option>";
              } else {
                tabela +=
                  "<option value=" + idVenda + ">" + idVenda + "</option>";
              }
            }
            tabela += "</select></th>";
          } else if (coluna == "produto") {
            //montar select com todos os clientes
            tabela += "<th> <select class='inputTabela' id='" + idInput + "'>";
            for (var nome of this.formProduto.getNomes()) {
              var valorInput = nome
                .toLocaleLowerCase()
                .replace(/ /g, "_")
                .split(" ")
                .join("_");
              if (item.produto.nome == nome) {
                tabela +=
                  "<option selected value=" +
                  valorInput +
                  ">" +
                  nome +
                  "</option>";
              } else {
                tabela +=
                  "<option value=" + valorInput + ">" + nome + "</option>";
              }
            }
            tabela += "</select></th>";
          } else if (coluna == "quantidade") {
            tabela +=
              "<th> <input type='number' class='inputTabela' id='" +
              idInput +
              "' value='" +
              item.quantidade +
              "'></th>";
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

  delete(id: number): boolean {
    //achar elemento pelo id
    for (var item of this.Lista) {
      if (item.id == id) {
        //percorrendo as vendas para excluir o item
        for (var venda of this.formVenda.Lista) {
          if (venda.id == item.venda.id) {
            venda.itensVenda.splice(venda.itensVenda.indexOf(item), 1);
          }
        }
        this.Lista.splice(this.Lista.indexOf(item), 1);

        return true;
      }
    }
    //remover da lista
    return false;
  }
}
