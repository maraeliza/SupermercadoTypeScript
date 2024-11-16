import Form from "./Form.js";
export default class VendasForm extends Form {
    constructor(formProduto, formCliente) {
        super();
        this.Lista = [];
        this.formProduto = formProduto;
        this.formCliente = formCliente;
        this.Lista = [];
    }
    addItemLista(venda) {
        this.Total++;
        this.Lista.push(venda);
    }
    create() {
        var id = this.Total;
        if (typeof id == "number" && id != 0) {
        }
        return false;
    }
    update(id) {
        var alterado = false;
        var clienteElemento = document.getElementById("cliente");
        var modoPagamentoElemento = (document.getElementById("modoPagamento"));
        if (typeof id == "number" && id != 0) {
            var venda = this.getItemByID(id);
            var modoPagamento = modoPagamentoElemento.value;
            if (modoPagamento.length > 0 && venda.modoPagamento !== modoPagamento) {
                venda.modoPagamento = modoPagamento;
                alterado = true;
            }
        }
        return alterado;
    }
    getCampos() {
        return ["id", "cliente", "Modo de Pagamento", "Itens Vendidos"];
    }
    montarLinhaAdd() {
        var linhaAdd = "<tr>";
        for (var coluna of this.getCampos()) {
            var idInput = coluna.toLocaleLowerCase().replace(/ /g, "_");
            if (coluna == "id") {
                linhaAdd += "<th>" + this.Total + "</th>";
            }
            else if (coluna == "cliente") {
                //montar select com todos os clientes
                linhaAdd += "<th> <select class='inputTabela' id='" + idInput + "'>";
                for (var nome of this.formCliente.getNomes()) {
                    linhaAdd += "<option>" + nome + "</option>";
                }
                linhaAdd += "</select></th>";
            }
            else if (coluna == "Modo de Pagamento") {
                linhaAdd +=
                    "<th> <input class='inputTabela' id='" +
                        idInput +
                        "' placeholder='" +
                        coluna +
                        "...'></th>";
            }
            else {
                linhaAdd += "<th></th>";
            }
        }
        linhaAdd +=
            "<th class=acao> <button class='btm'><img id='addBtn' src='./imgs/add.png'></button> </th>";
        linhaAdd += "</tr>";
        return linhaAdd;
    }
}
