import Form from "./Form.js";
import Cliente from "./Cliente.js";
export default class ClienteForm extends Form {
    constructor() {
        super();
        this.Lista = [];
        this.Total++;
        this.Lista = [];
        this.addItensInicial();
    }
    addItensInicial() {
        this.addItemLista(new Cliente(this.Total, "João Silva", "Rua A, 123", "1234-5678"));
        this.addItemLista(new Cliente(this.Total, "Maria Oliveira", "Avenida B, 456", "2345-6789"));
        this.addItemLista(new Cliente(this.Total, "Carlos Souza", "Praça C, 789", "3456-7890"));
    }
    addItemLista(cliente) {
        this.Total++;
        this.Lista.push(cliente);
    }
    create() {
        var nomeElemento = document.getElementById("nome");
        var enderecoElemento = (document.getElementById("endereco"));
        var telefoneElemento = (document.getElementById("telefone"));
        var id = this.Total;
        var nome = nomeElemento.value;
        if (nome.length > 0) {
            var endereco = enderecoElemento.value;
            if (endereco.length > 0) {
                var telefone = telefoneElemento.value;
                if (telefone.length > 0) {
                    var newC = new Cliente(id, nome, endereco, telefone);
                    this.addItemLista(newC);
                    return true;
                }
            }
        }
        return false;
    }
    update(id) {
        var alterado = false;
        var nomeElemento = document.getElementById("nome");
        var enderecoElemento = (document.getElementById("endereco"));
        var telefoneElemento = (document.getElementById("telefone"));
        if (typeof id == "number" && id != 0) {
            var cliente = this.getItemByID(id);
            var nome = nomeElemento.value;
            if (nome.length > 0 && cliente.nome != nome) {
                cliente.nome = nome;
                alterado = true;
            }
            var endereco = enderecoElemento.value;
            if (endereco.length > 0 && cliente.endereco != endereco) {
                cliente.endereco = endereco;
                alterado = true;
            }
            var telefone = telefoneElemento.value;
            if (telefone.length > 0 && cliente.telefone != telefone) {
                cliente.telefone = telefone;
                alterado = true;
            }
        }
        return alterado;
    }
    getCampos() {
        return ["id", "nome", "endereco", "telefone"];
    }
    getNomes() {
        var nomes = [];
        for (var cliente of this.Lista) {
            nomes.push(cliente.nome);
        }
        return nomes;
    }
    getClienteByNome(nome) {
        for (var cliente of this.Lista) {
            var nomeCliente = cliente.nome.toLocaleLowerCase().replace(/ /g, "_").split(" ").join("_");
            if (nomeCliente == nome) {
                return cliente;
            }
        }
        return null;
    }
}
