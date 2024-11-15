import IItem from "./IItem.js";
import Produto from "./Produto.js";

export default class ItensVenda implements IItem {

  private _id: number = 0;
  private _produto: Produto;
  private _quantidade: number;

  constructor(id: number, produto: Produto, quantidade: number) {
    this._id = id;
    this._produto = produto;
    this._quantidade = quantidade;
  }

  getValue(coluna: string): string {
    switch (coluna) {
      case "id":
        return this.id.toString();
      case "produto":
        return this.produto.nome;
      case "quantidade":
        return this.quantidade.toString();
    }
  }

  public get id(): number {
    return this._id;
  }

  public get produto(): Produto {
    return this._produto;
  }

  public get quantidade(): number {
    return this._quantidade;
  }

  public set id(valor: number) {
    this._id = valor;
  }

  public set produto(valor: Produto) {
    this._produto = valor;
  }

  public set quantidade(valor: number) {
    if (valor > 0) {
      this._quantidade = valor;
    } else {
      console.log("A quantidade deve ser maior que zero.");
    }
  }
}
