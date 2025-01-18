import { z } from "zod";

export const TRANSACTION_URL = "https://secure.nmi.com/api/transact.php";

export const TransactionTypeSchema = z.enum([
  "sale",
  "auth",
  "credit",
  "validate",
  "offline",
  "complete_partial_payment",
]);

export const ProductDataSchema = z.object({
  item_product_code: z.string(),
  item_description: z.string(),
  item_commodity_code: z.string(),
  item_unit_of_measure: z.string(),
  item_unit_cost: z.number(),
  item_quantity: z.number(),
  item_total_amount: z.number(),
  item_tax_amount: z.number(),
  item_tax_rate: z.number(),
  item_discount_amount: z.number(),
  item_tax_type: z.string(),
  item_alternate_tax_id: z.string(),
});

export const TransactionSchema = z.object({
  type: TransactionTypeSchema,
  payment_token: z.string().optional(),
  transaction_session_id: z.string().length(32).optional(),
  googlepay_payment_data: z.string().optional(),
  ccnumber: z.string().optional(),
  ccexp: z.string().optional(),
  cvv: z.string().optional(),
  checkname: z.string().optional(),
  checkaba: z.string().optional(),
  checkaccount: z.string().optional(),
  account_holder_type: z
    .literal("business")
    .or(z.literal("personal"))
    .optional(),
  account_type: z.literal("checking").or(z.literal("savings")).optional(),
  sec_code: z
    .literal("PPD")
    .or(z.literal("WEB"))
    .or(z.literal("TEL"))
    .or(z.literal("CCD"))
    .optional(),
  amount: z.number().optional(),
  surcharge: z.number().default(0.0).optional(),
  convenience_fee: z.number().default(0.0).optional(),
  misc_fee: z.number().default(0.0).optional(),
  misc_fee_name: z.string().default("Miscellaneous Fee").optional(),
  tip: z.number().default(0.0).optional(),
  currency: z.string().default("USD").optional(),
  payment: z
    .literal("creditcard")
    .or(z.literal("check"))
    .or(z.literal("cash"))
    .default("creditcard"),
  processor_id: z.string().optional(),
  authorization_code: z.string().optional(),
  dup_seconds: z.number().max(7862400).optional(),
  descriptor: z.string().optional(),
  descriptor_phone: z.string().optional(),
  descriptor_address: z.string().optional(),
  descriptor_city: z.string().optional(),
  descriptor_state: z.string().optional(),
  descriptor_postal: z.string().optional(),
  descriptor_country: z.string().optional(),
  descriptor_mcc: z.string().optional(),
  descriptor_merchant_id: z.string().optional(),
  descriptor_url: z.string().optional(),
  billing_method: z
    .literal("recurring")
    .or(z.literal("installment"))
    .optional(),
  billing_number: z.number().min(0).max(99).optional(),
  billing_total: z.number().optional(),
  order_template: z.string().optional(),
  order_description: z.string().optional(),
  orderid: z.string().optional(),
  ipaddress: z.string().optional(),
  tax: z.number().default(0.0).optional(),
  shipping: z.number().default(0.0).optional(),
  ponumber: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  company: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().optional(),
  social_security_number: z.string().optional(),
  drivers_license_number: z.string().optional(),
  drivers_license_dob: z.string().optional(),
  drivers_license_state: z.string().optional(),
  shipping_firstname: z.string().optional(),
  shipping_lastname: z.string().optional(),
  shipping_company: z.string().optional(),
  shipping_address1: z.string().optional(),
  shipping_address2: z.string().optional(),
  shipping_city: z.string().optional(),
  shipping_state: z.string().optional(),
  shipping_zip: z.string().optional(),
  shipping_country: z.string().optional(),
  shipping_email: z.string().optional(),
  custom_fields: z.record(z.string(), z.string().or(z.number())).optional(),
  customer_receipt: z.boolean().default(false).optional(),
  signature_image: z.string().optional(),
  cardholder_auth: z.literal("verified").or(z.literal("attempted")).optional(),
  cavv: z.string().optional(),
  xid: z.string().optional(),
  three_ds_version: z.string().optional(),
  directory_server_id: z.string().optional(),
  source_transaction_id: z.string().optional(),
  pinless_debit_override: z.literal("Y").or(z.literal("N")).optional(),
  recurring: z.literal("add_subscription").optional(),
  plan_id: z.string().optional(),
  plan_payments: z.number().default(0).optional(),
  plan_amount: z.number().default(0).optional(),
  day_frequency: z.number().default(0).optional(),
  month_frequency: z.number().min(1).max(24).optional(),
  day_of_month: z.number().min(1).max(31).optional(),
  start_date: z.string().optional(),
  customer_vault: z
    .literal("add_customer")
    .or(z.literal("update_customer"))
    .optional(),
  customer_vault_id: z.string().optional(),
  initiated_by: z.literal("customer").or(z.literal("merchant")).optional(),
  initial_transaction_id: z.string().optional(),
  stored_credential_indicator: z
    .literal("stored")
    .or(z.literal("used"))
    .optional(),
  shipping_postal: z.string().optional(),
  ship_from_postal: z.string().optional(),
  summary_commodity_code: z.string().optional(),
  duty_amount: z.number().default(0.0).optional(),
  discount_amount: z.number().default(0.0).optional(),
  national_tax_amount: z.number().default(0.0).optional(),
  alternate_tax_amount: z.number().default(0.0).optional(),
  alternate_tax_id: z.string().optional(),
  vat_tax_amount: z.number().default(0.0).optional(),
  vat_tax_rate: z.number().default(0.0).optional(),
  vat_invoice_reference_number: z.string().optional(),
  customer_vat_registration: z.string().optional(),
  merchant_vat_registration: z.string().optional(),
  order_date: z.string().optional(),
  products: z.array(ProductDataSchema).optional(),
  payment_facilitator_id: z.string().optional(),
  submerchant_id: z.string().optional(),
  submerchant_name: z.string().optional(),
  submerchant_address: z.string().optional(),
  submerchant_city: z.string().optional(),
  submerchant_state: z.string().optional(),
  submerchant_postal: z.string().optional(),
  submerchant_country: z.string().optional(),
  submerchant_phone: z.string().optional(),
  submerchant_email: z.string().optional(),
  partial_payment_id: z.string().optional(),
  partial_payments: z
    .literal("settle_partial")
    .or(z.literal("payment_in_full"))
    .optional(),
});

export const TransactionRequestSchema = TransactionSchema.transform((data) => {
  const products = data.products || [];
  const transformedProducts = products.reduce((acc, product, index) => {
    const productKeys = Object.keys(product);
    const newProduct = productKeys.reduce((productAcc, key) => {
      const newKey = `${key}_${index + 1}`;
      return {
        ...productAcc,
        [newKey]: product[key as keyof typeof product],
      };
    }, {});
    return { ...acc, ...newProduct };
  }, {});
  const customFields = data.custom_fields || {};
  const transformedCustomFields = Object.keys(customFields).reduce(
    (acc, key, index) => {
      const newKey = `merchant_defined_field_${index + 1}`;
      return { ...acc, [newKey]: customFields[key] };
    },
    {}
  );
  return { ...data, ...transformedProducts, ...transformedCustomFields };
});

export const AuthTransactionRequestSchema = TransactionSchema.pick({
  // Same fields as ValidateTransactionRequestSchema
  type: true,
  ccnumber: true,
  ccexp: true,
  cvv: true,
  payment_token: true,
  transaction_session_id: true,
  googlepay_payment_data: true,
  surcharge: true,
  convenience_fee: true,
  misc_fee: true,
  misc_fee_name: true,
  tip: true,
  currency: true,
  processor_id: true,
  dup_seconds: true,
  descriptor: true,
  descriptor_phone: true,
  descriptor_address: true,
  descriptor_city: true,
  descriptor_state: true,
  descriptor_postal: true,
  descriptor_country: true,
  descriptor_mcc: true,
  descriptor_merchant_id: true,
  descriptor_url: true,
  billing_method: true,
  billing_number: true,
  billing_total: true,
  order_template: true,
  order_description: true,
  orderid: true,
  ipaddress: true,
  first_name: true,
  last_name: true,
  company: true,
  address1: true,
  address2: true,
  city: true,
  state: true,
  zip: true,
  country: true,
  phone: true,
  fax: true,
  email: true,
  drivers_license_number: true,
  drivers_license_dob: true,
  drivers_license_state: true,
  shipping_firstname: true,
  shipping_lastname: true,
  shipping_company: true,
  shipping_address1: true,
  shipping_address2: true,
  shipping_city: true,
  shipping_state: true,
  shipping_zip: true,
  shipping_country: true,
  shipping_email: true,
  custom_fields: true,
  customer_receipt: true,
  cardholder_auth: true,
  cavv: true,
  xid: true,
  three_ds_version: true,
  directory_server_id: true,
  source_transaction_id: true,
  pinless_debit_override: true,
  recurring: true,
  plan_id: true,
  plan_payments: true,
  plan_amount: true,
  month_frequency: true,
  day_of_month: true,
  day_frequency: true,
  start_date: true,
  customer_vault: true,
  customer_vault_id: true,
  initiated_by: true,
  initial_transaction_id: true,
  stored_credential_indicator: true,
  shipping: true,
  tax: true,
  ponumber: true,
  shipping_postal: true,
  ship_from_postal: true,
  summary_commodity_code: true,
  duty_amount: true,
  discount_amount: true,
  national_tax_amount: true,
  alternate_tax_amount: true,
  alternate_tax_id: true,
  vat_tax_amount: true,
  vat_tax_rate: true,
  vat_invoice_reference_number: true,
  customer_vat_registration: true,
  merchant_vat_registration: true,
  order_date: true,
  products: true,
  payment_facilitator_id: true,
  submerchant_id: true,
  submerchant_name: true,
  submerchant_address: true,
  submerchant_city: true,
  submerchant_state: true,
  submerchant_postal: true,
  submerchant_country: true,
  submerchant_phone: true,
  submerchant_email: true,
  signature_image: true,
  // Key difference: amount is required for auth
  amount: true,
}).extend({
  // Override amount to make it required
  amount: z.number(),
  type: z.literal("auth"),
});

export type AuthTransactionRequest = z.infer<
  typeof AuthTransactionRequestSchema
>;

export const ValidateTransactionRequestSchema = TransactionSchema.pick({
  type: true,
  ccnumber: true,
  ccexp: true,
  cvv: true,
  payment_token: true,
  transaction_session_id: true,
  googlepay_payment_data: true,
  surcharge: true,
  convenience_fee: true,
  misc_fee: true,
  misc_fee_name: true,
  tip: true,
  currency: true,
  processor_id: true,
  dup_seconds: true,
  descriptor: true,
  descriptor_phone: true,
  descriptor_address: true,
  descriptor_city: true,
  descriptor_state: true,
  descriptor_postal: true,
  descriptor_country: true,
  descriptor_mcc: true,
  descriptor_merchant_id: true,
  descriptor_url: true,
  billing_method: true,
  billing_number: true,
  billing_total: true,
  order_template: true,
  order_description: true,
  orderid: true,
  ipaddress: true,
  first_name: true,
  last_name: true,
  company: true,
  address1: true,
  address2: true,
  city: true,
  state: true,
  zip: true,
  country: true,
  phone: true,
  fax: true,
  email: true,
  drivers_license_number: true,
  drivers_license_dob: true,
  drivers_license_state: true,
  shipping_firstname: true,
  shipping_lastname: true,
  shipping_company: true,
  shipping_address1: true,
  shipping_address2: true,
  shipping_city: true,
  shipping_state: true,
  shipping_zip: true,
  shipping_country: true,
  shipping_email: true,
  custom_fields: true,
  customer_receipt: true,
  cardholder_auth: true,
  cavv: true,
  xid: true,
  three_ds_version: true,
  directory_server_id: true,
  source_transaction_id: true,
  pinless_debit_override: true,
  recurring: true,
  plan_id: true,
  plan_payments: true,
  plan_amount: true,
  month_frequency: true,
  day_of_month: true,
  day_frequency: true,
  start_date: true,
  customer_vault: true,
  customer_vault_id: true,
  initiated_by: true,
  initial_transaction_id: true,
  stored_credential_indicator: true,
  shipping: true,
  tax: true,
  ponumber: true,
  shipping_postal: true,
  ship_from_postal: true,
  summary_commodity_code: true,
  duty_amount: true,
  discount_amount: true,
  national_tax_amount: true,
  alternate_tax_amount: true,
  alternate_tax_id: true,
  vat_tax_amount: true,
  vat_tax_rate: true,
  vat_invoice_reference_number: true,
  customer_vat_registration: true,
  merchant_vat_registration: true,
  order_date: true,
  products: true,
  payment_facilitator_id: true,
  submerchant_id: true,
  submerchant_name: true,
  submerchant_address: true,
  submerchant_city: true,
  submerchant_state: true,
  submerchant_postal: true,
  submerchant_country: true,
  submerchant_phone: true,
  submerchant_email: true,
  signature_image: true,
}).extend({
  type: z.literal("validate"),
});

export type ValidateTransactionRequest = z.infer<
  typeof ValidateTransactionRequestSchema
>;

export const CaptureTransactionRequestSchema = z.object({
  type: z.literal("capture"),
  transactionid: z.string(),
  amount: z.number(),
  tracking_number: z.string().optional(),
  shipping_carrier: z.string().optional(),
  orderid: z.string().optional(),
  signature_image: z.string().optional(),
});

export const VoidTransactionRequestSchema = z.object({
  type: z.literal("void"),
  transactionid: z.string(),
  void_reason: z.string().optional(),
  payment: z.literal("creditcard").or(z.literal("check")).optional(),
});

export const RefundTransactionSchema = z.object({
  type: z.literal("refund"),
  transactionid: z.string(),
  amount: z.number().optional(),
  payment: z.literal("creditcard").or(z.literal("check")).optional(),
});

export const UpdateTransactionSchema = z.object({
  type: z.literal("update"),
  transactionid: z.string(),
  payment: z.literal("creditcard").or(z.literal("check")).optional(),
  tracking_number: z.string().optional(),
  shipping: z.number().optional(),
  shipping_postal: z.string().optional(),
  ship_from_postal: z.string().optional(),
  shipping_country: z.string().optional(),
  shipping_carrier: z
    .literal("ups")
    .or(z.literal("fedex"))
    .or(z.literal("dhl"))
    .or(z.literal("usps"))
    .optional(),
  shipping_date: z.string().optional(),
  order_description: z.string().optional(),
  order_date: z.string().optional(),
  customer_receipt: z.boolean().default(false).optional(),
  signature_image: z.string().optional(),
  ponumber: z.string().optional(),
  summary_commodity_code: z.string().optional(),
  duty_amount: z.number().optional(),
  discount_amount: z.number().optional(),
  tax: z.number().default(0.0).optional(),
  national_tax_amount: z.number().optional(),
  alternate_tax_amount: z.number().optional(),
  alternate_tax_id: z.string().optional(),
  vat_tax_amount: z.number().optional(),
  vat_tax_rate: z.number().optional(),
  vat_invoice_reference_number: z.string().optional(),
  customer_vat_registration: z.string().optional(),
  merchant_vat_registration: z.string().optional(),
  custom_fields: z.record(z.string(), z.string().or(z.number())).optional(),
});

export const UpdateTransactionRequestSchema = UpdateTransactionSchema.transform(
  (data) => {
    const customFields = data.custom_fields || {};
    const transformedCustomFields = Object.keys(customFields).reduce(
      (acc, key, index) => {
        const newKey = `merchant_defined_field_${index + 1}`;
        return { ...acc, [newKey]: customFields[key] };
      },
      {}
    );
    return { ...data, ...transformedCustomFields };
  }
);

export const TransactionResponseSchema = z.object({
  response: z.literal("1").or(z.literal("2")).or(z.literal("3")),
  responsetext: z.string(),
  authcode: z.string().optional(),
  transactionid: z.string().optional(),
  avsresponse: z.string().optional(),
  cvvresponse: z.string().optional(),
  orderid: z.string().optional(),
  response_code: z.string().optional(),
  emv_auth_response_data: z.string().optional(),
  customer_vault_id: z.string().optional(),
  kount_score: z.string().optional(),
  merchant_advice_code: z.string().optional(),
});

export type TransactionType = z.infer<typeof TransactionTypeSchema>;
export type ProductData = z.infer<typeof ProductDataSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionRequest = z.infer<typeof TransactionRequestSchema>;
export type CaptureTransactionRequest = z.infer<
  typeof CaptureTransactionRequestSchema
>;
export type VoidTransactionRequest = z.infer<
  typeof VoidTransactionRequestSchema
>;
export type RefundTransaction = z.infer<typeof RefundTransactionSchema>;
export type UpdateTransaction = z.infer<typeof UpdateTransactionSchema>;
export type UpdateTransactionRequest = z.infer<
  typeof UpdateTransactionRequestSchema
>;
export type TransactionResponse = z.infer<typeof TransactionResponseSchema>;
