import IItem from "./IItem.js";

export default class Cliente implements IItem {
  private _id: number = 0;
  private _nome: string;
  private _endereco: string;
  private _telefone: string;

  constructor(id: number, nome: string, endereco: string, telefone: string) {
    this._id = id;
    this._nome = nome;
    this._endereco = endereco;
    this._telefone = telefone;
  }

  getValue(coluna: string): string {
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

  public get id(): number {
    return this._id;
  }

  public get nome(): string {
    return this._nome;
  }

  public get endereco(): string {
    return this._endereco;
  }

  public get telefone(): string {
    return this._telefone;
  }

  public set id(valor: number) {
    this._id = valor;
  }

  public set nome(valor: string) {
    if (valor.trim() !== "") {
      this._nome = valor;
    } else {
      console.log("O nome não pode ser vazio.");
    }
  }

  public set endereco(valor: string) {
    if (valor.trim() !== "") {
      this._endereco = valor;
    } else {
      console.log("O endereço não pode ser vazio.");
    }
  }

  public set telefone(valor: string) {
    if (valor.trim() !== "") {
      this._telefone = valor;
    } else {
      console.log("O telefone não pode ser vazio.");
    }
  }
}
