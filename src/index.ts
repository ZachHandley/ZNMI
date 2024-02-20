import { Transactions } from "./functions/transactions";
import { CustomerVault } from "./functions/customerVault";
import { Products } from "./functions/products";
import { Invoices } from "./functions/invoices";
import { Recurring } from "./functions/recurring";
import {
  TransactionResponseSchema,
  RecurringResponseSchema,
  CustomerVaultResponseSchema,
  BillingResponseSchema,
  ProductResponseSchema,
  InvoiceResponseSchema,
} from "./types/responseTypes";

export class ZNMI {
  _securityKey: string;
  public customerVault: CustomerVault;
  public transactions: Transactions;
  public products: Products;
  public invoices: Invoices;
  public recurring: Recurring;

  constructor(securityKey: string) {
    if (!securityKey || securityKey === "")
      throw new Error("Security Key is required");
    this._securityKey = securityKey;
    this.customerVault = new CustomerVault(securityKey);
    this.transactions = new Transactions(securityKey);
    this.products = new Products(securityKey);
    this.invoices = new Invoices(securityKey);
    this.recurring = new Recurring(securityKey);
  }
}

export {
  TransactionResponseSchema,
  RecurringResponseSchema,
  CustomerVaultResponseSchema,
  BillingResponseSchema,
  ProductResponseSchema,
  InvoiceResponseSchema,
};
export * from "./functions/transactions";
export * from "./functions/customerVault";
export * from "./functions/products";
export * from "./functions/invoices";
export * from "./functions/recurring";
