import {
  TransactionRequestSchema,
  CaptureTransactionRequestSchema,
  RefundTransactionSchema,
  VoidTransactionRequestSchema,
  UpdateTransactionRequestSchema,
  TransactionResponseSchema,
  TRANSACTION_URL,
} from "../types/transactionSchemas.js";
import { z } from "zod";
import { PostRequest } from "./utils.js";

type TransactionRequest = z.infer<typeof TransactionRequestSchema>;
type CaptureTransactionRequest = z.infer<
  typeof CaptureTransactionRequestSchema
>;
type RefundTransaction = z.infer<typeof RefundTransactionSchema>;
type VoidTransactionRequest = z.infer<typeof VoidTransactionRequestSchema>;
type UpdateTransactionRequest = z.infer<typeof UpdateTransactionRequestSchema>;

export class TransactionsApi {
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
    return TransactionResponseSchema.parse(data);
  };

  createTransaction = async (transactionRequest: TransactionRequest) => {
    const request = this.beforeRequest(transactionRequest);
    const response = await PostRequest(TRANSACTION_URL, request);
    return this.parseResponse(response.data);
  };

  captureTransaction = async (
    captureTransactionRequest: CaptureTransactionRequest
  ) => {
    const request = this.beforeRequest(captureTransactionRequest);
    const response = await PostRequest(TRANSACTION_URL, request);
    return this.parseResponse(response.data);
  };

  refundTransaction = async (refundTransaction: RefundTransaction) => {
    const request = this.beforeRequest(refundTransaction);
    const response = await PostRequest(TRANSACTION_URL, request);
    return this.parseResponse(response.data);
  };

  voidTransaction = async (voidTransactionRequest: VoidTransactionRequest) => {
    const request = this.beforeRequest(voidTransactionRequest);
    const response = await PostRequest(TRANSACTION_URL, request);
    return this.parseResponse(response.data);
  };

  updateTransaction = async (
    updateTransactionRequest: UpdateTransactionRequest
  ) => {
    const request = this.beforeRequest(updateTransactionRequest);
    const response = await PostRequest(TRANSACTION_URL, request);
    return this.parseResponse(response.data);
  };
}
