import IItem from "./IItem.js";
import Cliente from "./Cliente.js";
import ItensVenda from "./ItensVenda.js";

export default class Vendas implements IItem {

  private _id: number = 0;
  private _cliente: Cliente;
  private _itensVenda: ItensVenda[] = [];
  private _modoPagamento: string;

  constructor(id: number, cliente: Cliente, modoPagamento: string) {
    this._id = id;
    this._cliente = cliente;
    this._modoPagamento = modoPagamento;
  }

  getValue(coluna: string): string {
    switch (coluna) {
      case "id":
        return this.id.toString();
      case "cliente":
        return this.cliente.nome;
      case "modoPagamento":
        return this.modoPagamento;
      case "itensVenda":
        return this.itensVenda.map(item => `${item.produto.nome} (Quantidade: ${item.quantidade})`).join(", ");
    }
  }

  public get id(): number {
    return this._id;
  }

  public get cliente(): Cliente {
    return this._cliente;
  }

  public get itensVenda(): ItensVenda[] {
    return this._itensVenda;
  }

  public get modoPagamento(): string {
    return this._modoPagamento;
  }

  public set id(valor: number) {
    this._id = valor;
  }

  public set cliente(valor: Cliente) {
    this._cliente = valor;
  }

  public set modoPagamento(valor: string) {
    this._modoPagamento = valor;
  }

  public addItemVenda(item: ItensVenda): void {
    this._itensVenda.push(item);
  }

  public set itensVenda(valor: ItensVenda[]) {
    this._itensVenda = valor;
  }
}