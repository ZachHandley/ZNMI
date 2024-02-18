import {
  INVOICE_URL,
  CreateInvoiceRequestSchema,
  UpdateInvoiceRequestSchema,
  CloseInvoiceRequestSchema,
  SendInvoiceRequestSchema,
} from "@/types/invoiceRequestSchemas";
import { InvoicesApi } from "@/api/invoicesApi";
import { InvoiceResponseSchema } from "@/types/responseTypes";
import { z } from "zod";

type CreateInvoiceRequest = z.infer<typeof CreateInvoiceRequestSchema>;
type UpdateInvoiceRequest = z.infer<typeof UpdateInvoiceRequestSchema>;
type CloseInvoiceRequest = z.infer<typeof CloseInvoiceRequestSchema>;
type SendInvoiceRequest = z.infer<typeof SendInvoiceRequestSchema>;
type InvoiceResponse = z.infer<typeof InvoiceResponseSchema>;

export class Invoices {
  invoicesApi: InvoicesApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
    this.invoicesApi = new InvoicesApi(securityKey);
  }

  beforeRequest = (request: any) => {
    return {
      ...request,
      securityKey: this._securityKey,
    };
  };

  async createInvoice(
    invoiceData?: {
      amount: number;
      email: string;
      tax?: number;
      payment_terms?: "upon_receipt" | number;
      shipping?: number;
      customer_id?: string;
      currency?: string;
      orderid?: string;
      order_description?: string;
      first_name?: string;
      last_name?: string;
      company?: string;
      address1?: string;
      address2?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
      phone?: string;
      fax?: string;
      website?: string;
    },
    additionalOptions?: Partial<CreateInvoiceRequest>
  ): Promise<{
    status: number;
    data?: InvoiceResponse;
    message: string;
  }> {
    try {
      if (!invoiceData && !additionalOptions) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const createInvoiceRequest: CreateInvoiceRequest =
        CreateInvoiceRequestSchema.parse({
          invoicing: "add_invoice",
          payment_terms: "upon_receipt",
          payment_terms_allowed: ["cc", "ck", "cs"],
          ...invoiceData,
          ...additionalOptions,
        });
      const request = this.beforeRequest(createInvoiceRequest);
      const result = await this.invoicesApi.createInvoice(request);
      return {
        status: 200,
        data: result,
        message: "Invoice created",
      };
    } catch (error: any) {
      return {
        status: 500,
        message: `Error creating invoice: ${error.message}`,
      };
    }
  }

  async updateInvoice(
    invoiceData?: {
      invoice_id: string;
      amount?: number;
      email?: string;
      tax?: number;
      shipping?: number;
      payment_terms?: "upon_receipt" | number;
      customer_id?: string;
      currency?: string;
      orderid?: string;
      order_description?: string;
      first_name?: string;
      last_name?: string;
      company?: string;
      address1?: string;
      address2?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
      phone?: string;
      fax?: string;
      website?: string;
    },
    additionalOptions?: Partial<UpdateInvoiceRequest>
  ): Promise<{
    status: number;
    data?: InvoiceResponse;
    message: string;
  }> {
    try {
      if (!invoiceData && !additionalOptions) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const updateInvoiceRequest: UpdateInvoiceRequest =
        UpdateInvoiceRequestSchema.parse({
          invoicing: "update_invoice",
          ...invoiceData,
          ...additionalOptions,
        });
      const request = this.beforeRequest(updateInvoiceRequest);
      const result = await this.invoicesApi.updateInvoice(request);
      return {
        status: 200,
        data: result,
        message: "Invoice updated",
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error updating invoice",
      };
    }
  }

  async closeInvoice(
    invoiceData?: {
      invoice_id?: string;
    },
    additionalOptions?: Partial<CloseInvoiceRequest>
  ): Promise<{
    status: number;
    data?: InvoiceResponse;
    message: string;
  }> {
    try {
      if (
        !invoiceData &&
        (!additionalOptions || !additionalOptions.invoice_id)
      ) {
        return {
          status: 400,
          message: "invoice_id is required",
        };
      }
      const closeInvoiceRequest: CloseInvoiceRequest =
        CloseInvoiceRequestSchema.parse({
          invoicing: "close_invoice",
          ...invoiceData,
          ...additionalOptions,
        });
      const request = this.beforeRequest(closeInvoiceRequest);
      const result = await this.invoicesApi.closeInvoice(request);
      return {
        status: 200,
        data: result,
        message: "Invoice closed",
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error closing invoice",
      };
    }
  }

  async sendInvoice(
    invoiceData?: {
      email: string;
      invoice_id?: string;
    },
    additionalOptions?: Partial<SendInvoiceRequest>
  ): Promise<{
    status: number;
    data?: InvoiceResponse;
    message: string;
  }> {
    try {
      if (
        !invoiceData ||
        !invoiceData.email ||
        (!invoiceData.invoice_id &&
          (!additionalOptions || !additionalOptions.invoice_id))
      ) {
        return {
          status: 400,
          message: "invoice_id and email are required",
        };
      }
      const sendInvoiceRequest: SendInvoiceRequest =
        SendInvoiceRequestSchema.parse({
          invoicing: "send_invoice",
          ...invoiceData,
          ...additionalOptions,
        });
      const request = this.beforeRequest(sendInvoiceRequest);
      const result = await this.invoicesApi.sendInvoice(request);
      return {
        status: 200,
        data: result,
        message: "Invoice sent",
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error sending invoice",
      };
    }
  }
}
