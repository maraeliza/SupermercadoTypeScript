import IItem from "./IItem.js";

export default class Produto implements IItem {
  private _id: number = 0;
  private _nome: string;
  private _preco: number;
  private _quantidade: number;

  constructor(
    id: number,
    nome: string,
    preco: number,
    quantidade: number
  ) {
    this._id = id;
    this._nome = nome;
    this._preco = preco;
    this._quantidade = quantidade;
  }

  getValue(coluna: string): string {
    switch (coluna) {
      case "id":
        return this.id.toString();
      case "nome":
        return this.nome;
      case "preço":
        return this.preco.toString();
      case "quantidade":
        return this.quantidade.toString();
    }
  }

  public get id(): number {
    return this._id;
  }
  public get preco(): number {
    return this._preco;
  }

  public get quantidade(): number {
    return this._quantidade;
  }

  public get nome(): string {
    return this._nome;
  }
  public set id(valor: number) {
    this._id = valor;
  }

  public set preco(valor: number) {
    if (valor > 0) {
      this._preco = valor;
    } else {
      console.log("O preço deve ser um valor positivo.");
    }
  }

  public set quantidade(valor: number) {
    if (valor >= 0) {
      this._quantidade = valor;
    } else {
      console.log("A quantidade de estoque não pode ser negativa.");
    }
  }

  public set nome(valor: string) {
    if (valor.trim() !== "") {
      this._nome = valor;
    } else {
      console.log("O nome não pode ser vazio.");
    }
  }
}
