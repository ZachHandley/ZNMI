import {
  CreateInvoiceRequestSchema,
  UpdateInvoiceRequestSchema,
  SendInvoiceRequestSchema,
  CloseInvoiceRequestSchema,
  INVOICE_URL,
} from "../types/invoiceRequestSchemas";
import { InvoiceResponseSchema } from "../types/responseTypes";
import { PostRequest } from "./utils";
import { z } from "zod";

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

  parseResponse = (data: any) => {
    return InvoiceResponseSchema.parse(data);
  };

  createInvoice = async (createInvoiceRequest: CreateInvoiceRequest) => {
    const request = this.beforeRequest(createInvoiceRequest);
    const response = await PostRequest(INVOICE_URL, request);
    return this.parseResponse(response.data);
  };

  updateInvoice = async (updateInvoiceRequest: UpdateInvoiceRequest) => {
    const request = this.beforeRequest(updateInvoiceRequest);
    const response = await PostRequest(INVOICE_URL, request);
    return this.parseResponse(response.data);
  };

  sendInvoice = async (sendInvoiceRequest: SendInvoiceRequest) => {
    const request = this.beforeRequest(sendInvoiceRequest);
    const response = await PostRequest(INVOICE_URL, request);
    return this.parseResponse(response.data);
  };

  closeInvoice = async (closeInvoiceRequest: CloseInvoiceRequest) => {
    const request = this.beforeRequest(closeInvoiceRequest);
    const response = await PostRequest(INVOICE_URL, request);
    return this.parseResponse(response.data);
  };
}
