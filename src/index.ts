import { Transactions } from "./functions/transactions.js";
import { CustomerVault } from "./functions/customerVault.js";
import { Products } from "./functions/products.js";
import { Invoices } from "./functions/invoices.js";
import { Recurring } from "./functions/recurring.js";

import {
  APITransactionResponseSchema,
  RecurringResponseSchema,
  CustomerVaultResponseSchema,
  BillingResponseSchema,
  ProductResponseSchema,
  InvoiceResponseSchema,
} from "./types/responseTypes.js";

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
  APITransactionResponseSchema,
  RecurringResponseSchema,
  CustomerVaultResponseSchema,
  BillingResponseSchema,
  ProductResponseSchema,
  InvoiceResponseSchema,
};

export * from "./functions/transactions.js";
export * from "./functions/customerVault.js";
export * from "./functions/products.js";
export * from "./functions/invoices.js";
export * from "./functions/recurring.js";
export * from "./types/customerVaultRequest.js";
export * from "./types/invoiceRequestSchemas.js";
export * from "./types/productManagerRequest.js";
export * from "./types/recurringRequest.js";
export * from "./types/responseTypes.js";
export * from "./types/transactionSchemas.js";
