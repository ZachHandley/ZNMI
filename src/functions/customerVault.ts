import { z } from "zod";
import { CustomerVaultApi } from "../api/customerVaultApi";
import {
  AddUpdateCustomerRequestSchema,
  CustomerVaultInitiatedTransactionSchema,
  DeleteCustomerRecordSchema,
} from "../types/customerVaultRequest";

type AddUpdateCustomerRequest = z.infer<typeof AddUpdateCustomerRequestSchema>;
type CustomerVaultInitiatedTransaction = z.infer<
  typeof CustomerVaultInitiatedTransactionSchema
>;
type DeleteCustomerRecord = z.infer<typeof DeleteCustomerRecordSchema>;

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
    cvv: string,
    customer_vault_id?: string,
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
          cvv: cvv,
          customer_vault_id: customer_vault_id,
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
    additionalOptions: Partial<AddUpdateCustomerRequest>
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
}
