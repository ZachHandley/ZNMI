import {
  INVOICE_URL,
  CreateInvoiceRequestSchema,
  UpdateInvoiceRequestSchema,
  CloseInvoiceRequestSchema,
  SendInvoiceRequestSchema,
} from "@/types/invoiceRequestSchemas";
import { InvoicesApi } from "@/api/invoicesApi";
import { z } from "zod";

type CreateInvoiceRequest = z.infer<typeof CreateInvoiceRequestSchema>;
type UpdateInvoiceRequest = z.infer<typeof UpdateInvoiceRequestSchema>;
type CloseInvoiceRequest = z.infer<typeof CloseInvoiceRequestSchema>;
type SendInvoiceRequest = z.infer<typeof SendInvoiceRequestSchema>;

export class Invoices {
  _securityKey: string;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
  }

  beforeRequest = (request: any) => {
    return {
      ...request,
      securityKey: this._securityKey,
    };
  };

  async createInvoice(
    amount: number,
    email: string,
    tax: number = 0,
    shipping: number = 0,
    payment_terms: "upon_receipt" | number = "upon_receipt",
    customer_id?: string,
    currency: string = "USD",
    orderid?: string,
    order_description?: string,
    first_name?: string,
    createInvoiceRequest?: Partial<CreateInvoiceRequest>
  ) {
    const createInvoiceRequest: CreateInvoiceRequest = {
      amount,
      email,
      payment_terms,
    };
    const request = this.beforeRequest(createInvoiceRequest);
    return InvoicesApi.createInvoice(request);
  }
}
