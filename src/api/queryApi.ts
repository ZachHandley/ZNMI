import { XMLParser } from "fast-xml-parser";
import { z } from "zod";
import {
  QueryRequestSchema,
  type QueryRequest,
  type QueryRequestWithoutKey,
  QueryTransactionConditionEnum,
  type QueryDateSearchEnum,
  type QueryResultOrderEnum,
  type QueryTransactionSourceEnum,
  type QueryTransactionActionTypeEnum,
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
} from "../types/responseTypes.js";
import { PostRequest, PostRequestXML } from "./utils.js";

export const QUERY_URL = "https://secure.nmi.com/api/query.php";

// Add error response type
const QueryErrorResponseSchema = z.object({
  nm_response: z.object({
    error_response: z.string(),
  }),
});

type QueryErrorResponse = z.infer<typeof QueryErrorResponseSchema>;

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

    // Check for error response first
    try {
      const errorResponse = QueryErrorResponseSchema.parse(parsed);
      throw new Error(errorResponse.nm_response.error_response);
    } catch (e) {
      if (e instanceof z.ZodError) {
        // Not an error response, continue with normal parsing
        return schema.parse(parsed);
      }
      throw e; // Re-throw if it was our error
    }
  }

  /**
   * Base query method
   */
  private query = async (queryRequest: Partial<QueryRequestWithoutKey>) => {
    const request = this.beforeRequest(queryRequest);
    const validatedRequest = QueryRequestSchema.parse(request);
    const response = await PostRequestXML(QUERY_URL, validatedRequest);
    return response;
  };

  /**
   * Query a specific transaction by ID
   */
  queryTransaction = async (transactionId: string) => {
    const response = await this.query({
      transaction_id: transactionId,
    });
    return this.parseResponse(response, QueryCustomerVaultResponseSchema);
  };

  /**
   * Get HTML receipt for a transaction
   */
  queryReceipt = async (transactionId: string) => {
    return this.query({
      report_type: "receipt",
      transaction_id: transactionId,
    });
  };

  /**
   * Query merchant profile
   */
  queryProfile = async (
    includeProcessorDetails: boolean = false
  ): Promise<QueryProfileResponse> => {
    const response = await this.query({
      report_type: "profile",
      processor_details: includeProcessorDetails ? "true" : "false",
    });
    return this.parseResponse(response, QueryProfileResponseSchema);
  };

  /**
   * Query transactions by date range
   */
  queryTransactionsByDate = async (
    startDate: string, // Format: YYYYMMDDhhmmss
    endDate: string, // Format: YYYYMMDDhhmmss
    options: Partial<QueryRequestWithoutKey> = {}
  ) => {
    const response = await this.query({
      start_date: startDate,
      end_date: endDate,
      ...options,
    });
    return this.parseResponse(response, QueryCustomerVaultResponseSchema);
  };

  /**
   * Query customer vault data
   */
  queryCustomerVault = async (
    customerVaultId?: string,
    dateRange?: {
      startDate: string; // Format: YYYYMMDDhhmmss
      endDate: string; // Format: YYYYMMDDhhmmss
      searchType: QueryDateSearchEnum;
    },
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<QueryCustomerVaultResponse> => {
    const request: Partial<QueryRequestWithoutKey> = {
      report_type: "customer_vault",
      customer_vault_id: customerVaultId,
      ...options,
    };

    if (dateRange) {
      request.date_search = dateRange.searchType;
      request.start_date = dateRange.startDate;
      request.end_date = dateRange.endDate;
    }

    const response = await this.query(request);
    return this.parseResponse(response, QueryCustomerVaultResponseSchema);
  };

  /**
   * Query recurring subscription data
   */
  queryRecurring = async (
    subscriptionId?: string,
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<QueryRecurringResponse> => {
    const response = await this.query({
      report_type: "recurring",
      subscription_id: subscriptionId,
      ...options,
    });
    return this.parseResponse(response, QueryRecurringResponseSchema);
  };

  /**
   * Query recurring plans data
   */
  queryRecurringPlans = async (
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<QueryRecurringPlansResponse> => {
    const response = await this.query({
      report_type: "recurring_plans",
      ...options,
    });
    return this.parseResponse(response, QueryRecurringPlansResponseSchema);
  };

  /**
   * Query invoice data
   */
  queryInvoices = async (
    invoiceId?: string,
    status?: string[], // Array of statuses that will be joined with commas
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<QueryInvoicingResponse> => {
    const response = await this.query({
      report_type: "invoicing",
      invoice_id: invoiceId,
      invoice_status: status?.join(","),
      ...options,
    });
    return this.parseResponse(response, QueryInvoicingResponseSchema);
  };

  /**
   * Query transactions by condition
   */
  queryTransactionsByCondition = async (
    conditions: (keyof typeof QueryTransactionConditionEnum)[],
    options: Partial<QueryRequestWithoutKey> = {}
  ) => {
    const response = await this.query({
      condition: conditions.join(","),
      ...options,
    });
    return this.parseResponse(response, QueryCustomerVaultResponseSchema);
  };

  /**
   * Query transactions by source
   */
  queryTransactionsBySource = async (
    sources: QueryTransactionSourceEnum[],
    options: Partial<QueryRequestWithoutKey> = {}
  ) => {
    const response = await this.query({
      source: sources.join(","),
      ...options,
    });
    return this.parseResponse(response, QueryCustomerVaultResponseSchema);
  };

  /**
   * Query transactions by action type
   */
  queryTransactionsByActionType = async (
    actionTypes: QueryTransactionActionTypeEnum[],
    options: Partial<QueryRequestWithoutKey> = {}
  ) => {
    const response = await this.query({
      action_type: actionTypes.join(","),
      ...options,
    });
    return this.parseResponse(response, QueryCustomerVaultResponseSchema);
  };

  /**
   * Query transactions by card number (full or last 4)
   */
  queryTransactionsByCard = async (
    cardNumber: string,
    options: Partial<QueryRequestWithoutKey> = {}
  ) => {
    const response = await this.query({
      cc_number: cardNumber,
      ...options,
    });
    return this.parseResponse(response, QueryCustomerVaultResponseSchema);
  };

  /**
   * Query transactions with pagination
   */
  queryTransactionsWithPagination = async (
    pageNumber: number,
    resultLimit: number,
    resultOrder: QueryResultOrderEnum,
    options: Partial<QueryRequestWithoutKey> = {}
  ) => {
    const response = await this.query({
      page_number: pageNumber.toString(),
      result_limit: resultLimit.toString(),
      result_order: resultOrder,
      ...options,
    });
    return this.parseResponse(response, QueryCustomerVaultResponseSchema);
  };

  /**
   * Query gateway processors
   */
  queryGatewayProcessors = async (
    options: Partial<QueryRequestWithoutKey> = {}
  ): Promise<QueryGatewayProcessorsResponse> => {
    const response = await this.query({
      report_type: "gateway_processors",
      ...options,
    });
    return this.parseResponse(response, QueryGatewayProcessorsResponseSchema);
  };

  /**
   * Query account updater status
   */
  queryAccountUpdater = async (
    options: Partial<QueryRequestWithoutKey> = {}
  ) => {
    const response = await this.query({
      report_type: "account_updater",
      ...options,
    });
    return this.parseResponse(response, QueryCustomerVaultResponseSchema);
  };

  /**
   * Query test mode status
   */
  queryTestModeStatus = async (
    options: Partial<QueryRequestWithoutKey> = {}
  ) => {
    const response = await this.query({
      report_type: "test_mode_status",
      ...options,
    });
    return this.parseResponse(response, QueryCustomerVaultResponseSchema);
  };
}
