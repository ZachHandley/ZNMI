import {
  TransactionRequestSchema,
  CaptureTransactionRequestSchema,
  RefundTransactionSchema,
  VoidTransactionRequestSchema,
  UpdateTransactionRequestSchema,
  TRANSACTION_URL,
} from "../types/transactionRequest";
import { z } from "zod";
import { PostRequest } from "./utils";

type TransactionRequest = z.infer<typeof TransactionRequestSchema>;
type CaptureTransactionRequest = z.infer<
  typeof CaptureTransactionRequestSchema
>;
type RefundTransaction = z.infer<typeof RefundTransactionSchema>;
type VoidTransactionRequest = z.infer<typeof VoidTransactionRequestSchema>;
type UpdateTransactionRequest = z.infer<typeof UpdateTransactionRequestSchema>;

export class Transactions {
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

  createTransaction = async (transactionRequest: TransactionRequest) => {
    const request = this.beforeRequest(transactionRequest);
    return PostRequest(TRANSACTION_URL, request);
  };

  captureTransaction = async (
    captureTransactionRequest: CaptureTransactionRequest
  ) => {
    const request = this.beforeRequest(captureTransactionRequest);
    return PostRequest(TRANSACTION_URL, request);
  };

  refundTransaction = async (refundTransaction: RefundTransaction) => {
    const request = this.beforeRequest(refundTransaction);
    return PostRequest(TRANSACTION_URL, request);
  };

  voidTransaction = async (voidTransactionRequest: VoidTransactionRequest) => {
    const request = this.beforeRequest(voidTransactionRequest);
    return PostRequest(TRANSACTION_URL, request);
  };

  updateTransaction = async (
    updateTransactionRequest: UpdateTransactionRequest
  ) => {
    const request = this.beforeRequest(updateTransactionRequest);
    return PostRequest(TRANSACTION_URL, request);
  };
}
