import { z } from "zod";
import { CustomerVaultApi } from "../api/customerVaultApi";
import {
  AddUpdateCustomerRequestSchema,
  CustomerVaultInitiatedTransactionSchema,
  DeleteCustomerRecordSchema,
  AddBillingForCustomerRequestSchema,
  UpdateBillingForCustomerRequestSchema,
  DeleteBillingForCustomerRequestSchema,
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

export class CustomerVault {
  customerVaultApi: CustomerVaultApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this.customerVaultApi = new CustomerVaultApi(securityKey);
    this._securityKey = securityKey;
  }

  async addCustomer(
    ccnumber: string,
    ccexp: string,
    customer_vault_id?: string,
    first_name?: string,
    last_name?: string,
    company?: string,
    address1?: string,
    address2?: string,
    city?: string,
    state?: string,
    zip?: string,
    country?: string,
    phone?: string,
    email?: string,
    fax?: string,
    additionalOptions?: Partial<AddUpdateCustomerRequest>
  ): Promise<{
    status: number;
    data?: any;
    message: string;
  }> {
    try {
      const addCustomerRequest: AddUpdateCustomerRequest =
        AddUpdateCustomerRequestSchema.parse({
          type: "add_customer",
          ccnumber: ccnumber,
          ccexp: ccexp,
          company: company,
          customer_vault_id: customer_vault_id,
          first_name: first_name,
          last_name: last_name,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          zip: zip,
          country: country,
          phone: phone,
          email: email,
          fax: fax,
          ...additionalOptions,
        });
      const result = await this.customerVaultApi.addOrUpdateCustomer(
        addCustomerRequest
      );
      return {
        status: 200,
        data: result.data,
        message: "Customer added successfully",
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
    customer_vault_id: string,
    ccnumber?: string,
    ccexp?: string,
    first_name?: string,
    last_name?: string,
    company?: string,
    address1?: string,
    address2?: string,
    city?: string,
    state?: string,
    zip?: string,
    country?: string,
    phone?: string,
    email?: string,
    fax?: string,
    additionalOptions?: Partial<AddUpdateCustomerRequest>
  ): Promise<{
    status: number;
    data?: any;
    message: string;
  }> {
    try {
      const updateCustomerRequest: AddUpdateCustomerRequest =
        AddUpdateCustomerRequestSchema.parse({
          type: "update_customer",
          customer_vault_id: customer_vault_id,
          first_name: first_name,
          last_name: last_name,
          company: company,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          zip: zip,
          country: country,
          phone: phone,
          email: email,
          fax: fax,
          ccnumber: ccnumber,
          ccexp: ccexp,
          ...additionalOptions,
        });
      const result = await this.customerVaultApi.addOrUpdateCustomer(
        updateCustomerRequest
      );
      return {
        status: 200,
        data: result.data,
        message: "Customer updated successfully",
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
    customer_vault_id: string,
    amount: number,
    additionalOptions: Partial<CustomerVaultInitiatedTransaction>
  ): Promise<{
    status: number;
    data?: any;
    message: string;
  }> {
    try {
      const customerVaultInitiatedTransaction: CustomerVaultInitiatedTransaction =
        CustomerVaultInitiatedTransactionSchema.parse({
          type: "initiate_transaction",
          customer_vault_id: customer_vault_id,
          amount,
          ...additionalOptions,
        });
      const result =
        await this.customerVaultApi.initiateCustomerVaultTransaction(
          customerVaultInitiatedTransaction
        );
      return {
        status: 200,
        data: result.data,
        message: "Customer vault transaction initiated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in initiateCustomerVaultTransaction ${error.message}`,
      };
    }
  }

  async deleteCustomer(
    customer_vault_id: string,
    additionalOptions: Partial<DeleteCustomerRecord>
  ): Promise<{
    status: number;
    data?: any;
    message: string;
  }> {
    try {
      const deleteCustomerRecord: DeleteCustomerRecord =
        DeleteCustomerRecordSchema.parse({
          type: "delete_customer",
          customer_vault_id,
          ...additionalOptions,
        });
      const result = await this.customerVaultApi.deleteCustomer(
        deleteCustomerRecord
      );
      return {
        status: 200,
        data: result.data,
        message: "Customer deleted successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in deleteCustomer ${error.message}`,
      };
    }
  }

  async addBillingToCustomer(
    customer_vault_id: string,
    ccnumber?: string,
    ccexp?: string,
    first_name?: string,
    last_name?: string,
    company?: string,
    address1?: string,
    address2?: string,
    city?: string,
    state?: string,
    zip?: string,
    country?: string,
    phone?: string,
    fax?: string,
    email?: string,
    additionalOptions?: Partial<AddBillingForCustomerRequest>
  ): Promise<{
    status: number;
    data?: any;
    message: string;
  }> {
    try {
      const addBillingRequest: AddBillingForCustomerRequest =
        AddBillingForCustomerRequestSchema.parse({
          type: "add_billing",
          customer_vault_id: customer_vault_id,
          ccnumber: ccnumber,
          ccexp: ccexp,
          first_name: first_name,
          last_name: last_name,
          company: company,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          zip: zip,
          country: country,
          phone: phone,
          fax: fax,
          email: email,
          ...additionalOptions,
        });
      const result = await this.customerVaultApi.addBillingForCustomer(
        addBillingRequest
      );
      return {
        status: 200,
        data: result.data,
        message: "Billing added successfully",
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
    billing_id: string,
    customer_vault_id: string,
    ccnumber?: string,
    ccexp?: string,
    first_name?: string,
    last_name?: string,
    company?: string,
    address1?: string,
    address2?: string,
    city?: string,
    state?: string,
    zip?: string,
    country?: string,
    phone?: string,
    fax?: string,
    email?: string,
    additionalOptions?: Partial<UpdateBillingForCustomerRequest>
  ): Promise<{
    status: number;
    data?: any;
    message: string;
  }> {
    try {
      const updateBillingRequest: UpdateBillingForCustomerRequest =
        UpdateBillingForCustomerRequestSchema.parse({
          type: "update_billing",
          billing_id,
          customer_vault_id,
          ccnumber,
          ccexp,
          first_name,
          last_name,
          company,
          address1,
          address2,
          city,
          state,
          zip,
          country,
          phone,
          fax,
          email,
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
    billing_id: string,
    customer_vault_id: string,
    additionalOptions?: Partial<DeleteBillingForCustomerRequest>
  ): Promise<{
    status: number;
    data?: any;
    message: string;
  }> {
    try {
      const deleteBillingRequest: DeleteBillingForCustomerRequest =
        DeleteBillingForCustomerRequestSchema.parse({
          type: "delete_billing",
          billing_id,
          customer_vault_id,
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
