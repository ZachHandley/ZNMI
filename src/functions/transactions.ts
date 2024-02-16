import { z } from "zod";
import { TransactionsApi } from "../api/transactionsApi";
import {
  TransactionRequestSchema,
  CaptureTransactionRequestSchema,
  RefundTransactionSchema,
  VoidTransactionRequestSchema,
  UpdateTransactionRequestSchema,
  TransactionResponseSchema,
} from "../types/transactionSchemas";

type TransactionRequest = z.infer<typeof TransactionRequestSchema>;
type CaptureTransactionRequest = z.infer<
  typeof CaptureTransactionRequestSchema
>;
type RefundTransaction = z.infer<typeof RefundTransactionSchema>;
type VoidTransactionRequest = z.infer<typeof VoidTransactionRequestSchema>;
type UpdateTransactionRequest = z.infer<typeof UpdateTransactionRequestSchema>;
type TransactionResponse = z.infer<typeof TransactionResponseSchema>;

export class Transactions {
  transactionsApi: TransactionsApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this.transactionsApi = new TransactionsApi(securityKey);
    this._securityKey = securityKey;
  }

  async createTransaction(
    amount: number,
    ccnumber: string,
    ccexp: string,
    cvv?: string,
    transactionType:
      | "sale"
      | "auth"
      | "credit"
      | "validate"
      | "offline" = "sale",
    payment: "creditcard" | "check" = "creditcard",
    additionalOptions?: Partial<TransactionRequest>
  ): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      const transactionRequest: TransactionRequest =
        TransactionRequestSchema.parse({
          type: transactionType,
          payment: payment,
          security_key: this._securityKey,
          amount: amount,
          ccnumber: ccnumber,
          ccexp: ccexp,
          cvv: cvv,
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
    amount: number,
    ccnumber: string,
    ccexp: string,
    cvv?: string,
    additionalOptions?: Partial<TransactionRequest>
  ): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      const transactionRequest: TransactionRequest =
        TransactionRequestSchema.parse({
          type: "auth",
          payment: "creditcard",
          security_key: this._securityKey,
          amount: amount,
          ccnumber: ccnumber,
          ccexp: ccexp,
          cvv: cvv,
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

  async validateTransaction(
    ccnumber: string,
    ccexp: string,
    cvv?: string
  ): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      const transactionRequest: TransactionRequest =
        TransactionRequestSchema.parse({
          type: "validate",
          payment: "creditcard",
          security_key: this._securityKey,
          ccnumber: ccnumber,
          ccexp: ccexp,
          cvv: cvv,
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
    transactionId: string,
    amount: number,
    additionalOptions: Partial<CaptureTransactionRequest> = {}
  ): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      const captureRequest: CaptureTransactionRequest =
        CaptureTransactionRequestSchema.parse({
          type: "capture",
          security_key: this._securityKey,
          transaction_id: transactionId,
          amount,
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
    transactionId: string,
    amount: number,
    additionalOptions: Partial<RefundTransaction> = {}
  ): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      const refundRequest: RefundTransaction = RefundTransactionSchema.parse({
        type: "refund",
        security_key: this._securityKey,
        transaction_id: transactionId,
        amount,
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
    transactionId: string,
    additionalOptions: Partial<VoidTransactionRequest> = {}
  ): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      const voidRequest: VoidTransactionRequest =
        VoidTransactionRequestSchema.parse({
          type: "void",
          security_key: this._securityKey,
          transaction_id: transactionId,
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
    transactionId: string,
    additionalOptions: Partial<UpdateTransactionRequest> = {}
  ): Promise<{
    status: number;
    data?: TransactionResponse;
    message: string;
  }> {
    try {
      const updateRequest: UpdateTransactionRequest =
        UpdateTransactionRequestSchema.parse({
          type: "update",
          security_key: this._securityKey,
          transaction_id: transactionId,
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
