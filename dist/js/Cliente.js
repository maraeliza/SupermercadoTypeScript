export default class Cliente {
    constructor(id, nome, endereco, telefone) {
        this._id = 0;
        this._id = id;
        this._nome = nome;
        this._endereco = endereco;
        this._telefone = telefone;
    }
    getValue(coluna) {
        switch (coluna) {
            case "id":
                return this.id.toString();
            case "nome":
                return this.nome;
            case "endereco":
                return this.endereco;
            case "telefone":
                return this.telefone;
            default:
                return "";
        }
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get endereco() {
        return this._endereco;
    }
    get telefone() {
        return this._telefone;
    }
    set id(valor) {
        this._id = valor;
    }
    set nome(valor) {
        if (valor.trim() !== "") {
            this._nome = valor;
        }
        else {
            console.log("O nome não pode ser vazio.");
        }
    }
    set endereco(valor) {
        if (valor.trim() !== "") {
            this._endereco = valor;
        }
        else {
            console.log("O endereço não pode ser vazio.");
        }
    }
    set telefone(valor) {
        if (valor.trim() !== "") {
            this._telefone = valor;
        }
        else {
            console.log("O telefone não pode ser vazio.");
        }
    }
}
