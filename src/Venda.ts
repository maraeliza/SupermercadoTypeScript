import IItem from "./IItem.js";
import Cliente from "./Cliente.js";
import ItemVenda from "./ItemVenda.js";

export default class Vendas implements IItem {

  private _id: number = 0;
  private _cliente: Cliente;
  private _itensVenda: ItemVenda[] = [];
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
      case "Modo de Pagamento":
        return this.modoPagamento;
      case "Itens Vendidos":
        return this.itensVenda.map(item => `${item.produto.nome} ${item.quantidade}x`).join(", ");
    }
  }

  public get id(): number {
    return this._id;
  }

  public get cliente(): Cliente {
    return this._cliente;
  }

  public get itensVenda(): ItemVenda[] {
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

  public addItemVenda(item: ItemVenda): void {
    this._itensVenda.push(item);
  }

  public set itensVenda(valor: ItemVenda[]) {
    this._itensVenda = valor;
  }
  
}
