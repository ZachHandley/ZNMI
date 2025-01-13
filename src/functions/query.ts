import { QueryApi } from "../api/queryApi.js";
import {
  type QueryRequest,
  type QueryRequestWithoutKey,
  type QueryTransactionSourceEnum,
  type QueryTransactionActionTypeEnum,
  type QueryDateSearchEnum,
  type QueryResultOrderEnum,
  QueryTransactionConditionEnum,
} from "../types/queryTypes.js";
import {
  type QueryProfileResponse,
  type QueryRecurringResponse,
  type QueryRecurringPlansResponse,
  type QueryInvoicingResponse,
  type QueryGatewayProcessorsResponse,
  type QueryCustomerVaultResponse,
} from "../types/responseTypes.js";

export class Query {
  queryApi: QueryApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
    this.queryApi = new QueryApi(securityKey);
  }

  async queryTransaction(transactionId: string): Promise<{
    status: number;
    data?: QueryCustomerVaultResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryTransaction(transactionId);
      return {
        status: 200,
        data: result,
        message: "Transaction queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error ? error.message : "Error querying transaction",
      };
    }
  }

  async queryReceipt(transactionId: string): Promise<{
    status: number;
    data?: string;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryReceipt(transactionId);
      return {
        status: 200,
        data: result,
        message: "Receipt queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error ? error.message : "Error querying receipt",
      };
    }
  }

  async queryProfile(includeProcessorDetails: boolean = false): Promise<{
    status: number;
    data?: QueryProfileResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryProfile(includeProcessorDetails);
      return {
        status: 200,
        data: result,
        message: "Profile queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error ? error.message : "Error querying profile",
      };
    }
  }

  async queryTransactionsByDate(
    startDate: string,
    endDate: string,
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<{
    status: number;
    data?: QueryCustomerVaultResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryTransactionsByDate(
        startDate,
        endDate,
        options
      );
      return {
        status: 200,
        data: result,
        message: "Transactions queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : "Error querying transactions by date",
      };
    }
  }

  async queryCustomerVault(
    customerVaultId?: string,
    dateRange?: {
      startDate: string;
      endDate: string;
      searchType: QueryDateSearchEnum;
    },
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<{
    status: number;
    data?: QueryCustomerVaultResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryCustomerVault(
        customerVaultId,
        dateRange,
        options
      );
      return {
        status: 200,
        data: result,
        message: "Customer vault queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : "Error querying customer vault",
      };
    }
  }

  async queryRecurring(
    subscriptionId?: string,
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<{
    status: number;
    data?: QueryRecurringResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryRecurring(
        subscriptionId,
        options
      );
      return {
        status: 200,
        data: result,
        message: "Recurring subscription queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : "Error querying recurring subscription",
      };
    }
  }

  async queryRecurringPlans(
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<{
    status: number;
    data?: QueryRecurringPlansResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryRecurringPlans(options);
      return {
        status: 200,
        data: result,
        message: "Recurring plans queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : "Error querying recurring plans",
      };
    }
  }

  async queryInvoices(
    invoiceId?: string,
    status?: string[],
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<{
    status: number;
    data?: QueryInvoicingResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryInvoices(
        invoiceId,
        status,
        options
      );
      return {
        status: 200,
        data: result,
        message: "Invoices queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error ? error.message : "Error querying invoices",
      };
    }
  }

  async queryTransactionsByCondition(
    conditions: (keyof typeof QueryTransactionConditionEnum)[],
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<{
    status: number;
    data?: QueryCustomerVaultResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryTransactionsByCondition(
        conditions,
        options
      );
      return {
        status: 200,
        data: result,
        message: "Transactions queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : "Error querying transactions by condition",
      };
    }
  }

  async queryTransactionsBySource(
    sources: QueryTransactionSourceEnum[],
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<{
    status: number;
    data?: QueryCustomerVaultResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryTransactionsBySource(
        sources,
        options
      );
      return {
        status: 200,
        data: result,
        message: "Transactions queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : "Error querying transactions by source",
      };
    }
  }

  async queryTransactionsByActionType(
    actionTypes: QueryTransactionActionTypeEnum[],
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<{
    status: number;
    data?: QueryCustomerVaultResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryTransactionsByActionType(
        actionTypes,
        options
      );
      return {
        status: 200,
        data: result,
        message: "Transactions queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : "Error querying transactions by action type",
      };
    }
  }

  async queryTransactionsByCard(
    cardNumber: string,
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<{
    status: number;
    data?: QueryCustomerVaultResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryTransactionsByCard(
        cardNumber,
        options
      );
      return {
        status: 200,
        data: result,
        message: "Transactions queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : "Error querying transactions by card",
      };
    }
  }

  async queryTransactionsWithPagination(
    pageNumber: number,
    resultLimit: number,
    resultOrder: QueryResultOrderEnum,
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<{
    status: number;
    data?: QueryCustomerVaultResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryTransactionsWithPagination(
        pageNumber,
        resultLimit,
        resultOrder,
        options
      );
      return {
        status: 200,
        data: result,
        message: "Transactions queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : "Error querying transactions with pagination",
      };
    }
  }

  async queryGatewayProcessors(
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<{
    status: number;
    data?: QueryGatewayProcessorsResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryGatewayProcessors(options);
      return {
        status: 200,
        data: result,
        message: "Gateway processors queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : "Error querying gateway processors",
      };
    }
  }

  async queryAccountUpdater(
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<{
    status: number;
    data?: QueryCustomerVaultResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryAccountUpdater(options);
      return {
        status: 200,
        data: result,
        message: "Account updater status queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : "Error querying account updater status",
      };
    }
  }

  async queryTestModeStatus(
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<{
    status: number;
    data?: QueryCustomerVaultResponse;
    message?: string;
  }> {
    try {
      const result = await this.queryApi.queryTestModeStatus(options);
      return {
        status: 200,
        data: result,
        message: "Test mode status queried successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message:
          error instanceof Error
            ? error.message
            : "Error querying test mode status",
      };
    }
  }
}
