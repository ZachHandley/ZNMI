import { z } from "zod";

export const APITransactionResponseSchema = z.object({
  response: z
    .enum(["1", "2", "3"])
    .describe(`1 is success, 2 is declined, 3 is error`),
  responsetext: z.string(),
  authcode: z.string(),
  transactionid: z.string().optional(),
  avsresponse: z.string(),
  cvvresponse: z.string(),
  orderid: z.string(),
  type: z.enum([
    "sale",
    "auth",
    "validate",
    "credit",
    "offline",
    "refund",
    "void",
    "capture",
    "complete_partial_payment",
  ]),
  response_code: z.string(),
  partial_payment_id: z.string().optional(),
  partial_payment_balance: z.string().optional(),
  amount_authorized: z.string().optional(),
});

export type APITransactionResponse = z.infer<
  typeof APITransactionResponseSchema
>;

export const CustomerVaultResponseSchema = z.object({
  response: z
    .enum(["1", "2", "3"])
    .describe(`1 is success, 2 is declined, 3 is error`),
  responsetext: z.string(),
  authcode: z.string(),
  transactionid: z.string().optional(),
  avsresponse: z.string(),
  cvvresponse: z.string(),
  orderid: z.string(),
  type: z.enum([
    "sale",
    "auth",
    "validate",
    "credit",
    "offline",
    "refund",
    "void",
    "capture",
    "complete_partial_payment",
    "",
  ]),
  response_code: z.string(),
  customer_vault_id: z
    .string()
    .optional()
    .describe(`Only not included when you delete em.`),
});

export type CustomerVaultResponse = z.infer<typeof CustomerVaultResponseSchema>;

export const BillingResponseSchema = CustomerVaultResponseSchema;
export type BillingResponse = z.infer<typeof BillingResponseSchema>;

export const InvoiceResponseSchema = z.object({
  response: z
    .enum(["1", "2", "3"])
    .describe(`1 is success, 2 is declined, 3 is error`),
  responsetext: z.string(),
  authcode: z.string(),
  invoice_id: z.string().optional(),
  avsresponse: z.string(),
  cvvresponse: z.string(),
  orderid: z.string(),
  type: z.enum(["add_invoice", "delete_invoice", "update_invoice"]),
  response_code: z.string(),
  payment_terms: z.string().optional(),
});

export type InvoiceResponse = z.infer<typeof InvoiceResponseSchema>;

export const RecurringResponseSchema = z.object({
  response: z
    .enum(["1", "2", "3"])
    .describe(`1 is success, 2 is declined, 3 is error`),
  responsetext: z.string(),
  recurring_id: z.string().optional(),
  avsresponse: z.string(),
  cvvresponse: z.string(),
  orderid: z.string(),
  type: z.enum([
    "add_recurring",
    "update_recurring",
    "delete_recurring",
    "get_recurring",
    "add_subscription",
    "",
  ]),
  response_code: z.string(),
  subscription_id: z.string().optional(),
});

export type RecurringResponse = z.infer<typeof RecurringResponseSchema>;

export const ProductResponseSchema = z.object({
  response: z
    .enum(["1", "2", "3"])
    .describe(`1 is success, 2 is declined, 3 is error`),
  responsetext: z.string(),
  product_id: z.string(),
  product_sku: z.string().optional(),
  product_description: z.string().optional(),
  product_cost: z.string().optional(),
  product_currency: z.string().optional(),
  product_commodity_code: z.string().optional(),
  product_unit_of_measure: z.string().optional(),
  product_tax_amount: z.string().optional(),
  product_discount_amount: z.string().optional(),
  product_image_name: z.string().optional(),
  product_category: z.string().optional(),
  response_code: z.string().optional(),
});

export type ProductResponse = z.infer<typeof ProductResponseSchema>;

// Query API Response Types
export const QueryCustomerVaultCustomerSchema = z.object({
  id: z.string(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  address_1: z.string().optional(),
  address_2: z.string().optional(),
  company: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  cell_phone: z.string().optional(),
  customertaxid: z.string().optional(),
  website: z.string().optional(),
  shipping_first_name: z.string().optional(),
  shipping_last_name: z.string().optional(),
  shipping_address_1: z.string().optional(),
  shipping_address_2: z.string().optional(),
  shipping_company: z.string().optional(),
  shipping_city: z.string().optional(),
  shipping_state: z.string().optional(),
  shipping_postal_code: z.string().optional(),
  shipping_country: z.string().optional(),
  shipping_email: z.string().optional(),
  shipping_carrier: z.string().optional(),
  tracking_number: z.string().optional(),
  shipping_date: z.string().optional(),
  shipping: z.string().optional(),
  cc_number: z.string().optional(),
  cc_hash: z.string().optional(),
  cc_exp: z.string().optional(),
  cc_start_date: z.string().optional(),
  cc_issue_number: z.string().optional(),
  check_account: z.string().optional(),
  check_hash: z.string().optional(),
  check_aba: z.string().optional(),
  check_name: z.string().optional(),
  account_holder_type: z.string().optional(),
  account_type: z.string().optional(),
  sec_code: z.string().optional(),
  processor_id: z.string().optional(),
  cc_bin: z.string().optional(),
  cc_type: z.string().optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
  account_updated: z.string().optional(),
  customer_vault_id: z.string(),
});

export const QueryCustomerVaultResponseSchema = z.object({
  nm_response: z.object({
    customer_vault: z.object({
      customer: z.array(QueryCustomerVaultCustomerSchema),
    }),
  }),
});

export type QueryCustomerVaultResponse = z.infer<
  typeof QueryCustomerVaultResponseSchema
>;

export const QueryTestModeResponseSchema = z.object({
  nm_response: z.object({
    test_mode_enabled: z.boolean(),
  }),
});

export type QueryTestModeResponse = z.infer<typeof QueryTestModeResponseSchema>;

// Query API Response Types for Recurring Report
export const QueryRecurringResponseSchema = z.object({
  nm_response: z.object({
    subscription: z.array(
      z.object({
        id: z
          .string()
          .optional()
          .describe("Unique identifier for the subscription"),
        subscription_id: z.string().describe("Subscription-specific ID"),
        plan: z.object({
          plan_id: z.string().describe("Plan's specific ID"),
          plan_name: z.string().describe("Name of the plan"),
          plan_amount: z.coerce
            .number()
            .describe("Amount associated with the plan"),
          plan_payments: z
            .union([z.coerce.number(), z.literal("until_cancelled")])
            .describe("Number of payments for the plan"),
          day_frequency: z.coerce
            .number()
            .describe("Frequency of the plan in days"),
        }),
        next_charge_date: z
          .string()
          .describe("Date of next charge for the subscription"),
        completed_payments: z.coerce
          .number()
          .describe("Number of completed payments"),
        attempted_payments: z.coerce
          .number()
          .describe("Number of attempted payments"),
        remaining_payments: z.coerce
          .number()
          .describe("Number of remaining payments"),
        ponumber: z.string().describe("Purchase Order number"),
        orderid: z.string().describe("Order ID"),
        order_description: z.string().describe("Description of the order"),
        shipping: z.string().describe("Shipping details"),
        tax: z.string().describe("Tax details"),
        first_name: z.string().describe("First name of the customer"),
        last_name: z.string().describe("Last name of the customer"),
        address_1: z.string().describe("Address line 1"),
        address_2: z.string().describe("Address line 2"),
        company: z.string().describe("Company name"),
        city: z.string().describe("City"),
        state: z.string().describe("State or region"),
        postal_code: z.string().describe("Postal code"),
        country: z.string().describe("Country"),
        email: z.string().describe("Email address"),
        phone: z.string().describe("Phone number"),
        fax: z.string().describe("Fax number"),
        cell_phone: z.string().describe("Cell phone number"),
        customertaxid: z
          .string()
          .describe("Customer's tax identification number"),
        website: z.string().describe("Website URL"),
        cc_number: z.coerce.number().describe("Credit card number"),
        cc_hash: z.string().describe("Credit card hash"),
        cc_exp: z.string().describe("Credit card expiration date"),
        cc_start_date: z.string().describe("Credit card start date"),
        cc_issue_number: z.coerce.number().describe("Credit card issue number"),
        cc_bin: z.coerce.number().describe("Credit card BIN number"),
        processor_id: z.string().describe("Processor ID"),
      })
    ),
  }),
});

export type QueryRecurringResponse = z.infer<
  typeof QueryRecurringResponseSchema
>;

// Query API Response Types for Recurring Plans Report
export const QueryRecurringPlansResponseSchema = z.object({
  nm_response: z.object({
    plan: z.array(
      z.object({
        id: z.string().optional().describe("Unique identifier for the plan"),
        plan_id: z.string().describe("Plan's specific ID"),
        plan_name: z.string().describe("Name of the recurring plan"),
        plan_amount: z.coerce
          .number()
          .describe("Amount associated with the plan"),
        day_frequency: z.coerce
          .number()
          .describe("Frequency of the plan in days"),
        month_frequency: z.coerce
          .number()
          .describe("Frequency of the plan in months"),
        day_of_month: z.coerce
          .number()
          .describe("Specific day of the month for the plan"),
        plan_payments: z
          .union([z.coerce.number(), z.literal("until_cancelled")])
          .describe("Number of payments for the plan"),
      })
    ),
  }),
});

export type QueryRecurringPlansResponse = z.infer<
  typeof QueryRecurringPlansResponseSchema
>;

// Query API Response Types for Invoicing Report
export const QueryInvoicingResponseSchema = z.object({
  nm_response: z.object({
    invoice_report: z.object({
      invoice: z.array(
        z.object({
          invoice_id: z.string().describe("Unique identifier for the invoice"),
          amount: z.string().describe("Total amount of the invoice"),
          status: z.string().describe("Status of the invoice"),
          currency: z.string().describe("Currency code for the invoice amount"),
          order_description: z.string().describe("Description of the order"),
          customer_id: z
            .string()
            .describe("Unique identifier for the customer"),
          customer_tax_id: z
            .string()
            .describe("Tax ID associated with the customer"),
          order_id: z.string().describe("Unique identifier for the order"),
          po_number: z.string().describe("Purchase order number"),
          tax_amount: z.string().describe("Total tax amount for the invoice"),
          shipping_amount: z
            .string()
            .describe("Total shipping amount for the invoice"),
          discount_amount: z
            .string()
            .describe("Total discount amount for the invoice"),
          created: z.string().describe("Creation date of the invoice"),
          terms: z.string().describe("Payment terms for the invoice"),
          payments_applied: z
            .string()
            .describe("Total payments applied to the invoice"),
          billing: z.object({
            first_name: z.string().describe("First name for billing contact"),
            last_name: z.string().describe("Last name for billing contact"),
            address1: z.string().describe("Primary address line for billing"),
            address2: z.string().describe("Secondary address line for billing"),
            company: z.string().describe("Company name for billing"),
            city: z.string().describe("City for billing"),
            state: z.string().describe("State for billing"),
            postal: z.string().describe("Postal code for billing"),
            country: z.string().describe("Country for billing"),
            email: z.string().describe("Email address for billing"),
            phone: z.string().describe("Phone number for billing"),
            fax: z.string().describe("Fax number for billing"),
          }),
          shipping: z.object({
            first_name: z.string().describe("First name for shipping contact"),
            last_name: z.string().describe("Last name for shipping contact"),
            address1: z.string().describe("Primary address line for shipping"),
            address2: z
              .string()
              .describe("Secondary address line for shipping"),
            company: z.string().describe("Company name for shipping"),
            city: z.string().describe("City for shipping"),
            state: z.string().describe("State for shipping"),
            postal: z.string().describe("Postal code for shipping"),
            country: z.string().describe("Country for shipping"),
            email: z.string().describe("Email address for shipping"),
            phone: z.string().describe("Phone number for shipping"),
            fax: z.string().describe("Fax number for shipping"),
          }),
        })
      ),
    }),
  }),
});

export type QueryInvoicingResponse = z.infer<
  typeof QueryInvoicingResponseSchema
>;

export const GatewayProcessorSchema = z.object({
  description: z.string().describe("Description of the gateway processor"),
  processor_id: z.string().describe("Unique identifier for the processor"),
  platform: z
    .string()
    .describe("Platform associated with the gateway processor"),
  emv_support: z
    .boolean()
    .describe(
      "EMV support status; indicates whether the processor supports EMV transactions"
    ),
  mcc: z.number().describe("Merchant category code"),
});

export type GatewayProcessor = z.infer<typeof GatewayProcessorSchema>;

// Query API Response Types for Gateway Processors Report
export const QueryGatewayProcessorsResponseSchema = z.object({
  nm_response: z.object({
    gateway_processor: z
      .array(GatewayProcessorSchema)
      .or(GatewayProcessorSchema),
  }),
});

export type QueryGatewayProcessorsResponse = z.infer<
  typeof QueryGatewayProcessorsResponseSchema
>;

// Query API Response Types for Profile Report with Processor Details
export const QueryProfileResponseSchema = z.object({
  nm_response: z.object({
    protected: z
      .boolean()
      .describe("Indicates whether the response is protected"),
    is_gateway: z
      .boolean()
      .describe("Indicates whether the response is related to a gateway"),
    merchant: z.object({
      company: z.string().describe("Merchant's company name"),
      email: z.string().describe("Merchant's email address"),
      phone: z.number().describe("Merchant's phone number"),
      url: z.string().describe("Merchant's website URL"),
      address1: z.string().describe("Merchant's primary address line"),
      address2: z.string().describe("Merchant's secondary address line"),
      city: z.string().describe("Merchant's city"),
      state: z.string().describe("Merchant's state"),
      zip: z.number().describe("Merchant's ZIP code"),
      country: z.string().describe("Merchant's country"),
      timezone: z.string().describe("Merchant's timezone"),
      card_schemes: z
        .string()
        .optional()
        .describe("Supported card schemes by the merchant"),
    }),
    gateway: z.object({
      company: z.string().describe("Gateway's company name"),
      url: z.string().describe("Gateway's website URL"),
      email: z.string().describe("Gateway's email address"),
      phone: z.number().describe("Gateway's phone number"),
      primary_color: z.string().describe("Gateway's primary color code"),
      complimentary_color_1: z
        .string()
        .describe("Gateway's first complimentary color code"),
      complimentary_color_2: z
        .string()
        .describe("Gateway's second complimentary color code"),
    }),
    merchant_defined_fields: z
      .array(z.record(z.unknown()))
      .or(z.string())
      .describe("Merchant-defined fields"),
    merchant_favicon: z.string().describe("Merchant's favicon data"),
    processors: z
      .object({
        processor: z.array(
          z.object({
            id: z.string().describe("Processor's unique identifier"),
            type: z.string().describe("Processor's type"),
            platform: z.string().describe("Processor's platform"),
            tap_to_mobile: z
              .record(z.unknown())
              .describe("Details related to tap mobile functionality"),
            required_fields: z
              .string()
              .describe("Fields required by the processor"),
            currencies: z
              .record(z.unknown())
              .or(z.string().array())
              .describe("Supported currencies by the processor"),
            merchant_category_code: z
              .number()
              .describe("Merchant category code associated with the processor"),
          })
        ),
      })
      .optional(),
    account_details: z.object({
      account_status: z.string().describe("Status of the merchant's account"),
      test_mode_enabled: z
        .boolean()
        .describe(
          "Indicates whether test mode is enabled for the merchant's account"
        ),
    }),
  }),
});

export type QueryProfileResponse = z.infer<typeof QueryProfileResponseSchema>;

export const QueryTransactionResponseSchema = z.object({
  nm_response: z.object({
    transaction: z.array(
      z.object({
        transaction_id: z.string(),
        platform_id: z.string().nullable(),
        transaction_type: z.string(),
        condition: z.string(),
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
        cc_start_date: z.string().nullable(),
        cc_issue_number: z.string().nullable(),
        cc_bin: z.string(),
        cc_type: z.string(),
        tax: z.string(),
        currency: z.string(),
        processor_id: z.string(),
        actions: z.array(
          z.object({
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
          })
        ),
        products: z
          .array(
            z.object({
              sku: z.string(),
              description: z.string(),
              amount: z.string(),
              quantity: z.string(),
            })
          )
          .optional(),
      })
    ),
  }),
});

export type QueryTransactionResponse = z.infer<
  typeof QueryTransactionResponseSchema
>;

export const QueryResponseSchema = z.union([
  QueryCustomerVaultResponseSchema,
  QueryRecurringResponseSchema,
  QueryRecurringPlansResponseSchema,
  QueryInvoicingResponseSchema,
  QueryGatewayProcessorsResponseSchema,
  QueryProfileResponseSchema,
  QueryTransactionResponseSchema,
]);

export type QueryResponse = z.infer<typeof QueryResponseSchema>;

export const FlatQueryResponseSchema = z.object({
  // Response Type Identifier
  query_type: z.enum([
    "customer_vault",
    "recurring",
    "recurring_plans",
    "invoicing",
    "gateway_processors",
    "profile",
    "transaction", // Added transaction type
  ]),

  // Common Fields
  id: z.string().optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
  status: z.string().optional(),

  // Transaction-specific Fields
  transaction_id: z.string().optional(),
  platform_id: z.string().nullable().optional(),
  authorization_code: z.string().optional(),
  transaction_type: z.string().optional(),
  condition: z.string().optional(),
  tax: z.string().optional(),
  actions: z
    .array(
      z.object({
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
      })
    )
    .optional(),
  products: z
    .array(
      z.object({
        sku: z.string(),
        description: z.string(),
        amount: z.string(),
        quantity: z.string(),
      })
    )
    .optional(),

  // Customer/Billing Info
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  cell_phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().optional(),

  // Address Fields
  address_1: z.string().optional(),
  address_2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),

  // Shipping Info
  shipping_first_name: z.string().optional(),
  shipping_last_name: z.string().optional(),
  shipping_address_1: z.string().optional(),
  shipping_address_2: z.string().optional(),
  shipping_company: z.string().optional(),
  shipping_city: z.string().optional(),
  shipping_state: z.string().optional(),
  shipping_postal_code: z.string().optional(),
  shipping_country: z.string().optional(),
  shipping_email: z.string().optional(),
  shipping_carrier: z.string().optional(),
  shipping_date: z.string().optional(),
  shipping_amount: z.string().optional(),
  tracking_number: z.string().optional(),

  // Payment Info
  cc_number: z.coerce.number().optional(),
  cc_hash: z.string().optional(),
  cc_exp: z.string().optional(),
  cc_start_date: z.string().optional(),
  cc_issue_number: z.string().optional(),
  cc_bin: z.string().optional(),
  cc_type: z.string().optional(),

  // Bank Account Info
  check_account: z.string().optional(),
  check_hash: z.string().optional(),
  check_aba: z.string().optional(),
  check_name: z.string().optional(),
  account_holder_type: z.string().optional(),
  account_type: z.string().optional(),
  sec_code: z.string().optional(),

  // Subscription/Plan Fields
  subscription_id: z.string().optional(),
  plan_id: z.string().optional(),
  plan_name: z.string().optional(),
  plan_amount: z.coerce.number().optional(),
  plan_payments: z
    .union([z.coerce.number(), z.literal("until_cancelled")])
    .optional()
    .describe("Number of payments for the plan"),
  day_frequency: z.coerce.number().optional(),
  month_frequency: z.coerce.number().optional(),
  day_of_month: z.coerce.number().optional(),
  next_charge_date: z.string().optional(),
  completed_payments: z.coerce.number().optional(),
  attempted_payments: z.coerce.number().optional(),
  remaining_payments: z.coerce.number().optional(),

  // Invoice Fields
  invoice_id: z.string().optional(),
  amount: z.string().optional(),
  currency: z.string().optional(),
  order_id: z.string().optional(),
  po_number: z.string().optional(),
  order_description: z.string().optional(),
  tax_amount: z.string().optional(),
  discount_amount: z.string().optional(),
  payments_applied: z.string().optional(),

  // Processor Fields
  processor_id: z.string().optional(),
  platform: z.string().optional(),
  mcc: z.string().optional(),
  emv_support: z.string().optional(),

  // Merchant/Gateway Fields
  merchant_company: z.string().optional(),
  merchant_email: z.string().optional(),
  merchant_url: z.string().optional(),
  merchant_phone: z.string().optional(),
  merchant_timezone: z.string().optional(),
  merchant_favicon: z.string().optional(),
  card_schemes: z.string().optional(),
  account_status: z.string().optional(),
  test_mode_enabled: z.string().optional(),

  // Custom Fields
  initiatedBy: z.string().optional(),
  usersAffected: z.array(z.string()).optional(),
  timestamp: z.string().optional(),

  // Raw Response Storage
  raw_response: z.string().optional(),
  error: z.any().optional(),
});

export type FlatQueryResponse = z.infer<typeof FlatQueryResponseSchema>;
