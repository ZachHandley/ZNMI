import { TransactionsApi } from "../api/transactionsApi.js";
import {
  type TransactionRequest,
  type CaptureTransactionRequest,
  type RefundTransaction,
  type VoidTransactionRequest,
  type UpdateTransactionRequest,
  type AuthTransactionRequest,
  type TransactionResponse,
  type ValidateTransactionRequest,
} from "../types/transactionSchemas.js";

type TransactionApiResponse = {
  status: number;
  data?: TransactionResponse;
  message: string;
};

export class Transactions {
  transactionsApi: TransactionsApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
    this.transactionsApi = new TransactionsApi(securityKey);
  }

  // Base transaction methods
  async createTransaction(
    request: Omit<TransactionRequest, "security_key">
  ): Promise<TransactionApiResponse> {
    try {
      const result = await this.transactionsApi.createTransaction(request);
      return {
        status: 200,
        data: result,
        message: "Transaction created successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in createTransaction: ${error.message}`,
      };
    }
  }

  async authorizeTransaction(
    request: AuthTransactionRequest
  ): Promise<TransactionApiResponse> {
    return this.createTransaction({
      ...request,
      type: "auth",
      payment: "creditcard",
    });
  }

  async validateTransaction(
    request: ValidateTransactionRequest
  ): Promise<TransactionApiResponse> {
    return this.createTransaction({
      ...request,
      type: "validate",
      payment: "creditcard",
    });
  }

  // Transaction type convenience methods
  async sale(
    request: Omit<TransactionRequest, "security_key" | "type">
  ): Promise<TransactionApiResponse> {
    return this.createTransaction({
      type: "sale",
      ...request,
    });
  }

  async auth(
    request: Omit<TransactionRequest, "security_key" | "type">
  ): Promise<TransactionApiResponse> {
    return this.createTransaction({
      type: "auth",
      ...request,
    });
  }

  async validate(
    request: Omit<TransactionRequest, "security_key" | "type">
  ): Promise<TransactionApiResponse> {
    return this.createTransaction({
      type: "validate",
      ...request,
    });
  }

  async credit(
    request: Omit<TransactionRequest, "security_key" | "type">
  ): Promise<TransactionApiResponse> {
    return this.createTransaction({
      type: "credit",
      ...request,
    });
  }

  async offline(
    request: Omit<TransactionRequest, "security_key" | "type">
  ): Promise<TransactionApiResponse> {
    return this.createTransaction({
      type: "offline",
      ...request,
    });
  }

  // Post-transaction operations
  async captureTransaction(
    request: Omit<CaptureTransactionRequest, "security_key">
  ): Promise<TransactionApiResponse> {
    try {
      const result = await this.transactionsApi.captureTransaction(request);
      return {
        status: 200,
        data: result,
        message: "Transaction captured successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in captureTransaction: ${error.message}`,
      };
    }
  }

  async refundTransaction(
    request: Omit<RefundTransaction, "security_key">
  ): Promise<TransactionApiResponse> {
    try {
      const result = await this.transactionsApi.refundTransaction(request);
      return {
        status: 200,
        data: result,
        message: "Transaction refunded successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in refundTransaction: ${error.message}`,
      };
    }
  }

  async voidTransaction(
    request: Omit<VoidTransactionRequest, "security_key">
  ): Promise<TransactionApiResponse> {
    try {
      const result = await this.transactionsApi.voidTransaction(request);
      return {
        status: 200,
        data: result,
        message: "Transaction voided successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in voidTransaction: ${error.message}`,
      };
    }
  }

  async updateTransaction(
    request: Omit<UpdateTransactionRequest, "security_key">
  ): Promise<TransactionApiResponse> {
    try {
      const result = await this.transactionsApi.updateTransaction(request);
      return {
        status: 200,
        data: result,
        message: "Transaction updated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in updateTransaction: ${error.message}`,
      };
    }
  }
}
