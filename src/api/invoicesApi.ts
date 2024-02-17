import {
  CreateInvoiceRequestSchema,
  UpdateInvoiceRequestSchema,
  SendInvoiceRequestSchema,
  CloseInvoiceRequestSchema,
  INVOICE_URL,
} from "../types/invoiceRequestSchemas";
import { z } from "zod";
import { PostRequest } from "./utils";

type CreateInvoiceRequest = z.infer<typeof CreateInvoiceRequestSchema>;
type UpdateInvoiceRequest = z.infer<typeof UpdateInvoiceRequestSchema>;
type SendInvoiceRequest = z.infer<typeof SendInvoiceRequestSchema>;
type CloseInvoiceRequest = z.infer<typeof CloseInvoiceRequestSchema>;

export class InvoicesApi {
  _securityKey: string;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
  }

  beforeRequest = (request: any) => {
    return {
      ...request,
      security_key: this._securityKey,
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
