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
