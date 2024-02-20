import { z } from "zod";
import { TransactionsApi } from "../api/transactionsApi";
import {
  TransactionRequestSchema,
  CaptureTransactionRequestSchema,
  RefundTransactionSchema,
  VoidTransactionRequestSchema,
  UpdateTransactionRequestSchema,
} from "../types/transactionSchemas";
import { TransactionResponseSchema } from "../types/transactionSchemas";

export type TransactionRequest = z.infer<typeof TransactionRequestSchema>;
export type CaptureTransactionRequest = z.infer<
  typeof CaptureTransactionRequestSchema
>;
export type RefundTransaction = z.infer<typeof RefundTransactionSchema>;
export type VoidTransactionRequest = z.infer<
  typeof VoidTransactionRequestSchema
>;
export type UpdateTransactionRequest = z.infer<
  typeof UpdateTransactionRequestSchema
>;
export type TransactionResponse = z.infer<typeof TransactionResponseSchema>;

export class Transactions {
  transactionsApi: TransactionsApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this.transactionsApi = new TransactionsApi(securityKey);
    this._securityKey = securityKey;
  }

  async createTransaction(
    transactionData?: {
      amount?: number;
      ccnumber?: string;
      ccexp?: string;
      cvv?: string;
      transactionType?: "sale" | "auth" | "credit" | "validate" | "offline";
      payment?: "creditcard" | "check";
    },
    additionalOptions?: Partial<TransactionRequest>
  ): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      if (!transactionData && !additionalOptions) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const transactionRequest: TransactionRequest =
        TransactionRequestSchema.parse({
          ...transactionData,
          ...additionalOptions,
        });
      const result = await this.transactionsApi.createTransaction(
        transactionRequest
      );
      return {
        status: 200,
        data: result,
        message: "Transaction created successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in createTransaction ${error.message}`,
      };
    }
  }

  async authorizeTransaction(
    transactionData?: {
      amount?: number;
      ccnumber?: string;
      ccexp?: string;
      cvv?: string;
    },
    additionalOptions?: Partial<TransactionRequest>
  ): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      if (!transactionData && !additionalOptions) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const transactionRequest: TransactionRequest =
        TransactionRequestSchema.parse({
          type: "auth",
          payment: "creditcard",
          ...transactionData,
          ...additionalOptions,
        });
      const result = await this.transactionsApi.createTransaction(
        transactionRequest
      );
      return {
        status: 200,
        data: result,
        message: "Transaction authorized successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in authorizeTransaction ${error.message}`,
      };
    }
  }

  async validateTransaction(transactionData?: {
    ccnumber?: string;
    ccexp?: string;
    cvv?: string;
  }): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      if (!transactionData) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const transactionRequest: TransactionRequest =
        TransactionRequestSchema.parse({
          type: "validate",
          payment: "creditcard",
          ...transactionData,
        });
      const result = await this.transactionsApi.createTransaction(
        transactionRequest
      );
      return {
        status: 200,
        data: result,
        message: "Transaction validated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in validateTransaction ${error.message}`,
      };
    }
  }

  async captureTransaction(
    transactionData?: {
      transactionid?: string;
      amount?: number;
    },
    additionalOptions: Partial<CaptureTransactionRequest> = {}
  ): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      if (!transactionData && !additionalOptions) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const captureRequest: CaptureTransactionRequest =
        CaptureTransactionRequestSchema.parse({
          type: "capture",
          ...transactionData,
          ...additionalOptions,
        });
      const result = await this.transactionsApi.captureTransaction(
        captureRequest
      );
      return {
        status: 200,
        data: result,
        message: "Transaction captured successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in captureTransaction ${error.message}`,
      };
    }
  }

  async refundTransaction(
    transactionData?: {
      transactionid?: string;
      amount?: number;
    },
    additionalOptions: Partial<RefundTransaction> = {}
  ): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      if (!transactionData && !additionalOptions) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const refundRequest: RefundTransaction = RefundTransactionSchema.parse({
        type: "refund",
        ...transactionData,
        ...additionalOptions,
      });
      const result = await this.transactionsApi.refundTransaction(
        refundRequest
      );
      return {
        status: 200,
        data: result,
        message: "Transaction refunded successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in refundTransaction ${error.message}`,
      };
    }
  }

  async voidTransaction(
    transactionData?: {
      transactionid?: string;
    },
    additionalOptions: Partial<VoidTransactionRequest> = {}
  ): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      if (!transactionData && !additionalOptions) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const voidRequest: VoidTransactionRequest =
        VoidTransactionRequestSchema.parse({
          type: "void",
          ...transactionData,
          ...additionalOptions,
        });
      const result = await this.transactionsApi.voidTransaction(voidRequest);
      return {
        status: 200,
        data: result,
        message: "Transaction voided successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in voidTransaction ${error.message}`,
      };
    }
  }

  async updateTransaction(
    transactionData?: {
      transactionid?: string;
    },
    additionalOptions: Partial<UpdateTransactionRequest> = {}
  ): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      if (!transactionData && !additionalOptions) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const updateRequest: UpdateTransactionRequest =
        UpdateTransactionRequestSchema.parse({
          type: "update",
          ...transactionData,
          ...additionalOptions,
        });
      const result = await this.transactionsApi.updateTransaction(
        updateRequest
      );
      return {
        status: 200,
        data: result,
        message: "Transaction updated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in updateTransaction ${error.message}`,
      };
    }
  }
}
