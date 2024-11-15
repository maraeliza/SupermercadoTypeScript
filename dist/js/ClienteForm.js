import Form from "./Form.js";
import Cliente from "./Cliente.js";
export default class ClienteForm extends Form {
    constructor() {
        super();
        this.Lista = [];
        this.Lista = [];
        this.Lista.push(new Cliente(1, "João Silva", "Rua A, 123", "1234-5678"));
        this.Lista.push(new Cliente(2, "Maria Oliveira", "Avenida B, 456", "2345-6789"));
        this.Lista.push(new Cliente(3, "Carlos Souza", "Praça C, 789", "3456-7890"));
        this.Lista.push(new Cliente(4, "Ana Costa", "Rua D, 101", "4567-8901"));
        this.Lista.push(new Cliente(5, "Fernanda Lima", "Avenida E, 202", "5678-9012"));
    }
    create() {
        var idElemento = document.getElementById("id");
        var nomeElemento = document.getElementById("nome");
        var enderecoElemento = document.getElementById("endereco");
        var telefoneElemento = document.getElementById("telefone");
        var id = parseInt(idElemento.value);
        if (typeof id == "number" && id != 0) {
            var nome = nomeElemento.value;
            if (nome.length > 0) {
                var endereco = enderecoElemento.value;
                if (endereco.length > 0) {
                    var telefone = telefoneElemento.value;
                    if (telefone.length > 0) {
                        var newC = new Cliente(id, nome, endereco, telefone);
                        this.Lista.push(newC);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    update(id) {
        var alterado = false;
        var nomeElemento = document.getElementById("nome");
        var enderecoElemento = document.getElementById("endereco");
        var telefoneElemento = document.getElementById("telefone");
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
}
