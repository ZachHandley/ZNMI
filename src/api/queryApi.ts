import { XMLParser } from "fast-xml-parser";
import { z } from "zod";
import {
  QueryRequestSchema,
  type QueryDateSearchEnum,
  type QueryRequest,
  type QueryResultOrderEnum,
  type QueryRequestWithoutKey,
} from "../types/queryTypes.js";
import {
  type QueryProfileResponse,
  QueryProfileResponseSchema,
  type QueryRecurringResponse,
  QueryRecurringResponseSchema,
  type QueryRecurringPlansResponse,
  QueryRecurringPlansResponseSchema,
  type QueryInvoicingResponse,
  QueryInvoicingResponseSchema,
  type QueryGatewayProcessorsResponse,
  QueryGatewayProcessorsResponseSchema,
  type QueryCustomerVaultResponse,
  QueryCustomerVaultResponseSchema,
  type QueryTransactionResponse,
  QueryTransactionResponseSchema,
  type QueryTestModeResponse,
  QueryTestModeResponseSchema,
} from "../types/responseTypes.js";
import { PostRequestXML } from "./utils.js";

export const QUERY_URL = "https://secure.nmi.com/api/query.php";

const QueryErrorResponseSchema = z.object({
  nm_response: z.object({
    error_response: z.string(),
  }),
});

export class QueryApi {
  private _securityKey: string;
  private _xmlParser: XMLParser;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
    this._xmlParser = new XMLParser({
      ignoreAttributes: true,
      parseAttributeValue: false,
      trimValues: true,
    });
  }

  private beforeRequest = (request: Partial<QueryRequest>) => {
    return {
      ...request,
      security_key: this._securityKey,
    };
  };

  private parseResponse<T>(xmlResponse: string, schema: z.ZodType<T>): T {
    const parsed = this._xmlParser.parse(xmlResponse);

    // Handle completely empty response
    if (parsed.nm_response === "") {
      parsed.nm_response = {
        customer_vault: { customer: [] },
        transaction: [],
        recurring: [],
        plan: [],
        subscription: [],
        gateway_processor: [],
        invoice_report: { invoice: [] },
      };
    }
    // Handle empty string properties
    else if (parsed.nm_response) {
      if (parsed.nm_response.customer_vault === "") {
        parsed.nm_response.customer_vault = { customer: [] };
      }
      if (parsed.nm_response.transaction === "") {
        parsed.nm_response.transaction = [];
      }
      if (parsed.nm_response.recurring === "") {
        parsed.nm_response.recurring = [];
      }
      if (parsed.nm_response.plan === "") {
        parsed.nm_response.plan = [];
      }
      if (parsed.nm_response.gateway_processor === "") {
        parsed.nm_response.gateway_processor = [];
      }
      if (parsed.nm_response.invoice_report === "") {
        parsed.nm_response.invoice_report = { invoice: [] };
      }
    }

    // Check for error response first
    try {
      const errorResponse = QueryErrorResponseSchema.parse(parsed);
      throw new Error(errorResponse.nm_response.error_response);
    } catch (e) {
      if (e instanceof z.ZodError) {
        return schema.parse(parsed);
      }
      throw e;
    }
  }

  private async query(request: Partial<QueryRequestWithoutKey>) {
    const fullRequest = this.beforeRequest(request);
    const response = await PostRequestXML(QUERY_URL, fullRequest);
    return response;
  }

  // Non-paginated queries
  async queryTransaction(
    request: Pick<QueryRequest, "transaction_id" | "report_type">
  ): Promise<QueryTransactionResponse> {
    const response = await this.query(request);
    return this.parseResponse(response, QueryTransactionResponseSchema);
  }

  async queryReceipt(
    request: Pick<QueryRequest, "transaction_id"> & { report_type: "receipt" }
  ): Promise<string> {
    const response = await this.query(request);
    return response;
  }

  async queryProfile(
    request: { report_type: "profile" } & Pick<
      QueryRequest,
      "processor_details"
    >
  ): Promise<QueryProfileResponse> {
    const response = await this.query(request);
    return this.parseResponse(response, QueryProfileResponseSchema);
  }

  // Paginated queries with date ranges
  async queryTransactionsByDate(
    request: Pick<
      QueryRequestWithoutKey,
      | "start_date"
      | "end_date"
      | "date_search"
      | "page_number"
      | "result_limit"
      | "result_order"
    >
  ): Promise<QueryTransactionResponse> {
    const response = await this.query(request);
    return this.parseResponse(response, QueryTransactionResponseSchema);
  }

  async queryCustomerVault(
    request: { report_type: "customer_vault" } & Pick<
      QueryRequestWithoutKey,
      | "customer_vault_id"
      | "start_date"
      | "end_date"
      | "date_search"
      | "page_number"
      | "result_limit"
      | "result_order"
    >
  ): Promise<QueryCustomerVaultResponse> {
    const response = await this.query(request);
    return this.parseResponse(response, QueryCustomerVaultResponseSchema);
  }

  async queryRecurring(
    request: { report_type: "recurring" } & Pick<
      QueryRequestWithoutKey,
      | "subscription_id"
      | "start_date"
      | "end_date"
      | "date_search"
      | "page_number"
      | "result_limit"
      | "result_order"
    >
  ): Promise<QueryRecurringResponse> {
    const response = await this.query({
      ...request,
      report_type: "recurring",
    });
    return this.parseResponse(response, QueryRecurringResponseSchema);
  }

  // Paginated queries without date ranges
  async queryRecurringPlans(
    request: { report_type: "recurring_plans" } & Pick<
      QueryRequestWithoutKey,
      "page_number" | "result_limit" | "result_order"
    >
  ): Promise<QueryRecurringPlansResponse> {
    const response = await this.query({
      ...request,
      report_type: "recurring_plans",
    });
    console.log(response);
    return this.parseResponse(response, QueryRecurringPlansResponseSchema);
  }

  async queryInvoices(
    request: { report_type: "invoicing" } & Pick<
      QueryRequestWithoutKey,
      | "invoice_id"
      | "invoice_status"
      | "page_number"
      | "result_limit"
      | "result_order"
    >
  ): Promise<QueryInvoicingResponse> {
    const response = await this.query({
      ...request,
      report_type: "invoicing",
    });
    return this.parseResponse(response, QueryInvoicingResponseSchema);
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
  }): Promise<QueryTransactionResponse> {
    const response = await this.query(request);
    return this.parseResponse(response, QueryTransactionResponseSchema);
  }

  async queryTransactionsByCondition(
    request: Pick<
      QueryRequestWithoutKey,
      "condition" | "page_number" | "result_limit" | "result_order"
    >
  ): Promise<QueryTransactionResponse> {
    const response = await this.query({
      ...request,
      condition: Array.isArray(request.condition)
        ? request.condition.join(",")
        : request.condition,
    });
    return this.parseResponse(response, QueryTransactionResponseSchema);
  }

  async queryTransactionsBySource(
    request: Pick<
      QueryRequestWithoutKey,
      "source" | "page_number" | "result_limit" | "result_order"
    >
  ): Promise<QueryTransactionResponse> {
    const response = await this.query({
      ...request,
      source: Array.isArray(request.source)
        ? request.source.join(",")
        : request.source,
    });
    return this.parseResponse(response, QueryTransactionResponseSchema);
  }

  async queryTransactionsByActionType(
    request: Pick<
      QueryRequestWithoutKey,
      "action_type" | "page_number" | "result_limit" | "result_order"
    >
  ): Promise<QueryTransactionResponse> {
    const response = await this.query({
      ...request,
      action_type: Array.isArray(request.action_type)
        ? request.action_type.join(",")
        : request.action_type,
    });
    return this.parseResponse(response, QueryTransactionResponseSchema);
  }

  async queryTransactionsByCard(
    request: Pick<
      QueryRequestWithoutKey,
      "cc_number" | "page_number" | "result_limit" | "result_order"
    >
  ): Promise<QueryTransactionResponse> {
    const response = await this.query(request);
    return this.parseResponse(response, QueryTransactionResponseSchema);
  }

  // Non-paginated queries
  async queryGatewayProcessors(request: {
    report_type: "gateway_processors";
  }): Promise<QueryGatewayProcessorsResponse> {
    const response = await this.query(request);
    return this.parseResponse(response, QueryGatewayProcessorsResponseSchema);
  }

  async queryAccountUpdater(request: {
    report_type: "account_updater";
  }): Promise<QueryCustomerVaultResponse> {
    const response = await this.query(request);
    return this.parseResponse(response, QueryCustomerVaultResponseSchema);
  }

  async queryTestModeStatus(request: {
    report_type: "test_mode_status";
  }): Promise<QueryTestModeResponse> {
    const response = await this.query(request);
    return this.parseResponse(response, QueryTestModeResponseSchema);
  }
}
