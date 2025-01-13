import { z } from "zod";
import { CustomerVaultApi } from "../api/customerVaultApi.js";

import {
  AddUpdateCustomerRequestSchema,
  CustomerVaultInitiatedTransactionSchema,
  DeleteCustomerRecordSchema,
  AddBillingForCustomerRequestSchema,
  UpdateBillingForCustomerRequestSchema,
  DeleteBillingForCustomerRequestSchema,
  ValidateCustomerByVaultIdRequestSchema,
  AuthorizeCustomerByVaultIdRequestSchema,
  SaleByVaultIdRequestSchema,
  CreditTransactionByVaultIdRequestSchema,
  OfflineTransactionByVaultIdRequestSchema,
  type AddUpdateCustomerRequest,
  type CustomerVaultInitiatedTransaction,
  type DeleteCustomerRecord,
  type AddBillingForCustomerRequest,
  type UpdateBillingForCustomerRequest,
  type DeleteBillingForCustomerRequest,
  type ValidateCustomerByVaultIdRequest,
  type AuthorizeCustomerByVaultIdRequest,
  type CreditTransactionByVaultIdRequest,
  type OfflineTransactionByVaultIdRequest,
} from "../types/customerVaultRequest.js";
import {
  CustomerVaultResponseSchema,
  BillingResponseSchema,
  type CustomerVaultResponse,
  type BillingResponse,
} from "../types/responseTypes.js";

export class CustomerVault {
  customerVaultApi: CustomerVaultApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this.customerVaultApi = new CustomerVaultApi(securityKey);
    this._securityKey = securityKey;
  }

  async addCustomer(
    customerData?: {
      ccnumber?: string;
      ccexp?: string;
      customer_vault_id?: string;
      first_name?: string;
      last_name?: string;
      company?: string;
      address1?: string;
      address2?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
      phone?: string;
      email?: string;
      fax?: string;
    },
    additionalOptions?: Partial<AddUpdateCustomerRequest>
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      if (!customerData && !additionalOptions) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const parsed = AddUpdateCustomerRequestSchema.safeParse({
        customer_vault: "add_customer",
        ...customerData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data ${parsed.error.message}`,
        };
      }
      const addCustomerRequest: AddUpdateCustomerRequest = parsed.data;
      const result = await this.customerVaultApi.addOrUpdateCustomer(
        addCustomerRequest
      );
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Customer added successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in addCustomer ${error.message}`,
      };
    }
  }

  async updateCustomer(
    customerData?: {
      customer_vault_id: string | number;
      ccnumber?: string;
      ccexp?: string;
      first_name?: string;
      last_name?: string;
      company?: string;
      address1?: string;
      address2?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
      phone?: string;
      email?: string;
      fax?: string;
    },
    additionalOptions?: Partial<AddUpdateCustomerRequest>
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const parsed = AddUpdateCustomerRequestSchema.safeParse({
        customer_vault: "update_customer",
        ...customerData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data ${parsed.error.message}`,
        };
      }
      const updateCustomerRequest: AddUpdateCustomerRequest = parsed.data;
      const result = await this.customerVaultApi.addOrUpdateCustomer(
        updateCustomerRequest
      );
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Customer updated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in updateCustomer ${error.message}`,
      };
    }
  }

  async initiateCustomerVaultTransaction(
    transactionData?: {
      customer_vault_id: string | number;
      amount: number;
    },
    additionalOptions?: Partial<CustomerVaultInitiatedTransaction>
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const parsed = CustomerVaultInitiatedTransactionSchema.safeParse({
        customer_vault: "initiate_transaction",
        ...transactionData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data ${parsed.error.message}`,
        };
      }
      const customerVaultInitiatedTransaction: CustomerVaultInitiatedTransaction =
        parsed.data;
      const result =
        await this.customerVaultApi.initiateCustomerVaultTransaction(
          customerVaultInitiatedTransaction
        );
      return {
        status: 200,
        data: result,
        message:
          result.responsetext ||
          "Customer vault transaction initiated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in initiateCustomerVaultTransaction ${error.message}`,
      };
    }
  }

  async validateCustomerByVaultId(
    validateData?: {
      customer_vault_id: string | number;
    },
    additionalOptions?: Partial<ValidateCustomerByVaultIdRequest>
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const parsed = ValidateCustomerByVaultIdRequestSchema.safeParse({
        type: "validate",
        ...validateData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for validateCustomerByVaultId ${parsed.error.message}`,
        };
      }
      const validateCustomerByVaultId: ValidateCustomerByVaultIdRequest =
        parsed.data;
      const result = await this.customerVaultApi.validateCustomerVaultId(
        validateCustomerByVaultId
      );

      return {
        status: 200,
        data: result,
        message: result.responsetext || "Customer validated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in validateCustomerByVaultId ${error.message}`,
      };
    }
  }

  async authorizeCustomerByVaultId(
    authorizeData?: {
      customer_vault_id: string | number;
      amount: number;
    },
    additionalOptions?: Partial<AuthorizeCustomerByVaultIdRequest>
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const parsed = AuthorizeCustomerByVaultIdRequestSchema.safeParse({
        type: "auth",
        ...authorizeData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for authorizeCustomerByVaultId ${parsed.error.message}`,
        };
      }
      const authorizeCustomerByVaultId: AuthorizeCustomerByVaultIdRequest =
        parsed.data;
      const result = await this.customerVaultApi.authorizeCustomerByVaultId(
        authorizeCustomerByVaultId
      );
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Authorization completed successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in authorizeCustomerByVaultId ${error.message}`,
      };
    }
  }

  async creditTransactionByVaultId(
    creditData?: {
      customer_vault_id: string | number;
      amount: number;
      billing_id?: string;
    },
    additionalOptions?: Partial<CreditTransactionByVaultIdRequest>
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const parsed = CreditTransactionByVaultIdRequestSchema.safeParse({
        type: "credit",
        ...creditData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for creditTransactionByVaultId ${parsed.error.message}`,
        };
      }
      const creditTransactionByVaultId: CreditTransactionByVaultIdRequest =
        parsed.data;
      const result = await this.customerVaultApi.creditTransactionByVaultId(
        creditTransactionByVaultId
      );
      return {
        status: 200,
        data: result,
        message:
          result.responsetext || "Credit transaction completed successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in creditTransactionByVaultId ${error.message}`,
      };
    }
  }

  async offlineTransactionByVaultId(
    offlineData?: {
      customer_vault_id: string | number;
      amount: number;
      billing_id?: string;
    },
    additionalOptions?: Partial<OfflineTransactionByVaultIdRequest>
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const parsed = OfflineTransactionByVaultIdRequestSchema.safeParse({
        type: "offline",
        ...offlineData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for offlineTransactionByVaultId ${parsed.error.message}`,
        };
      }
      const offlineTransactionByVaultId: OfflineTransactionByVaultIdRequest =
        parsed.data;
      const result = await this.customerVaultApi.offlineTransactionByVaultId(
        offlineTransactionByVaultId
      );
      return {
        status: 200,
        data: result,
        message:
          result.responsetext || "Offline transaction completed successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in offlineTransactionByVaultId ${error.message}`,
      };
    }
  }

  async addBillingToCustomer(
    billingData?: {
      customer_vault_id: string | number;
      ccnumber?: string;
      ccexp?: string;
      first_name?: string;
      last_name?: string;
      company?: string;
      address1?: string;
      address2?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
      phone?: string;
      fax?: string;
      email?: string;
    },
    additionalOptions?: Partial<AddBillingForCustomerRequest>
  ): Promise<{
    status: number;
    data?: BillingResponse;
    message: string;
  }> {
    try {
      const parsed = AddBillingForCustomerRequestSchema.safeParse({
        customer_vault: "add_billing",
        ...billingData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for addBillingToCustomer ${parsed.error.message}`,
        };
      }
      const addBillingRequest: AddBillingForCustomerRequest = parsed.data;
      const result = await this.customerVaultApi.addBillingForCustomer(
        addBillingRequest
      );
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Billing added successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in addBillingToCustomer ${error.message}`,
      };
    }
  }

  async updateBillingForCustomer(
    billingData?: {
      billing_id: string;
      customer_vault_id: string | number;
      ccnumber?: string;
      ccexp?: string;
      first_name?: string;
      last_name?: string;
      company?: string;
      address1?: string;
      address2?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
      phone?: string;
      fax?: string;
      email?: string;
    },
    additionalOptions?: Partial<UpdateBillingForCustomerRequest>
  ): Promise<{
    status: number;
    data?: BillingResponse;
    message: string;
  }> {
    try {
      const parsed = UpdateBillingForCustomerRequestSchema.safeParse({
        customer_vault: "update_billing",
        ...billingData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for updateBillingForCustomer ${parsed.error.message}`,
        };
      }
      const updateBillingRequest: UpdateBillingForCustomerRequest = parsed.data;
      const result = await this.customerVaultApi.updateBillingForCustomer(
        updateBillingRequest
      );
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Billing updated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in updateBillingForCustomer ${error.message}`,
      };
    }
  }

  async deleteBillingForCustomer(
    deleteData?: {
      billing_id: string;
      customer_vault_id: string | number;
    },
    additionalOptions?: Partial<DeleteBillingForCustomerRequest>
  ): Promise<{
    status: number;
    data?: BillingResponse;
    message: string;
  }> {
    try {
      const parsed = DeleteBillingForCustomerRequestSchema.safeParse({
        customer_vault: "delete_billing",
        ...deleteData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for deleteBillingForCustomer ${parsed.error.message}`,
        };
      }
      const deleteBillingRequest: DeleteBillingForCustomerRequest = parsed.data;
      const result = await this.customerVaultApi.deleteBillingForCustomer(
        deleteBillingRequest
      );
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Billing deleted successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in deleteBillingForCustomer ${error.message}`,
      };
    }
  }

  async deleteCustomerRecord(
    deleteData?: {
      customer_vault_id: string | number;
    },
    additionalOptions?: Partial<DeleteCustomerRecord>
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const parsed = DeleteCustomerRecordSchema.safeParse({
        customer_vault: "delete_customer",
        ...deleteData,
        ...additionalOptions,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for deleteCustomerRecord ${parsed.error.message}`,
        };
      }
      const deleteCustomerRecord: DeleteCustomerRecord = parsed.data;
      const result = await this.customerVaultApi.deleteCustomer(
        deleteCustomerRecord
      );
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Customer deleted successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in deleteCustomerRecord ${error.message}`,
      };
    }
  }
}
