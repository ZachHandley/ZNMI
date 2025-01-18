import { QueryApi } from "../api/queryApi.js";
import {
  type QueryDateSearchEnum,
  type QueryResultOrderEnum,
  type QueryTransactionSource,
  type QueryTransactionActionTypeEnum,
  type QueryTransactionCondition,
  type QueryRequest,
} from "../types/queryTypes.js";
import {
  type QueryProfileResponse,
  type QueryRecurringResponse,
  type QueryRecurringPlansResponse,
  type QueryInvoicingResponse,
  type QueryGatewayProcessorsResponse,
  type QueryCustomerVaultResponse,
  type QueryTransactionResponse,
  type QueryTestModeResponse,
} from "../types/responseTypes.js";

// Common response type to reduce repetition
type QueryResponse<T> = {
  status: number;
  data?: T;
  message: string;
};

export class Query {
  queryApi: QueryApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
    this.queryApi = new QueryApi(securityKey);
  }

  async queryTransaction(request: {
    transaction_id: string;
    report_type?: QueryRequest["report_type"];
  }): Promise<QueryResponse<QueryTransactionResponse>> {
    try {
      const result = await this.queryApi.queryTransaction(request);
      return {
        status: 200,
        data: result,
        message: "Transaction queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying transaction: ${error.message}`,
      };
    }
  }

  async queryReceipt(request: {
    transaction_id: string;
    report_type: "receipt";
  }): Promise<QueryResponse<string>> {
    try {
      const result = await this.queryApi.queryReceipt(request);
      return {
        status: 200,
        data: result,
        message: "Receipt queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying receipt: ${error.message}`,
      };
    }
  }

  async queryProfile(request: {
    report_type: "profile";
    include_processor_details?: "0" | "1";
  }): Promise<QueryResponse<QueryProfileResponse>> {
    try {
      const result = await this.queryApi.queryProfile(request);
      return {
        status: 200,
        data: result,
        message: "Profile queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying profile: ${error.message}`,
      };
    }
  }

  async queryTransactions(request: {
    report_type?: QueryRequest["report_type"];
    transaction_id?: string;
    start_date?: string;
    end_date?: string;
    date_search_type?: QueryDateSearchEnum;
    page_number?: number;
    result_limit?: number;
    result_order?: QueryResultOrderEnum;
  }): Promise<QueryResponse<QueryTransactionResponse>> {
    try {
      const result = await this.queryApi.queryTransactions(request);
      return {
        status: 200,
        data: result,
        message: "Transactions queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying transactions: ${error.message}`,
      };
    }
  }

  async queryTransactionsByDate(request: {
    start_date: string;
    end_date: string;
    date_search_type?: QueryDateSearchEnum;
    page_number?: number;
    result_limit?: number;
    result_order?: QueryResultOrderEnum;
  }): Promise<QueryResponse<QueryTransactionResponse>> {
    try {
      const result = await this.queryApi.queryTransactionsByDate(request);
      return {
        status: 200,
        data: result,
        message: "Transactions queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying transactions by date: ${error.message}`,
      };
    }
  }

  async queryCustomerVault(request: {
    report_type: "customer_vault";
    customer_vault_id?: string;
    start_date?: string;
    end_date?: string;
    date_search_type?: QueryDateSearchEnum;
    page_number?: number;
    result_limit?: number;
    result_order?: QueryResultOrderEnum;
  }): Promise<QueryResponse<QueryCustomerVaultResponse>> {
    try {
      const result = await this.queryApi.queryCustomerVault(request);
      return {
        status: 200,
        data: result,
        message: "Customer vault queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying customer vault: ${error.message}`,
      };
    }
  }

  async queryRecurring(request: {
    report_type: "recurring";
    subscription_id?: string;
    start_date?: string;
    end_date?: string;
    date_search_type?: QueryDateSearchEnum;
    page_number?: number;
    result_limit?: number;
    result_order?: QueryResultOrderEnum;
    status?: string;
  }): Promise<QueryResponse<QueryRecurringResponse>> {
    try {
      const result = await this.queryApi.queryRecurring({
        ...request,
        report_type: "recurring",
      });
      return {
        status: 200,
        data: result,
        message: "Recurring subscriptions queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying recurring subscriptions: ${error.message}`,
      };
    }
  }

  async queryRecurringPlans(request: {
    report_type: "recurring_plans";
    plan_id?: string;
    page_number?: number;
    result_limit?: number;
    result_order?: QueryResultOrderEnum;
  }): Promise<QueryResponse<QueryRecurringPlansResponse>> {
    try {
      const result = await this.queryApi.queryRecurringPlans({
        ...request,
        report_type: "recurring_plans",
      });
      return {
        status: 200,
        data: result,
        message: "Recurring plans queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying recurring plans: ${error.message}`,
      };
    }
  }

  async queryInvoices(request: {
    report_type: "invoicing";
    invoice_id?: string;
    status?: string[];
    page_number?: number;
    result_limit?: number;
    result_order?: QueryResultOrderEnum;
  }): Promise<QueryResponse<QueryInvoicingResponse>> {
    try {
      const result = await this.queryApi.queryInvoices({
        ...request,
        invoice_status: request.status?.join(","),
      });
      return {
        status: 200,
        data: result,
        message: "Invoices queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying invoices: ${error.message}`,
      };
    }
  }

  async queryTransactionsByCondition(request: {
    condition: QueryTransactionCondition[];
    page_number?: number;
    result_limit?: number;
    result_order?: QueryResultOrderEnum;
  }): Promise<QueryResponse<QueryTransactionResponse>> {
    try {
      const result = await this.queryApi.queryTransactionsByCondition({
        ...request,
        condition: request.condition.join(","),
      });
      return {
        status: 200,
        data: result,
        message: "Transactions queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying transactions by condition: ${error.message}`,
      };
    }
  }

  async queryTransactionsBySource(request: {
    source: QueryTransactionSource[];
    page_number?: number;
    result_limit?: number;
    result_order?: QueryResultOrderEnum;
  }): Promise<QueryResponse<QueryTransactionResponse>> {
    try {
      const result = await this.queryApi.queryTransactionsBySource({
        ...request,
        source: request.source.join(","),
      });
      return {
        status: 200,
        data: result,
        message: "Transactions queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying transactions by source: ${error.message}`,
      };
    }
  }

  async queryTransactionsByActionType(request: {
    action_type: QueryTransactionActionTypeEnum[];
    page_number?: number;
    result_limit?: number;
    result_order?: QueryResultOrderEnum;
  }): Promise<QueryResponse<QueryTransactionResponse>> {
    try {
      const result = await this.queryApi.queryTransactionsByActionType({
        ...request,
        action_type: request.action_type.join(","),
      });
      return {
        status: 200,
        data: result,
        message: "Transactions queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying transactions by action type: ${error.message}`,
      };
    }
  }

  async queryTransactionsByCard(request: {
    cc_number: string;
    page_number?: number;
    result_limit?: number;
    result_order?: QueryResultOrderEnum;
  }): Promise<QueryResponse<QueryTransactionResponse>> {
    try {
      const result = await this.queryApi.queryTransactionsByCard(request);
      return {
        status: 200,
        data: result,
        message: "Transactions queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying transactions by card: ${error.message}`,
      };
    }
  }

  async queryGatewayProcessors(request: {
    report_type: "gateway_processors";
  }): Promise<QueryResponse<QueryGatewayProcessorsResponse>> {
    try {
      const result = await this.queryApi.queryGatewayProcessors(request);
      return {
        status: 200,
        data: result,
        message: "Gateway processors queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying gateway processors: ${error.message}`,
      };
    }
  }

  async queryTestModeStatus(request: {
    report_type: "test_mode_status";
  }): Promise<QueryResponse<QueryTestModeResponse>> {
    try {
      const result = await this.queryApi.queryTestModeStatus(request);
      return {
        status: 200,
        data: result,
        message: "Test mode status queried successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error querying test mode status: ${error.message}`,
      };
    }
  }
}
