import {
  AddUpdateCustomerRequestSchema,
  CustomerVaultInitiatedTransactionSchema,
  DeleteCustomerRecordSchema,
  CUSTOMER_VAULT_URL,
} from "../types/customerVaultRequest";
import { z } from "zod";
import { PostRequest } from "./utils";

type AddUpdateCustomerRequest = z.infer<typeof AddUpdateCustomerRequestSchema>;
type CustomerVaultInitiatedTransaction = z.infer<
  typeof CustomerVaultInitiatedTransactionSchema
>;
type DeleteCustomerRecord = z.infer<typeof DeleteCustomerRecordSchema>;

export class CustomerVault {
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
}
