import { z } from "zod";

export const CUSTOMER_VAULT_URL = "https://secure.nmi.com/api/transact.php";

export const AddUpdateCustomerSchema = z.object({
  customer_vault: z
    .literal("add_customer")
    .or(z.literal("update_customer"))
    .describe(`Add or update a customer in the customer vault`),
  customer_vault_id: z
    .string()
    .or(z.number())
    .optional()
    .describe(
      `The customer vault id of the customer to update, if not set the gateway will generate one randomly.`
    ),
  billing_id: z
    .string()
    .optional()
    .describe(
      `The billing id of the customer to update, if not set the gateway will create one or the billing id with priority '1' will be updated.`
    ),
  payment_token: z
    .string()
    .optional()
    .describe(
      `The tokenized version of the customer's card or check information. This will be generated by Collect.js and is usable once.`
    ),
  googlepay_payment_data: z
    .string()
    .optional()
    .describe(
      `The tokenized version of the customer's Google Pay payment data created when integrated with Google Pay SDK.`
    ),
  ccnumber: z.string().optional().describe(`The customer's credit card number`),
  ccexp: z
    .string()
    .optional()
    .describe(
      `The expiration date of the customer's credit card in MMYY format`
    ),
  checkname: z
    .string()
    .optional()
    .describe(`The name on the customer's checking account`),
  checkaba: z
    .string()
    .optional()
    .describe(`The ABA routing number of the customer's bank`),
  checkaccount: z
    .string()
    .optional()
    .describe(`The customer's checking account number`),
  account_holder_type: z
    .literal("personal")
    .or(z.literal("business"))
    .optional()
    .describe(`The type of account holder. 'personal' or 'business'`),
  account_type: z
    .literal("checking")
    .or(z.literal("savings"))
    .optional()
    .describe(`The type of account. 'checking' or 'savings'`),
  sec_code: z
    .literal("WEB")
    .or(z.literal("TEL"))
    .or(z.literal("CCD"))
    .or(z.literal("PPD"))
    .optional()
    .describe(
      `The Standard Entry Class code for the transaction. 'WEB', 'TEL', 'CCD', or 'PPD'`
    ),
  currency: z
    .string()
    .optional()
    .default("USD")
    .describe(`The currency of the transaction. Defaults to USD`),
  payment_type: z
    .literal("creditcard")
    .or(z.literal("check"))
    .optional()
    .describe(`The type of payment. 'creditcard' or 'check'`),
  orderid: z.string().optional().describe(`The order id of the transaction`),
  order_description: z
    .string()
    .optional()
    .describe(`The description of the transaction`),
  custom_fields: z
    .record(z.string())
    .optional()
    .describe(`Custom fields to be added to the transaction`),
  first_name: z.string().optional().describe(`The customer's first name`),
  last_name: z.string().optional().describe(`The customer's last name`),
  company: z.string().optional().describe(`The customer's company name`),
  address1: z.string().optional().describe(`The customer's address`),
  address2: z.string().optional().describe(`The customer's address (line 2)`),
  city: z.string().optional().describe(`The customer's city`),
  state: z.string().optional().describe(`The customer's state`),
  zip: z.string().optional().describe(`The customer's zip code`),
  country: z.string().optional().describe(`The customer's country`),
  phone: z.string().optional().describe(`The customer's phone number`),
  email: z.string().optional().describe(`The customer's email address`),
  fax: z.string().optional().describe(`The customer's fax number`),
  shipping_id: z
    .string()
    .optional()
    .describe(
      `The shipping entry ID. If none is provided, one will be created or the billing id with priority '1' will be updated.`
    ),
  shipping_firstname: z.string().optional().describe(`The shipping first name`),
  shipping_lastname: z.string().optional().describe(`The shipping last name`),
  shipping_company: z.string().optional().describe(`The shipping company name`),
  shipping_address1: z.string().optional().describe(`The shipping address`),
  shipping_address2: z
    .string()
    .optional()
    .describe(`The shipping address (line 2)`),
  shipping_city: z.string().optional().describe(`The shipping city`),
  shipping_state: z.string().optional().describe(`The shipping state`),
  shipping_zip: z.string().optional().describe(`The shipping zip code`),
  shipping_country: z.string().optional().describe(`The shipping country`),
  shipping_phone: z.string().optional().describe(`The shipping phone number`),
  shipping_fax: z.string().optional().describe(`The shipping fax number`),
  shipping_email: z.string().optional().describe(`The shipping email address`),
  source_transaction_id: z
    .string()
    .optional()
    .describe(`The transaction id of the source transaction`),
  acu_enabled: z
    .literal(true)
    .or(z.literal(false))
    .optional()
    .describe(
      `Is set to true, credit card will be evalutated and sent based upon Automatic Card Updater settings. If set to false, credit card will not be submitted for updates when Automatic Card Updater runs.`
    ),
});

export const AddUpdateCustomerRequestSchema = AddUpdateCustomerSchema.transform(
  (data) => {
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
    return { ...data, ...transformedCustomFields };
  }
);

export const CustomerVaultInitiatedTransactionSchema = z.object({
  customer_vault_id: z
    .string()
    .or(z.number())
    .optional()
    .describe(`The customer vault id of the customer`),
  amount: z.number().describe(`The amount of the transaction to be processed`),
  currency: z
    .string()
    .optional()
    .default("USD")
    .describe(`The currency of the transaction. Defaults to USD`),
  processor_id: z
    .string()
    .optional()
    .describe(
      `If using Multiple MIDs, route to this processor (processor_id is obtained
under Settings->Transaction Routing in the Control Panel).`
    ),
  descriptor: z
    .string()
    .optional()
    .describe(
      `The descriptor to be used for the transaction. If not set, the default descriptor will be used.`
    ),
  descriptor_phone: z
    .string()
    .optional()
    .describe(
      `The phone number to be used for the transaction descriptor. If not set, the default descriptor phone number will be used.`
    ),
  order_description: z
    .string()
    .optional()
    .describe(`The description of the transaction`),
  orderid: z.string().optional().describe(`The order id of the transaction`),
  initiated_by: z
    .literal("customer")
    .or(z.literal("merchant"))
    .describe(
      `Who initiated the transaction. 'customer' or 'merchant'. If not set, the default is 'merchant'`
    ),
  iniital_transaction_id: z
    .string()
    .optional()
    .describe(`The transaction id of the source transaction`),
  stored_credential_indicator: z
    .literal("stored")
    .or(z.literal("used"))
    .optional().describe(`The indicator of the stored credential.
Values: 'stored' or 'used'
Use 'stored' when processing the initial transaction in which you are storing a customer's payment
details (customer credentials) in the Customer Vault or other third-party payment storage system.
Use 'used' when processing a subsequent or follow-up transaction using the customer payment
details (customer credentials) you have already stored to the Customer Vault or third-party payment
storage method.`),
});

export const AuthorizeCustomerByVaultIdRequestSchema = z.object({
  type: z.literal("auth").describe(`The type of transaction`),
  customer_vault_id: z
    .string()
    .or(z.number())
    .describe(`The customer vault id of the customer to authorize`),
  amount: z.number().describe(`The amount of the transaction to be processed`),
});

export const CreditTransactionByVaultIdRequestSchema = z.object({
  type: z.literal("credit").describe(`The type of transaction`),
  customer_vault_id: z
    .string()
    .or(z.number())
    .describe(`The customer vault id of the customer to credit`),
  amount: z.number().describe(`The amount of the transaction to be processed`),
});

export const OfflineTransactionByVaultIdRequestSchema = z.object({
  type: z.literal("offline").describe(`The type of transaction`),
  customer_vault_id: z
    .string()
    .or(z.number())
    .describe(
      `The customer vault id of the customer to process the transaction`
    ),
  amount: z.number().describe(`The amount of the transaction to be processed`),
});

export const SaleByVaultIdRequestSchema = z.object({
  type: z.literal("sale").describe(`The type of transaction`),
  customer_vault_id: z
    .string()
    .or(z.number())
    .describe(
      `The customer vault id of the customer to process the transaction`
    ),
  amount: z.number().describe(`The amount of the transaction to be processed`),
});

export const ValidateCustomerByVaultIdRequestSchema = z.object({
  customer_vault: z
    .literal("validate")
    .describe(`Validate a customer vault id in the customer vault`),
  customer_vault_id: z
    .string()
    .or(z.number())
    .describe(`The customer vault id of the customer to validate`),
});

export const DeleteCustomerRecordSchema = z.object({
  customer_vault: z
    .literal("delete_customer")
    .describe(`Delete a customer from the customer vault`),
  customer_vault_id: z
    .string()
    .or(z.number())
    .describe(`The customer vault id of the customer to delete`),
  security_key: z
    .string()
    .describe(
      `API Security Key assigned to a merchant account. New keys can be generated from the merchant control panel in Settings > Security Keys`
    ),
});

export const AddBillingForCustomerRequestSchema = z.object({
  customer_vault: z
    .literal("add_billing")
    .describe(`Add a billing record to the customer vault`),
  customer_vault_id: z
    .string()
    .or(z.number())
    .optional()
    .describe(`The customer vault id of the customer`),
  billing_id: z
    .string()
    .optional()
    .describe(
      `The billing id of the customer to update, if not set the gateway will create one or the billing id with priority '1' will be updated.`
    ),
  ccnumber: z.string().optional().describe(`The customer's credit card number`),
  ccexp: z
    .string()
    .optional()
    .describe(
      `The expiration date of the customer's credit card in MMYY format`
    ),
  first_name: z.string().optional().describe(`The customer's first name`),
  last_name: z.string().optional().describe(`The customer's last name`),
  address1: z.string().optional().describe(`The customer's address`),
  address2: z.string().optional().describe(`The customer's address (line 2)`),
  city: z.string().optional().describe(`The customer's city`),
  state: z.string().optional().describe(`The customer's state`),
  zip: z.string().optional().describe(`The customer's zip code`),
  country: z.string().optional().describe(`The customer's country`),
  phone: z.string().optional().describe(`The customer's phone number`),
  email: z.string().optional().describe(`The customer's email address`),
  fax: z.string().optional().describe(`The customer's fax number`),
  company: z.string().optional().describe(`The customer's company name`),
});

export const UpdateBillingForCustomerRequestSchema =
  AddBillingForCustomerRequestSchema.extend({
    customer_vault: z
      .literal("update_billing")
      .describe(`Update a billing record in the customer vault`),
  });

export const DeleteBillingForCustomerRequestSchema = z.object({
  customer_vault: z
    .literal("delete_billing")
    .describe(`Delete a billing record from the customer vault`),
  customer_vault_id: z
    .string()
    .or(z.number())
    .describe(`The customer vault id of the customer`),
  billing_id: z.string().describe(`The billing id of the customer to delete`),
});
