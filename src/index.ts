import { CustomerVault } from "./functions/customerVault";
import { Transactions } from "./functions/transactions";
import { ProductManager } from "./functions/productManager";
import { Invoices } from "./functions/invoices";
import { Recurring } from "./functions/recurring";

export class ZNMI {
  _securityKey: string;
  public customerVault;
  public transactions;
  public products;
  public invoices;
  public recurring;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
    this.customerVault = new CustomerVault(securityKey);
    this.transactions = new Transactions(securityKey);
    this.products = new ProductManager(securityKey);
    this.invoices = new Invoices(securityKey);
    this.recurring = new Recurring(securityKey);
  }
}
