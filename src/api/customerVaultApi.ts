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
} from "../types/customerVaultRequest.js";
import {
  CustomerVaultResponseSchema,
  BillingResponseSchema,
} from "../types/responseTypes.js";

import { PostRequest } from "./utils.js";
import { z } from "zod";

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

  parseResponse = (data: any) => {
    return CustomerVaultResponseSchema.parse(data);
  };

  parseBillingResponse = (data: any) => {
    return BillingResponseSchema.parse(data);
  };

  addOrUpdateCustomer = async (
    addUpdateCustomerRequest: AddUpdateCustomerRequest
  ) => {
    const request = this.beforeRequest(addUpdateCustomerRequest);
    const response = await PostRequest(CUSTOMER_VAULT_URL, request);
    return this.parseResponse(response.data);
  };

  validateCustomerVaultId = async (
    validateCustomerVaultIdRequest: ValidateCustomerVaultIdRequest
  ) => {
    const request = this.beforeRequest(validateCustomerVaultIdRequest);
    const response = await PostRequest(CUSTOMER_VAULT_URL, request);
    return this.parseResponse(response.data);
  };

  authorizeCustomerByVaultId = async (
    authorizeCustomerByVaultIdRequest: AuthorizeCustomerByVaultIdRequest
  ) => {
    const request = this.beforeRequest(authorizeCustomerByVaultIdRequest);
    const response = await PostRequest(CUSTOMER_VAULT_URL, request);
    return this.parseResponse(response.data);
  };

  saleByVaultId = async (saleByVaultIdRequest: SaleByVaultIdRequest) => {
    const request = this.beforeRequest(saleByVaultIdRequest);
    const response = await PostRequest(CUSTOMER_VAULT_URL, request);
    return this.parseResponse(response.data);
  };

  creditTransactionByVaultId = async (
    creditTransactionByVaultIdRequest: CreditTransactionByVaultIdRequest
  ) => {
    const request = this.beforeRequest(creditTransactionByVaultIdRequest);
    const response = await PostRequest(CUSTOMER_VAULT_URL, request);
    return this.parseResponse(response.data);
  };

  offlineTransactionByVaultId = async (
    offlineTransactionByVaultIdRequest: OfflineTransactionByVaultIdRequest
  ) => {
    const request = this.beforeRequest(offlineTransactionByVaultIdRequest);
    const response = await PostRequest(CUSTOMER_VAULT_URL, request);
    return this.parseResponse(response.data);
  };

  initiateCustomerVaultTransaction = async (
    customerVaultInitiatedTransaction: CustomerVaultInitiatedTransaction
  ) => {
    const request = this.beforeRequest(customerVaultInitiatedTransaction);
    const response = await PostRequest(CUSTOMER_VAULT_URL, request);
    return this.parseResponse(response.data);
  };

  deleteCustomer = async (deleteCustomerRecord: DeleteCustomerRecord) => {
    const request = this.beforeRequest(deleteCustomerRecord);
    const response = await PostRequest(CUSTOMER_VAULT_URL, request);
    return this.parseResponse(response.data);
  };

  addBillingForCustomer = async (
    addBillingForCustomerRequest: AddBillingForCustomerRequest
  ) => {
    const request = this.beforeRequest(addBillingForCustomerRequest);
    const response = await PostRequest(CUSTOMER_VAULT_URL, request);
    return this.parseBillingResponse(response.data);
  };

  updateBillingForCustomer = async (
    updateBillingForCustomerRequest: UpdateBillingForCustomerRequest
  ) => {
    const request = this.beforeRequest(updateBillingForCustomerRequest);
    const response = await PostRequest(CUSTOMER_VAULT_URL, request);
    return this.parseBillingResponse(response.data);
  };

  deleteBillingForCustomer = async (
    deleteBillingForCustomerRequest: DeleteBillingForCustomerRequest
  ) => {
    const request = this.beforeRequest(deleteBillingForCustomerRequest);
    const response = await PostRequest(CUSTOMER_VAULT_URL, request);
    return this.parseBillingResponse(response.data);
  };
}
