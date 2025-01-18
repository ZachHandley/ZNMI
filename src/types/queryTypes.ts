import { z } from "zod";

// Enums for various query parameters
export const QueryTransactionConditionSchema = z.enum([
  "pending",
  "pendingsettlement",
  "in_progress",
  "abandoned",
  "failed",
  "canceled",
  "complete",
  "unknown",
]);

export type QueryTransactionCondition = z.infer<
  typeof QueryTransactionConditionSchema
>;

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

export const QueryTransactionSourceSchema = z.enum([
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

export type QueryTransactionSource = z.infer<
  typeof QueryTransactionSourceSchema
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

export const QueryDateRangeSchema = z.object({
  start_date: z.string().regex(/^\d{8}$/, "Must be in format YYYYMMDD"),
  end_date: z.string().regex(/^\d{8}$/, "Must be in format YYYYMMDD"),
});

export type QueryDateRange = z.infer<typeof QueryDateRangeSchema>;

export const QueryPaginationSchema = z
  .object({
    page_number: z.number().min(0),
    result_limit: z.number().positive(),
    result_order: QueryResultOrderEnumSchema.optional().default("standard"),
  })
  .merge(QueryDateRangeSchema)
  .nullish();

export type QueryPagination = z.infer<typeof QueryPaginationSchema>;

// Product information in transaction response
export const ProductSchema = z.object({
  sku: z.string(),
  quantity: z.string(),
  description: z.string(),
  amount: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

// Action information in transaction response
export const TransactionActionSchema = z.object({
  amount: z.string(),
  action_type: z.string(),
  date: z.string(),
  success: z.string(),
  ip_address: z.string().nullable(),
  source: z.string(),
  api_method: z.string().nullable(),
  username: z.string().nullable(),
  response_text: z.string().nullable(),
  batch_id: z.string(),
  processor_batch_id: z.string().nullable(),
  response_code: z.string(),
  processor_response_text: z.string().nullable(),
  processor_response_code: z.string().nullable(),
  requested_amount: z.string().optional(),
  device_license_number: z.string().nullable(),
  device_nickname: z.string().nullable(),
});

export type TransactionAction = z.infer<typeof TransactionActionSchema>;

// Main transaction response schema
export const QueryTransactionRequestSchema = z.object({
  transaction_id: z.string(),
  partial_payment_id: z.string().nullable(),
  partial_payment_balance: z.string().nullable(),
  platform_id: z.string().nullable(),
  transaction_type: QueryTransactionTypeEnumSchema,
  condition: QueryTransactionConditionSchema,
  source: QueryTransactionSourceSchema,
  order_id: z.string(),
  authorization_code: z.string(),
  ponumber: z.string().nullable(),
  order_description: z.string().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  address_1: z.string(),
  address_2: z.string().nullable(),
  company: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country: z.string(),
  email: z.string(),
  phone: z.string(),
  fax: z.string().nullable(),
  cell_phone: z.string().nullable(),
  customertaxid: z.string().nullable(),
  customerid: z.string().nullable(),
  website: z.string().nullable(),
  shipping_first_name: z.string().nullable(),
  shipping_last_name: z.string().nullable(),
  shipping_address_1: z.string().nullable(),
  shipping_address_2: z.string().nullable(),
  shipping_company: z.string().nullable(),
  shipping_city: z.string().nullable(),
  shipping_state: z.string().nullable(),
  shipping_postal_code: z.string().nullable(),
  shipping_country: z.string().nullable(),
  shipping_email: z.string().nullable(),
  shipping_carrier: z.string().nullable(),
  tracking_number: z.string().nullable(),
  shipping_date: z.string().nullable(),
  shipping: z.string(),
  shipping_phone: z.string().nullable(),
  cc_number: z.string(),
  cc_hash: z.string(),
  cc_exp: z.string(),
  cc_bin: z.string(),
  cc_type: z.string(),
  tax: z.string(),
  currency: z.string(),
  processor_id: z.string(),
  products: z.array(ProductSchema).optional(),
  actions: z.array(TransactionActionSchema),
});

export type QueryTransactionRequest = z.infer<
  typeof QueryTransactionRequestSchema
>;

export const MerchantDefinedFieldsSchema = z.record(
  z.string().regex(/^merchant_defined_field_([1-9]|1\d|20)$/),
  z.string()
);

export type MerchantDefinedFields = z.infer<typeof MerchantDefinedFieldsSchema>;

// Main Query Request Schema
export const QueryRequestBaseSchema = z.object({
  condition: z
    .string()
    .optional()
    .describe("Comma-separated list of transaction conditions"),
  transaction_type: QueryTransactionTypeEnumSchema.optional(),
  action_type: z
    .string()
    .optional()
    .describe("Comma-separated list of action types (e.g., 'sale,refund')"),
  source: z
    .string()
    .optional()
    .describe("Comma-separated list of transaction sources"),
  transaction_id: z
    .string()
    .optional()
    .describe("Single transaction ID or comma-separated list"),
  subscription_id: z.string().optional(),
  invoice_id: z.string().optional(),
  partial_payment_id: z.string().optional(),
  order_id: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  address1: z.string().optional(),
  city: z.string().optional(),
  state: z.string().length(2, "State must be 2 characters").optional(),
  zip: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  order_description: z.string().optional(),
  drivers_license_number: z.string().optional(),
  drivers_license_dob: z.string().optional(),
  drivers_license_state: z.string().optional(),
  email: z.string().email().optional(),
  cc_number: z
    .string()
    .optional()
    .describe("Full card number or last 4 digits"),
  start_date: z
    .string()
    .regex(/^\d{8}$/, "Must be in format YYYYMMDD")
    .optional(),
  end_date: z
    .string()
    .regex(/^\d{8}$/, "Must be in format YYYYMMDD")
    .optional(),
  report_type: QueryReportTypeEnumSchema.optional(),
  mobile_device_license: z.string().optional(),
  mobile_device_nickname: z.string().optional(),
  customer_vault_id: z.string().optional(),
  date_search: QueryDateSearchEnumSchema.optional(),
  result_limit: z.number().positive().optional(),
  page_number: z.number().min(0).optional(),
  result_order: QueryResultOrderEnumSchema.optional(),
  invoice_status: z
    .string()
    .optional()
    .describe("Comma-separated list of statuses"),
  processor_details: z.string().optional(),
});

export const QueryRequestSchema = QueryRequestBaseSchema.merge(
  z.object({
    security_key: z.string().min(1, "Security key is required"),
  })
).and(
  z
    .record(
      z.string().regex(/^merchant_defined_field_([1-9]|1\d|20)$/),
      z.string()
    )
    .optional()
);

export type QueryRequest = z.infer<typeof QueryRequestSchema>;

export const QueryRequestWithoutKeySchema = QueryRequestBaseSchema.and(
  z
    .record(
      z.string().regex(/^merchant_defined_field_([1-9]|1\d|20)$/),
      z.any()
    )
    .optional()
);

export type QueryRequestWithoutKey = z.infer<
  typeof QueryRequestWithoutKeySchema
>;
