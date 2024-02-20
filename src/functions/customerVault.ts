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
import {
  CustomerVaultResponseSchema,
  BillingResponseSchema,
} from "@/types/responseTypes";

export type AddUpdateCustomerRequest = z.infer<
  typeof AddUpdateCustomerRequestSchema
>;
export type CustomerVaultInitiatedTransaction = z.infer<
  typeof CustomerVaultInitiatedTransactionSchema
>;
export type DeleteCustomerRecord = z.infer<typeof DeleteCustomerRecordSchema>;
export type AddBillingForCustomerRequest = z.infer<
  typeof AddBillingForCustomerRequestSchema
>;
export type UpdateBillingForCustomerRequest = z.infer<
  typeof UpdateBillingForCustomerRequestSchema
>;
export type DeleteBillingForCustomerRequest = z.infer<
  typeof DeleteBillingForCustomerRequestSchema
>;
export type ValidateCustomerVaultIdRequest = z.infer<
  typeof ValidateCustomerByVaultIdRequestSchema
>;
export type AuthorizeCustomerByVaultIdRequest = z.infer<
  typeof AuthorizeCustomerByVaultIdRequestSchema
>;
export type SaleByVaultIdRequest = z.infer<typeof SaleByVaultIdRequestSchema>;
export type CreditTransactionByVaultIdRequest = z.infer<
  typeof CreditTransactionByVaultIdRequestSchema
>;
export type OfflineTransactionByVaultIdRequest = z.infer<
  typeof OfflineTransactionByVaultIdRequestSchema
>;
export type CustomerVaultResponse = z.infer<typeof CustomerVaultResponseSchema>;
export type BillingResponse = z.infer<typeof BillingResponseSchema>;

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
    additionalOptions?: Partial<ValidateCustomerVaultIdRequest>
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const validateCustomerByVaultId: ValidateCustomerVaultIdRequest =
        ValidateCustomerByVaultIdRequestSchema.parse({
          type: "validate",
          ...validateData,
          ...additionalOptions,
        });
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
      const authorizeCustomerByVaultId: AuthorizeCustomerByVaultIdRequest =
        AuthorizeCustomerByVaultIdRequestSchema.parse({
          type: "auth",
          ...authorizeData,
          ...additionalOptions,
        });
      const result = await this.customerVaultApi.authorizeCustomerByVaultId(
        authorizeCustomerByVaultId
      );
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Customer authorized successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in authorizeCustomerByVaultId ${error.message}`,
      };
    }
  }

  async saleByVaultId(
    saleData?: {
      customer_vault_id: string | number;
      amount: number;
      billing_id?: string;
    },
    additionalOptions?: Partial<SaleByVaultIdRequest>
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const saleByVaultId: SaleByVaultIdRequest =
        SaleByVaultIdRequestSchema.parse({
          type: "sale",
          ...saleData,
          ...additionalOptions,
        });
      const result = await this.customerVaultApi.saleByVaultId(saleByVaultId);
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Sale completed successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in saleByVaultId ${error.message}`,
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
      const creditTransactionByVaultId: CreditTransactionByVaultIdRequest =
        CreditTransactionByVaultIdRequestSchema.parse({
          type: "credit",
          ...creditData,
          ...additionalOptions,
        });
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
      const offlineTransactionByVaultId: OfflineTransactionByVaultIdRequest =
        OfflineTransactionByVaultIdRequestSchema.parse({
          type: "offline",
          ...offlineData,
          ...additionalOptions,
        });
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
      const deleteCustomerRecord: DeleteCustomerRecord =
        DeleteCustomerRecordSchema.parse({
          customer_vault: "delete_customer",
          ...deleteData,
          ...additionalOptions,
        });
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
