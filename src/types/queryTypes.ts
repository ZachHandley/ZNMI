import { z } from "zod";

// Enums for various query parameters
export const QueryTransactionConditionEnum = z.enum([
  "pending",
  "pendingsettlement",
  "in_progress",
  "abandoned",
  "failed",
  "canceled",
  "complete",
  "unknown",
]);

export const QueryTransactionTypeEnumSchema = z.enum([
  "cc", // credit card
  "ck", // check
  "cs", // cash
]);

export type QueryTransactionTypeEnum = z.infer<
  typeof QueryTransactionTypeEnumSchema
>;

export const QueryTransactionActionTypeEnumSchema = z.enum([
  "sale",
  "refund",
  "credit",
  "auth",
  "capture",
  "void",
  "return",
  "validate",
]);

export type QueryTransactionActionTypeEnum = z.infer<
  typeof QueryTransactionActionTypeEnumSchema
>;

export const QueryTransactionSourceEnumSchema = z.enum([
  "api",
  "batch_upload",
  "mobile",
  "quickclick",
  "quickbooks",
  "recurring",
  "swipe",
  "virtual_terminal",
  "internal",
]);

export type QueryTransactionSourceEnum = z.infer<
  typeof QueryTransactionSourceEnumSchema
>;

export const QueryReportTypeEnumSchema = z.enum([
  "receipt",
  "customer_vault",
  "recurring",
  "recurring_plans",
  "invoicing",
  "gateway_processors",
  "account_updater",
  "test_mode_status",
  "profile",
]);

export type QueryReportTypeEnum = z.infer<typeof QueryReportTypeEnumSchema>;

export const QueryDateSearchEnumSchema = z.enum(["created", "updated"]);

export type QueryDateSearchEnum = z.infer<typeof QueryDateSearchEnumSchema>;

export const QueryResultOrderEnumSchema = z.enum([
  "standard", // oldest to newest
  "reverse", // newest to oldest
]);

export type QueryResultOrderEnum = z.infer<typeof QueryResultOrderEnumSchema>;

// Main Query Request Schema
export const QueryRequestSchema = z
  .object({
    security_key: z.string(),
    condition: z.string().optional(), // Comma-separated list of conditions
    transaction_type: QueryTransactionTypeEnumSchema.optional(),
    action_type: z.string().optional(), // Comma-separated list of action types
    source: z.string().optional(), // Comma-separated list of sources
    transaction_id: z.string().optional(),
    subscription_id: z.string().optional(),
    invoice_id: z.string().optional(),
    partial_payment_id: z.string().optional(),
    order_id: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    address1: z.string().optional(),
    city: z.string().optional(),
    state: z.string().length(2).optional(), // Format: CC
    zip: z.string().optional(),
    phone: z.string().optional(),
    fax: z.string().optional(),
    order_description: z.string().optional(),
    drivers_license_number: z.string().optional(),
    drivers_license_dob: z.string().optional(),
    drivers_license_state: z.string().optional(),
    email: z.string().optional(),
    cc_number: z.string().optional(),
    start_date: z.string().optional(), // Format: YYYYMMDDhhmmss
    end_date: z.string().optional(), // Format: YYYYMMDDhhmmss
    report_type: QueryReportTypeEnumSchema.optional(),
    mobile_device_license: z.string().optional(),
    mobile_device_nickname: z.string().optional(),
    customer_vault_id: z.string().optional(),
    date_search: QueryDateSearchEnumSchema.optional(),
    result_limit: z.string().optional(), // Changed to string
    page_number: z.string().optional(), // Changed to string
    result_order: QueryResultOrderEnumSchema.optional(),
    invoice_status: z.string().optional(), // Comma-separated list
    processor_details: z.string().optional(), // Changed to string for "true"/"false"
  })
  .and(
    // Allow up to 20 merchant defined fields
    z.record(z.string(), z.string()).optional()
  );

export type QueryRequest = z.infer<typeof QueryRequestSchema>;

// Helper type for omitting security_key in method parameters
export type QueryRequestWithoutKey = Omit<QueryRequest, "security_key">;
