import {
  CreateInvoiceRequestSchema,
  UpdateInvoiceSchema,
  SendInvoiceSchema,
  CloseInvoiceSchema,
  INVOICE_URL,
} from "../types/invoiceRequestSchemas";
import { z } from "zod";
import { PostRequest } from "./utils";

type CreateInvoiceRequest = z.infer<typeof CreateInvoiceRequestSchema>;
type UpdateInvoiceRequest = z.infer<typeof UpdateInvoiceSchema>;
type SendInvoiceRequest = z.infer<typeof SendInvoiceSchema>;
type CloseInvoiceRequest = z.infer<typeof CloseInvoiceSchema>;

export class InvoicesApi {
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

  createInvoice = async (createInvoiceRequest: CreateInvoiceRequest) => {
    const request = this.beforeRequest(createInvoiceRequest);
    return PostRequest(INVOICE_URL, request);
  };

  updateInvoice = async (updateInvoiceRequest: UpdateInvoiceRequest) => {
    const request = this.beforeRequest(updateInvoiceRequest);
    return PostRequest(INVOICE_URL, request);
  };

  sendInvoice = async (sendInvoiceRequest: SendInvoiceRequest) => {
    const request = this.beforeRequest(sendInvoiceRequest);
    return PostRequest(INVOICE_URL, request);
  };

  closeInvoice = async (closeInvoiceRequest: CloseInvoiceRequest) => {
    const request = this.beforeRequest(closeInvoiceRequest);
    return PostRequest(INVOICE_URL, request);
  };
}
