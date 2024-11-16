import ClienteForm from "./ClienteForm.js";
import ItemVendaForm from "./ItemVendaForm.js";
import ProdutoForm from "./ProdutoForm.js";
import VendasForm from "./VendaForm.js";
const TabelaElemento = document.getElementById("tabela");
const CorpoTabelaElemento = document.getElementById("corpoTabela");
const LinhaColunaElemento = document.getElementById("colunas");
const TabelaElementoIV = document.getElementById("tabelaIV");
const CorpoTabelaElementoIV = document.getElementById("corpoTabelaIV");
const LinhaColunaElementoIV = document.getElementById("colunasIV");
const msgSucesso = document.getElementById("msgSucesso");
const msgDanger = document.getElementById("msgDanger");
const tabelaNome = document.getElementById("tabelaNome");
const tabelaDescricao = document.getElementById("tabelaDescricao");
const tabelaNomeIV = document.getElementById("tabelaNomeIV");
const tabelaDescricaoIV = document.getElementById("tabelaDescricaoIV");
var form;
tabelaNome.innerHTML = "Vendas cadastradas";
var formProduto = new ProdutoForm();
var formCliente = new ClienteForm();
var formVendas = new VendasForm(formProduto, formCliente);
var formIV = new ItemVendaForm(formProduto, formVendas);
form = formVendas;
atualizarTabela(form);
document.getElementById("opProduto").addEventListener("click", function () {
    form = formProduto;
    atualizarTabela(form);
    tabelaNome.innerHTML = "Produtos cadastrados";
    esconderTabelaIV();
});
document.getElementById("opCliente").addEventListener("click", function () {
    form = formCliente;
    atualizarTabela(form);
    tabelaNome.innerHTML = "Clientes cadastrados";
    esconderTabelaIV();
});
document.getElementById("opVenda").addEventListener("click", function () {
    form = formVendas;
    atualizarTabela(form);
    tabelaNome.innerHTML = "Vendas cadastradas";
    atualizarTabelaIV(formIV);
});
TabelaElemento.addEventListener("click", function (evento) {
    if (evento.target.id == "addBtn") {
        addItemTabela(form);
    }
});
TabelaElemento.addEventListener("click", function (evento) {
    if (evento.target.id.includes("delBtn")) {
        var id = evento.target.id;
        id = id.replace("delBtn", "");
        deleteItemTabela(form, parseInt(id));
    }
});
TabelaElemento.addEventListener("click", function (evento) {
    if (evento.target.id.includes("editBtn")) {
        var id = evento.target.id;
        id = id.replace("editBtn", "");
        updateItemTabela(form, parseInt(id));
    }
});
TabelaElemento.addEventListener("click", function (evento) {
    if (evento.target.id.includes("saveBtn")) {
        var id = evento.target.id;
        id = id.replace("saveBtn", "");
        saveItemTabela(form, parseInt(id));
    }
});
TabelaElementoIV.addEventListener("click", function (evento) {
    if (evento.target.id == "addBtn") {
        addItemTabela(formIV);
    }
});
TabelaElementoIV.addEventListener("click", function (evento) {
    if (evento.target.id.includes("delBtn")) {
        var id = evento.target.id;
        id = id.replace("delBtn", "");
        deleteItemTabela(formIV, parseInt(id));
    }
});
TabelaElementoIV.addEventListener("click", function (evento) {
    if (evento.target.id.includes("editBtn")) {
        var id = evento.target.id;
        id = id.replace("editBtn", "");
        updateItemTabela(formIV, parseInt(id));
    }
});
TabelaElementoIV.addEventListener("click", function (evento) {
    if (evento.target.id.includes("saveBtn")) {
        var id = evento.target.id;
        id = id.replace("saveBtn", "");
        saveItemTabela(formIV, parseInt(id));
    }
});
function saveItemTabela(form, id) {
    if (form.update(id)) {
        atualizarTabela(form);
        mostrarMsg("Alterações salvas com sucesso!", true);
    }
    else {
        atualizarTabela(form);
        mostrarMsg("<b>Erro!</b> Não foi possível salvar as alterações!", false);
    }
}
function addItemTabela(form) {
    if (form.create()) {
        atualizarTabela(form);
        mostrarMsg("Item adicionado com sucesso!", true);
    }
    else {
        mostrarMsg("<b>Erro!</b> Não foi possível adicionar o item! <br> Preencha todos os campos antes de adicionar!", false);
    }
}
function updateItemTabela(form, id) {
    if (form.getItemByID(id)) {
        atualizarTabelaUpdate(form, id);
    }
    else {
        mostrarMsg("<b>Erro!</b> Não foi atualizar  o item!", false);
    }
}
function deleteItemTabela(form, id) {
    if (form.delete(id)) {
        atualizarTabela(form);
        mostrarMsg("Item deletado com sucesso!", true);
    }
    else {
        mostrarMsg("<b>Erro!</b> Não foi possível deletar o item!", false);
    }
}
function atualizarTabela(form) {
    var dados = form.montarTabela();
    if (form == formIV) {
        atualizarTabelaIV(form);
        atualizarTabela(formVendas);
    }
    else if (form == formVendas) {
        attPrimeiraTabela(dados);
        if (formVendas.Lista.length > 0) {
            TabelaElementoIV.style.display = "block";
            atualizarTabelaIV(formIV);
        }
        else {
            TabelaElementoIV.style.display = "none";
        }
    }
    else {
        attPrimeiraTabela(dados);
    }
}
function attPrimeiraTabela(dados) {
    LinhaColunaElemento.innerHTML = "";
    CorpoTabelaElemento.innerHTML = "";
    LinhaColunaElemento.innerHTML = dados[0];
    CorpoTabelaElemento.innerHTML = dados[1];
    tabelaDescricao.innerHTML =
        "Total: " +
            form.Lista.length +
            " itens registrados no sistema <br>Última atualização: " +
            montarData();
}
function atualizarTabelaIV(form) {
    var dados = form.montarTabela();
    LinhaColunaElementoIV.innerHTML = "";
    CorpoTabelaElementoIV.innerHTML = "";
    LinhaColunaElementoIV.innerHTML = dados[0];
    CorpoTabelaElementoIV.innerHTML = dados[1];
    tabelaNomeIV.innerHTML = "Itens de venda cadastrados";
    tabelaDescricaoIV.innerHTML =
        "Total: " +
            form.Lista.length +
            " itens registrados no sistema <br>Última atualização: " +
            montarData();
}
function montarData() {
    var dataFormatada = new Date().toLocaleString("pt-BR", {
        hour: "2-digit", // Hora
        minute: "2-digit",
    });
    return dataFormatada;
}
function atualizarTabelaUpdate(form, id) {
    var dados = form.montarTabelaUpdate(id);
    if (form == formIV) {
        CorpoTabelaElementoIV.innerHTML = "";
        CorpoTabelaElementoIV.innerHTML = dados;
    }
    else {
        CorpoTabelaElemento.innerHTML = "";
        CorpoTabelaElemento.innerHTML = dados;
    }
}
function mostrarMsg(msg, sucess) {
    if (sucess) {
        msgSucesso.style.display = "block";
        msgSucesso.innerHTML = msg;
        setTimeout(() => {
            msgSucesso.style.display = "none";
        }, 3000);
    }
    else {
        msgDanger.style.display = "block";
        msgDanger.innerHTML = msg;
        setTimeout(() => {
            msgDanger.style.display = "none";
        }, 3000);
    }
}
function esconderTabelaIV() {
    TabelaElementoIV.style.display = "none";
    tabelaNomeIV.innerHTML = "";
    tabelaDescricaoIV.innerHTML = "";
}
