import { z } from "zod";
import { CustomerVaultApi } from "../api/customerVaultApi";
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
} from "../types/customerVaultRequest";

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
    data?: any;
    message: string;
  }> {
    try {
      if (!customerData && !additionalOptions) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const addCustomerRequest: AddUpdateCustomerRequest =
        AddUpdateCustomerRequestSchema.parse({
          customer_vault: "add_customer",
          ...customerData,
          ...additionalOptions,
        });
      const result = await this.customerVaultApi.addOrUpdateCustomer(
        addCustomerRequest
      );
      return {
        status: 200,
        data: result.data,
        message: result.data.responsetext || "Customer added successfully",
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
    data?: any;
    message: string;
  }> {
    try {
      const updateCustomerRequest: AddUpdateCustomerRequest =
        AddUpdateCustomerRequestSchema.parse({
          customer_vault: "update_customer",
          ...customerData,
          ...additionalOptions,
        });
      const result = await this.customerVaultApi.addOrUpdateCustomer(
        updateCustomerRequest
      );
      return {
        status: 200,
        data: result.data,
        message: result.data.responsetext || "Customer updated successfully",
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
    data?: any;
    message: string;
  }> {
    try {
      const customerVaultInitiatedTransaction: CustomerVaultInitiatedTransaction =
        CustomerVaultInitiatedTransactionSchema.parse({
          customer_vault: "initiate_transaction",
          ...transactionData,
          ...additionalOptions,
        });
      const result =
        await this.customerVaultApi.initiateCustomerVaultTransaction(
          customerVaultInitiatedTransaction
        );
      return {
        status: 200,
        data: result.data,
        message:
          result.data.responsetext ||
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
    data?: any;
    message: string;
  }> {
    try {
      const addBillingRequest: AddBillingForCustomerRequest =
        AddBillingForCustomerRequestSchema.parse({
          customer_vault: "add_billing",
          ...billingData,
          ...additionalOptions,
        });
      const result = await this.customerVaultApi.addBillingForCustomer(
        addBillingRequest
      );
      return {
        status: 200,
        data: result.data,
        message: result.data.responsetext || "Billing added successfully",
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
    data?: any;
    message: string;
  }> {
    try {
      const updateBillingRequest: UpdateBillingForCustomerRequest =
        UpdateBillingForCustomerRequestSchema.parse({
          customer_vault: "update_billing",
          ...billingData,
          ...additionalOptions,
        });
      const result = await this.customerVaultApi.updateBillingForCustomer(
        updateBillingRequest
      );
      return {
        status: 200,
        data: result.data,
        message: "Billing updated successfully",
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
    data?: any;
    message: string;
  }> {
    try {
      const deleteBillingRequest: DeleteBillingForCustomerRequest =
        DeleteBillingForCustomerRequestSchema.parse({
          customer_vault: "delete_billing",
          ...deleteData,
          ...additionalOptions,
        });
      const result = await this.customerVaultApi.deleteBillingForCustomer(
        deleteBillingRequest
      );
      return {
        status: 200,
        data: result.data,
        message: "Billing deleted successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in deleteBillingForCustomer ${error.message}`,
      };
    }
  }
}
