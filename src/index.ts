import { CustomerVault } from "./functions/customerVault";
import { Transactions } from "./functions/transactions";
import { ProductManager } from "./functions/productManager";
import { Invoices } from "./functions/invoices";
import { Recurring } from "./functions/recurring";
import {
  AddUpdateCustomerRequestSchema,
  CustomerVaultInitiatedTransactionSchema,
  DeleteCustomerRecordSchema,
} from "./types/customerVaultRequest";
import {
  AddRecurringPlanSchema,
  EditRecurringPlanSchema,
  AddSubscriptionToExistingPlanSchema,
  AddCustomSubscriptionSchema,
  UpdateSubscriptionSchema,
  DeleteSubscriptionRequestSchema,
} from "./types/recurringRequest";
import {
  TransactionRequestSchema,
  CaptureTransactionRequestSchema,
  RefundTransactionSchema,
  VoidTransactionRequestSchema,
  UpdateTransactionRequestSchema,
  TransactionResponseSchema,
  TRANSACTION_URL,
} from "./types/transactionSchemas";
import { z } from "zod";

type AddUpdateCustomerRequest = z.infer<typeof AddUpdateCustomerRequestSchema>;
type CustomerVaultInitiatedTransaction = z.infer<
  typeof CustomerVaultInitiatedTransactionSchema
>;
type DeleteCustomerRecord = z.infer<typeof DeleteCustomerRecordSchema>;
type AddRecurringPlan = z.infer<typeof AddRecurringPlanSchema>;
type EditRecurringPlan = z.infer<typeof EditRecurringPlanSchema>;
type AddSubscriptionToExistingPlan = z.infer<
  typeof AddSubscriptionToExistingPlanSchema
>;
type AddCustomSubscription = z.infer<typeof AddCustomSubscriptionSchema>;
type UpdateSubscription = z.infer<typeof UpdateSubscriptionSchema>;
type DeleteSubscriptionRequest = z.infer<
  typeof DeleteSubscriptionRequestSchema
>;
type TransactionRequest = z.infer<typeof TransactionRequestSchema>;
type CaptureTransactionRequest = z.infer<
  typeof CaptureTransactionRequestSchema
>;
type RefundTransaction = z.infer<typeof RefundTransactionSchema>;
type VoidTransactionRequest = z.infer<typeof VoidTransactionRequestSchema>;
type UpdateTransactionRequest = z.infer<typeof UpdateTransactionRequestSchema>;
type TransactionResponse = z.infer<typeof TransactionResponseSchema>;

export class ZNMI {
  _securityKey: string;
  public customerVault;
  public transactions;
  public products;
  public invoices;
  public recurring;

  constructor(securityKey: string) {
    if (!securityKey || securityKey === "")
      throw new Error("Security Key is required");
    this._securityKey = securityKey;
    this.customerVault = new CustomerVault(securityKey);
    this.transactions = new Transactions(securityKey);
    this.products = new ProductManager(securityKey);
    this.invoices = new Invoices(securityKey);
    this.recurring = new Recurring(securityKey);
  }

  async createTransaction(
    transactionType: "sale" | "auth" | "credit" | "validate" | "offline",
    payment: "creditcard" | "check",
    amount: number,
    ccnumber: string,
    ccexp: string,
    cvv?: string,
    additionalOptions: Partial<TransactionRequest> = {}
  ) {
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
      return await this.transactions.createTransaction(transactionRequest);
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        data: error,
        message: "Error in createTransaction",
      };
    }
  }

  async captureTransaction(
    transactionId: string,
    amount: number,
    additionalOptions: Partial<CaptureTransactionRequest> = {}
  ) {
    const captureRequest: CaptureTransactionRequest =
      CaptureTransactionRequestSchema.parse({
        type: "capture",
        security_key: this._securityKey,
        transaction_id: transactionId,
        amount,
        ...additionalOptions,
      });
    return await this.transactions.captureTransaction(captureRequest);
  }

  async refundTransaction(
    transactionId: string,
    amount: number,
    additionalOptions: Partial<RefundTransaction> = {}
  ) {
    const refundRequest: RefundTransaction = RefundTransactionSchema.parse({
      type: "refund",
      security_key: this._securityKey,
      transaction_id: transactionId,
      amount,
      ...additionalOptions,
    });
    return await this.transactions.refundTransaction(refundRequest);
  }

  async voidTransaction(
    transactionId: string,
    additionalOptions: Partial<VoidTransactionRequest> = {}
  ) {
    const voidRequest: VoidTransactionRequest =
      VoidTransactionRequestSchema.parse({
        type: "void",
        security_key: this._securityKey,
        transaction_id: transactionId,
        ...additionalOptions,
      });
    return await this.transactions.voidTransaction(voidRequest);
  }

  async updateTransaction(
    transactionId: string,
    additionalOptions: Partial<UpdateTransactionRequest> = {}
  ) {
    const updateRequest: UpdateTransactionRequest =
      UpdateTransactionRequestSchema.parse({
        type: "update",
        security_key: this._securityKey,
        transaction_id: transactionId,
        ...additionalOptions,
      });
    return await this.transactions.updateTransaction(updateRequest);
  }
}
