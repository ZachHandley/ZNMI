import {
  AddUpdateCustomerRequestSchema,
  CustomerVaultInitiatedTransactionSchema,
  DeleteCustomerRecordSchema,
  CUSTOMER_VAULT_URL,
  AddBillingForCustomerRequestSchema,
  UpdateBillingForCustomerRequestSchema,
  DeleteBillingForCustomerRequestSchema,
  ValidateCustomerByVaultIdRequestSchema,
  AuthorizeCustomerByVaultIdRequestSchema,
  SaleByVaultIdRequestSchema,
  CreditTransactionByVaultIdRequestSchema,
  OfflineTransactionByVaultIdRequestSchema,
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
type ValidateCustomerVaultIdRequest = z.infer<
  typeof ValidateCustomerByVaultIdRequestSchema
>;
type AuthorizeCustomerByVaultIdRequest = z.infer<
  typeof AuthorizeCustomerByVaultIdRequestSchema
>;
type SaleByVaultIdRequest = z.infer<typeof SaleByVaultIdRequestSchema>;
type CreditTransactionByVaultIdRequest = z.infer<
  typeof CreditTransactionByVaultIdRequestSchema
>;
type OfflineTransactionByVaultIdRequest = z.infer<
  typeof OfflineTransactionByVaultIdRequestSchema
>;

export class CustomerVaultApi {
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

  addOrUpdateCustomer = async (
    addUpdateCustomerRequest: AddUpdateCustomerRequest
  ) => {
    const request = this.beforeRequest(addUpdateCustomerRequest);
    return PostRequest(CUSTOMER_VAULT_URL, request);
  };

  validateCustomerVaultId = async (
    validateCustomerVaultIdRequest: ValidateCustomerVaultIdRequest
  ) => {
    const request = this.beforeRequest(validateCustomerVaultIdRequest);
    return PostRequest(CUSTOMER_VAULT_URL, request);
  };

  authorizeCustomerByVaultId = async (
    authorizeCustomerByVaultIdRequest: AuthorizeCustomerByVaultIdRequest
  ) => {
    const request = this.beforeRequest(authorizeCustomerByVaultIdRequest);
    return PostRequest(CUSTOMER_VAULT_URL, request);
  };

  saleByVaultId = async (saleByVaultIdRequest: SaleByVaultIdRequest) => {
    const request = this.beforeRequest(saleByVaultIdRequest);
    return PostRequest(CUSTOMER_VAULT_URL, request);
  };

  creditTransactionByVaultId = async (
    creditTransactionByVaultIdRequest: CreditTransactionByVaultIdRequest
  ) => {
    const request = this.beforeRequest(creditTransactionByVaultIdRequest);
    return PostRequest(CUSTOMER_VAULT_URL, request);
  };

  offlineTransactionByVaultId = async (
    offlineTransactionByVaultIdRequest: OfflineTransactionByVaultIdRequest
  ) => {
    const request = this.beforeRequest(offlineTransactionByVaultIdRequest);
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
