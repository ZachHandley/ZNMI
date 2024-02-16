import {
  AddUpdateCustomerRequestSchema,
  CustomerVaultInitiatedTransactionSchema,
  DeleteCustomerRecordSchema,
  CUSTOMER_VAULT_URL,
  AddBillingForCustomerRequestSchema,
  UpdateBillingForCustomerRequestSchema,
  DeleteBillingForCustomerRequestSchema,
} from "../types/customerVaultRequest";
import { z } from "zod";
import { PostRequest } from "./utils";

type AddUpdateCustomerRequest = z.infer<typeof AddUpdateCustomerRequestSchema>;
type CustomerVaultInitiatedTransaction = z.infer<
  typeof CustomerVaultInitiatedTransactionSchema
>;
type DeleteCustomerRecord = z.infer<typeof DeleteCustomerRecordSchema>;
type AddBillingForCustomerRequest = z.infer<
  typeof AddBillingForCustomerRequestSchema
>;
type UpdateBillingForCustomerRequest = z.infer<
  typeof UpdateBillingForCustomerRequestSchema
>;
type DeleteBillingForCustomerRequest = z.infer<
  typeof DeleteBillingForCustomerRequestSchema
>;

export class CustomerVaultApi {
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

  addOrUpdateCustomer = async (
    addUpdateCustomerRequest: AddUpdateCustomerRequest
  ) => {
    const request = this.beforeRequest(addUpdateCustomerRequest);
    return PostRequest(CUSTOMER_VAULT_URL, request);
  };

  initiateCustomerVaultTransaction = async (
    customerVaultInitiatedTransaction: CustomerVaultInitiatedTransaction
  ) => {
    const request = this.beforeRequest(customerVaultInitiatedTransaction);
    return PostRequest(CUSTOMER_VAULT_URL, request);
  };

  deleteCustomer = async (deleteCustomerRecord: DeleteCustomerRecord) => {
    const request = this.beforeRequest(deleteCustomerRecord);
    return PostRequest(CUSTOMER_VAULT_URL, request);
  };

  addBillingForCustomer = async (
    addBillingForCustomerRequest: AddBillingForCustomerRequest
  ) => {
    const request = this.beforeRequest(addBillingForCustomerRequest);
    return PostRequest(CUSTOMER_VAULT_URL, request);
  };

  updateBillingForCustomer = async (
    updateBillingForCustomerRequest: UpdateBillingForCustomerRequest
  ) => {
    const request = this.beforeRequest(updateBillingForCustomerRequest);
    return PostRequest(CUSTOMER_VAULT_URL, request);
  };

  deleteBillingForCustomer = async (
    deleteBillingForCustomerRequest: DeleteBillingForCustomerRequest
  ) => {
    const request = this.beforeRequest(deleteBillingForCustomerRequest);
    return PostRequest(CUSTOMER_VAULT_URL, request);
  };
}
