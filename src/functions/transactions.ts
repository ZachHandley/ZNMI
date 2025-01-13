import { z } from "zod";
import { TransactionsApi } from "../api/transactionsApi.js";

import {
  TransactionRequestSchema,
  CaptureTransactionRequestSchema,
  RefundTransactionSchema,
  VoidTransactionRequestSchema,
  UpdateTransactionRequestSchema,
  type TransactionRequest,
  type CaptureTransactionRequest,
  type RefundTransaction,
  type VoidTransactionRequest,
  type UpdateTransactionRequest,
  type TransactionResponse,
} from "../types/transactionSchemas.js";

export class Transactions {
  transactionsApi: TransactionsApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this.transactionsApi = new TransactionsApi(securityKey);
    this._securityKey = securityKey;
  }

  async createTransaction(
    transactionData?: {
      amount: number;
      ccnumber: string;
      ccexp: string;
      cvv: string;
      transactionType: "sale" | "auth" | "credit" | "validate" | "offline";
      payment: "creditcard" | "check";
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
      const parsed = TransactionRequestSchema.safeParse({
        ...transactionData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for createTransaction: ${parsed.error.message}`,
        };
      }
      const transactionRequest: TransactionRequest = parsed.data;
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
      amount: number;
      ccnumber: string;
      ccexp: string;
      cvv: string;
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
      const parsed = TransactionRequestSchema.safeParse({
        type: "auth",
        payment: "creditcard",
        ...transactionData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for authorizeTransaction: ${parsed.error.message}`,
        };
      }
      const transactionRequest: TransactionRequest = parsed.data;
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

  async validateTransaction(
    transactionData?: {
      ccnumber: string;
      ccexp: string;
      cvv: string;
    },
    additionalOptions?: Partial<TransactionRequest>
  ): Promise<{
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
      const parsed = TransactionRequestSchema.safeParse({
        type: "validate",
        payment: "creditcard",
        ...transactionData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for validateTransaction: ${parsed.error.message}`,
        };
      }
      const transactionRequest: TransactionRequest = parsed.data;
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
      transactionid: string;
      amount: number;
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
      const parsed = CaptureTransactionRequestSchema.safeParse({
        type: "capture",
        ...transactionData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for captureTransaction: ${parsed.error.message}`,
        };
      }
      const captureRequest: CaptureTransactionRequest = parsed.data;
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
      transactionid: string;
      amount: number;
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
      const parsed = RefundTransactionSchema.safeParse({
        type: "refund",
        ...transactionData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for refundTransaction: ${parsed.error.message}`,
        };
      }
      const refundRequest: RefundTransaction = parsed.data;
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
      transactionid: string;
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
      const parsed = VoidTransactionRequestSchema.safeParse({
        type: "void",
        ...transactionData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for voidTransaction: ${parsed.error.message}`,
        };
      }
      const voidRequest: VoidTransactionRequest = parsed.data;
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
      transactionid: string;
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
      const parsed = UpdateTransactionRequestSchema.safeParse({
        type: "update",
        ...transactionData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for updateTransaction: ${parsed.error.message}`,
        };
      }
      const updateRequest: UpdateTransactionRequest = parsed.data;
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
