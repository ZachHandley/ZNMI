import { CustomerVaultApi } from "../api/customerVaultApi.js";
import {
  type AddUpdateCustomerRequest,
  type CustomerVaultInitiatedTransaction,
  type DeleteCustomerRecord,
  type AddBillingForCustomerRequest,
  type UpdateBillingForCustomerRequest,
  type DeleteBillingForCustomerRequest,
  type ValidateCustomerByVaultIdRequest,
  type AuthorizeCustomerByVaultIdRequest,
  type SaleByVaultIdRequest,
  type CreditTransactionByVaultIdRequest,
  type OfflineTransactionByVaultIdRequest,
} from "../types/customerVaultRequest.js";
import type {
  CustomerVaultResponse,
  BillingResponse,
} from "../types/responseTypes.js";

export class CustomerVault {
  customerVaultApi: CustomerVaultApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this.customerVaultApi = new CustomerVaultApi(securityKey);
    this._securityKey = securityKey;
  }

  async addCustomer(request: AddUpdateCustomerRequest): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const result = await this.customerVaultApi.addOrUpdateCustomer({
        ...request,
        customer_vault: "add_customer",
      });
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Customer added successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in addCustomer: ${error.message}`,
      };
    }
  }

  async updateCustomer(request: AddUpdateCustomerRequest): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const result = await this.customerVaultApi.addOrUpdateCustomer({
        ...request,
        customer_vault: "update_customer",
      });
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Customer updated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in updateCustomer: ${error.message}`,
      };
    }
  }

  async deleteCustomer(request: DeleteCustomerRecord): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const result = await this.customerVaultApi.deleteCustomer({
        ...request,
        customer_vault: "delete_customer",
      });
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Customer deleted successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in deleteCustomer: ${error.message}`,
      };
    }
  }

  async addBillingToCustomer(request: AddBillingForCustomerRequest): Promise<{
    status: number;
    data?: BillingResponse;
    message: string;
  }> {
    try {
      const result = await this.customerVaultApi.addBillingForCustomer({
        ...request,
        customer_vault: "add_billing",
      });
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Billing added successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in addBillingToCustomer: ${error.message}`,
      };
    }
  }

  async updateBillingForCustomer(
    request: UpdateBillingForCustomerRequest
  ): Promise<{
    status: number;
    data?: BillingResponse;
    message: string;
  }> {
    try {
      const result = await this.customerVaultApi.updateBillingForCustomer({
        ...request,
        customer_vault: "update_billing",
      });
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Billing updated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in updateBillingForCustomer: ${error.message}`,
      };
    }
  }

  async deleteBillingForCustomer(
    request: DeleteBillingForCustomerRequest
  ): Promise<{
    status: number;
    data?: BillingResponse;
    message: string;
  }> {
    try {
      const result = await this.customerVaultApi.deleteBillingForCustomer({
        ...request,
        customer_vault: "delete_billing",
      });
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Billing deleted successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in deleteBillingForCustomer: ${error.message}`,
      };
    }
  }

  async validateCustomerByVaultId(
    request: ValidateCustomerByVaultIdRequest
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const result = await this.customerVaultApi.validateCustomerVaultId({
        ...request,
        type: "validate",
      });
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Customer validated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in validateCustomerByVaultId: ${error.message}`,
      };
    }
  }

  async authorizeCustomerByVaultId(
    request: AuthorizeCustomerByVaultIdRequest
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const result = await this.customerVaultApi.authorizeCustomerByVaultId({
        ...request,
        type: "auth",
      });
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Customer authorized successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in authorizeCustomerByVaultId: ${error.message}`,
      };
    }
  }

  async saleByVaultId(request: SaleByVaultIdRequest): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const result = await this.customerVaultApi.saleByVaultId({
        ...request,
        type: "sale",
      });
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Sale completed successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in saleByVaultId: ${error.message}`,
      };
    }
  }

  async creditTransactionByVaultId(
    request: CreditTransactionByVaultIdRequest
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const result = await this.customerVaultApi.creditTransactionByVaultId({
        ...request,
        type: "credit",
      });
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
        message: `Error in creditTransactionByVaultId: ${error.message}`,
      };
    }
  }

  async offlineTransactionByVaultId(
    request: OfflineTransactionByVaultIdRequest
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const result = await this.customerVaultApi.offlineTransactionByVaultId({
        ...request,
        type: "offline",
      });
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
        message: `Error in offlineTransactionByVaultId: ${error.message}`,
      };
    }
  }

  async initiateCustomerVaultTransaction(
    request: CustomerVaultInitiatedTransaction
  ): Promise<{
    status: number;
    data?: CustomerVaultResponse;
    message: string;
  }> {
    try {
      const result =
        await this.customerVaultApi.initiateCustomerVaultTransaction({
          ...request,
          currency: "USD",
          initiated_by: "customer",
        });
      return {
        status: 200,
        data: result,
        message: result.responsetext || "Transaction initiated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in initiateCustomerVaultTransaction: ${error.message}`,
      };
    }
  }
}
