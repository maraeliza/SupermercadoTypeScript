import Cliente from "./Cliente.js";
import IItem from "./IItem.js";
import ItemVendaForm from "./ItemVendaForm.js";
import Produto from "./Produto.js";
import Vendas from "./Venda.js";

export default class ItemVenda implements IItem {
  private _id: number = 0;
  private _produto: Produto;
  private _quantidade: number;
  private _cliente: Cliente;
  private _venda: Vendas;
  private _form: ItemVendaForm;

  constructor(id: number, produto: Produto, quantidade: number, venda: Vendas, form: ItemVendaForm) {
    this._id = id;
    this._produto = produto;
    this._quantidade = quantidade;
    this._venda = venda;
    this._form = form;
  }

  
  getValue(coluna: string): string {
    switch (coluna) {
      case "id":
        return this.id.toString();
      case "id venda":
        return this.venda.id.toString();
      case "produto":
        return this.produto.nome;
      case "quantidade":
        return this.quantidade.toString();
    }
  }

  public get id(): number {
    return this._id;
  }

  public getProdutoNome(): string {
    return this._produto.nome;
  }
  public getVendaID(): string {
    return this._venda.id.toString();
  }
  public get produto(): Produto {
    return this._produto;
  }
  public get form(): ItemVendaForm {
    return this._form;
  }

  public get quantidade(): number {
    return this._quantidade;
  }
  public get venda(): Vendas {
    return this._venda;
  }

  public set id(valor: number) {
    this._id = valor;
  }

  public set produto(valor: Produto) {
    this._produto = valor;
  }

  public set cliente(valor: Cliente) {
    this._cliente = valor;
  }

  public set venda(valor: Vendas) {
    this._venda = valor;
  }
  public set quantidade(valor: number) {
    if (valor > 0) {
      this._quantidade = valor;
    } else {
      console.log("A quantidade deve ser maior que zero.");
    }
  }
}
