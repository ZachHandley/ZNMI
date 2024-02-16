import { CustomerVaultApi } from "./api/customerVaultApi";
import { TransactionsApi } from "./api/transactionsApi";
import { ProductManagerApi } from "./api/productManagerApi";
import { InvoicesApi } from "./api/invoicesApi";
import { RecurringApi } from "./api/recurringApi";
import { DefaultResponseSchema } from "./types/base";
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
type DefaultResponse = z.infer<typeof DefaultResponseSchema>;

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
    this.customerVault = new CustomerVaultApi(securityKey);
    this.transactions = new TransactionsApi(securityKey);
    this.products = new ProductManagerApi(securityKey);
    this.invoices = new InvoicesApi(securityKey);
    this.recurring = new RecurringApi(securityKey);
  }
}
