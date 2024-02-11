import { z } from "zod";

export const INVOICE_URL = "https://secure.nmi.com/api/transact.php";

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

export const CreateInvoiceSchema = z.object({
  invoicing: z
    .literal("add_invoice")
    .describe(`Create a new invoice and email it to the customer`),
  security_key: z.string()
    .describe(`API Security Key assigned to a merchant account.
    New keys can be generated from the merchant control panel in Settings > Security Keys`),
  amount: z
    .number()
    .positive()
    .describe(
      `The amount to charge the customer. The amount should be in the format 0.00`
    ),
  email: z
    .string()
    .email()
    .describe(`The email address of the customer to send the invoice to`),
  payment_terms: z
    .number()
    .min(0)
    .max(999)
    .or(z.literal("upon_receipt"))
    .describe(`When the invoice should be paid.`),
  payment_terms_allowed: z
    .array(z.literal("cc").or(z.literal("ck")).or(z.literal("cs")))
    .describe(
      `The payment methods allowed for the invoice. Defaults to all available payment methods available in your merchant account. Multiple types are allowed.`
    ),
  processor_id: z.string().optional()
    .describe(`If using Multiple MIDs, route to this processor (processor_id is obtained
        under Settings ? Transaction Routing in the Control Panel).
        If allowing multiple payment types, one processor_id can be selected per payment type by
        submitting comma-separated values.`),
  currency: z
    .string()
    .optional()
    .default("USD")
    .describe(`The currency of the invoice. Defaults to USD`),
  order_description: z
    .string()
    .optional()
    .describe(`A description of the order`),
  orderid: z.string().optional().describe(`The order ID of the order`),
  customer_id: z
    .string()
    .optional()
    .describe(`The customer ID of the customer`),
  customer_tax_id: z.string().optional().describe(`The tax ID of the customer`),
  tax: z.number().optional().describe(`The tax amount of the invoice`),
  shipping: z
    .number()
    .optional()
    .describe(`The shipping amount of the invoice`),
  ponumber: z
    .string()
    .optional()
    .describe(`The purchase order number of the invoice`),
  first_name: z.string().optional().describe(`The first name of the customer`),
  last_name: z.string().optional().describe(`The last name of the customer`),
  company: z.string().optional().describe(`The company name of the customer`),
  address1: z.string().optional().describe(`The address of the customer`),
  address2: z.string().optional().describe(`The address of the customer`),
  city: z.string().optional().describe(`The city of the customer`),
  state: z.string().optional().describe(`The state of the customer`),
  zip: z.string().optional().describe(`The zip code of the customer`),
  country: z.string().optional().describe(`The country of the customer`),
  phone: z.string().optional().describe(`The phone number of the customer`),
  fax: z.string().optional().describe(`The fax number of the customer`),
  website: z.string().optional().describe(`The website of the customer`),
  shipping_firstname: z
    .string()
    .optional()
    .describe(`The first name of the shipping address`),
  shipping_lastname: z
    .string()
    .optional()
    .describe(`The last name of the shipping address`),
  shipping_company: z
    .string()
    .optional()
    .describe(`The company name of the shipping address`),
  shipping_address1: z
    .string()
    .optional()
    .describe(`The address of the shipping address`),
  shipping_address2: z
    .string()
    .optional()
    .describe(`The address of the shipping address`),
  shipping_city: z
    .string()
    .optional()
    .describe(`The city of the shipping address`),
  shipping_state: z
    .string()
    .optional()
    .describe(`The state of the shipping address`),
  shipping_zip: z
    .string()
    .optional()
    .describe(`The zip code of the shipping address`),
  shipping_country: z
    .string()
    .optional()
    .describe(`The country of the shipping address`),
  shipping_email: z
    .string()
    .optional()
    .describe(`The email address of the shipping address`),
  custom_fields: z
    .record(z.string())
    .optional()
    .describe(`Custom fields to add to the invoice`),
  products: z
    .array(ProductDataSchema)
    .optional()
    .describe(`The products to add to the invoice`),
});

export const CreateInvoiceRequestSchema = CreateInvoiceSchema.transform(
  (data) => {
    // First we need to transform the products array to the same keys but _1, _2, _3, etc.
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
    // Then we need to take the custom fields and turn it into merchant_defined_field_1, merchant_defined_field_2, etc.
    const customFields = data.custom_fields || {};
    const transformedCustomFields = Object.keys(customFields).reduce(
      (acc, key, index) => {
        const newKey = `merchant_defined_field_${index + 1}`;
        return { ...acc, [newKey]: customFields[key] };
      },
      {}
    );
    // Then we return the correct object for parsing for the request
    return { ...data, ...transformedProducts, ...transformedCustomFields };
  }
);

export const UpdateInvoiceSchema = z.object({
  invoicing: z.literal("update_invoice").describe(`Update an existing invoice`),
  security_key: z.string()
    .describe(`API Security Key assigned to a merchant account.
    New keys can be generated from the merchant control panel in Settings > Security Keys`),
  invoice_id: z.string().describe(`The invoice ID to update`),
});

export const SendInvoiceSchema = z.object({
  invoicing: z
    .literal("send_invoice")
    .describe(`Send an existing invoice to the customer`),
  security_key: z.string()
    .describe(`API Security Key assigned to a merchant account.
    New keys can be generated from the merchant control panel in Settings > Security Keys`),
  invoice_id: z.string().describe(`The invoice ID to send`),
});

export const CloseInvoiceSchema = z.object({
  invoicing: z.literal("close_invoice").describe(`Close an existing invoice`),
  security_key: z.string()
    .describe(`API Security Key assigned to a merchant account.
    New keys can be generated from the merchant control panel in Settings > Security Keys`),
  invoice_id: z.string().describe(`The invoice ID to close`),
});
