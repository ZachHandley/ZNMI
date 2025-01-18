import { InvoicesApi } from "../api/invoicesApi.js";
import {
  type CreateInvoiceRequest,
  type UpdateInvoiceRequest,
  type CloseInvoiceRequest,
  type SendInvoiceRequest,
} from "../types/invoiceRequestSchemas.js";
import type { InvoiceResponse } from "../types/responseTypes.js";

export class Invoices {
  invoicesApi: InvoicesApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
    this.invoicesApi = new InvoicesApi(securityKey);
  }

  async createInvoice(request: CreateInvoiceRequest): Promise<{
    status: number;
    data?: InvoiceResponse;
    message: string;
  }> {
    try {
      const result = await this.invoicesApi.createInvoice({
        ...request,
        invoicing: "add_invoice",
      });
      return {
        status: 200,
        data: result,
        message: "Invoice created successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error creating invoice: ${error.message}`,
      };
    }
  }

  async updateInvoice(request: UpdateInvoiceRequest): Promise<{
    status: number;
    data?: InvoiceResponse;
    message: string;
  }> {
    try {
      const result = await this.invoicesApi.updateInvoice({
        ...request,
        invoicing: "update_invoice",
      });
      return {
        status: 200,
        data: result,
        message: "Invoice updated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error updating invoice: ${error.message}`,
      };
    }
  }

  async closeInvoice(request: CloseInvoiceRequest): Promise<{
    status: number;
    data?: InvoiceResponse;
    message: string;
  }> {
    try {
      const result = await this.invoicesApi.closeInvoice({
        ...request,
        invoicing: "close_invoice",
      });
      return {
        status: 200,
        data: result,
        message: "Invoice closed successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error closing invoice: ${error.message}`,
      };
    }
  }

  async sendInvoice(request: SendInvoiceRequest): Promise<{
    status: number;
    data?: InvoiceResponse;
    message: string;
  }> {
    try {
      const result = await this.invoicesApi.sendInvoice({
        ...request,
        invoicing: "send_invoice",
      });
      return {
        status: 200,
        data: result,
        message: "Invoice sent successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error sending invoice: ${error.message}`,
      };
    }
  }
}
