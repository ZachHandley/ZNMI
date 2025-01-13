# ZNMI TypeScript Wrapper

A comprehensive TypeScript wrapper for NMI (Network Merchants, Inc.) payment gateway API. This wrapper provides type-safe interactions with NMI's services including customer vault management, transaction processing, product management, invoicing, and recurring payments.

## 0.2.0 Update

My bad for leaving it for so long pointing to the wrong file, I have fixed it and updated the `README` <3

- Zach

## Installation

```bash
# Using pnpm (recommended)
pnpm add znmi

# Using npm
npm install znmi

# Using yarn
yarn add znmi
```

## Quick Start

```typescript
import { ZNMI } from "znmi";

const znmi = new ZNMI("your_security_key_here");
```

## API Documentation

### Customer Vault API

Manage customer data and payment information securely.

```typescript
// Add or Update a Customer
const customerData = {
  customer_vault: "add_customer",
  ccnumber: "4111111111111111",
  ccexp: "1225",
};
const response = await znmi.customerVault.addOrUpdateCustomer(customerData);

// Validate Customer by Vault ID
const validateData = {
  customer_vault_id: "12345",
};
await znmi.customerVault.validateCustomerVaultId(validateData);
```

Available Methods:

- `addOrUpdateCustomer(request: AddUpdateCustomerRequest)` - Add or update a customer's information
- `validateCustomerVaultId(request: ValidateCustomerVaultIdRequest)` - Validate stored customer data
- `authorizeCustomerByVaultId(request: AuthorizeCustomerByVaultIdRequest)` - Authorize payment using vault
- `saleByVaultId(request: SaleByVaultIdRequest)` - Process sale using vault
- `creditTransactionByVaultId(request: CreditTransactionByVaultIdRequest)` - Process credit using vault
- `offlineTransactionByVaultId(request: OfflineTransactionByVaultIdRequest)` - Process offline transaction
- `initiateCustomerVaultTransaction(request: CustomerVaultInitiatedTransaction)` - Start vault transaction
- `deleteCustomer(request: DeleteCustomerRecord)` - Remove customer from vault
- `addBillingForCustomer(request: AddBillingForCustomerRequest)` - Add billing info
- `updateBillingForCustomer(request: UpdateBillingForCustomerRequest)` - Update billing
- `deleteBillingForCustomer(request: DeleteBillingForCustomerRequest)` - Remove billing

### Transactions API

Process various types of payment transactions.

```typescript
// Process a Sale
const saleData = {
  type: "sale",
  amount: "49.99",
  ccnumber: "4111111111111111",
  ccexp: "1225",
};
await znmi.transactions.createTransaction(saleData);

// Capture an Authorization
const captureData = {
  type: "capture",
  transactionid: "1234567",
};
await znmi.transactions.captureTransaction(captureData);
```

Available Methods:

- `createTransaction(request: TransactionRequest)` - Process new transaction
- `captureTransaction(request: CaptureTransactionRequest)` - Capture authorized transaction
- `refundTransaction(request: RefundTransaction)` - Process refund
- `voidTransaction(request: VoidTransactionRequest)` - Void transaction
- `updateTransaction(request: UpdateTransactionRequest)` - Update transaction details

### Product Management API

Manage your product catalog.

```typescript
// Add a Product
const productData = {
  product_sku: "PROD-001",
  product_description: "Premium Widget",
  product_cost: "29.99",
  product_currency: "USD",
};
await znmi.products.addProduct(productData);

// Update a Product
const updateData = {
  product_sku: "PROD-001",
  product_description: "Premium Widget V2",
};
await znmi.products.updateProduct(updateData);
```

Available Methods:

- `addProduct(request: AddProductRequest)` - Add new product
- `updateProduct(request: UpdateProductRequest)` - Update product details
- `deleteProduct(request: DeleteProductRequest)` - Remove product

### Invoice Management API

Create and manage invoices.

```typescript
// Create an Invoice
const invoiceData = {
  amount: 99.99,
  email: "customer@example.com",
  payment_terms: "upon_receipt",
};
await znmi.invoices.createInvoice(invoiceData);

// Send an Invoice
const sendData = {
  invoice_id: "INV-001",
  email: "customer@example.com",
};
await znmi.invoices.sendInvoice(sendData);
```

Available Methods:

- `createInvoice(request: CreateInvoiceRequest)` - Generate new invoice
- `updateInvoice(request: UpdateInvoiceRequest)` - Modify existing invoice
- `sendInvoice(request: SendInvoiceRequest)` - Send invoice to customer
- `closeInvoice(request: CloseInvoiceRequest)` - Close existing invoice

### Recurring Payments API

Set up and manage recurring payment plans.

```typescript
// Create a Recurring Plan
const planData = {
  plan_payments: 12,
  plan_amount: 29.99,
  plan_name: "Premium Monthly",
  plan_id: "PLAN-001",
  month_frequency: 1,
};
await znmi.recurring.createRecurringPlan(planData);

// Add Custom Subscription
const subscriptionData = {
  plan_id: "PLAN-001",
  ccnumber: "4111111111111111",
  ccexp: "1225",
};
await znmi.recurring.addCustomSubscription(subscriptionData);
```

Available Methods:

- `createRecurringPlan(request: AddRecurringPlan)` - Create new plan
- `editRecurringPlan(request: EditRecurringPlan)` - Modify existing plan
- `addSubscriptionToExistingPlan(request: AddSubscriptionToExistingPlan)` - Add subscription to plan
- `addCustomSubscription(request: AddCustomSubscription)` - Create custom subscription
- `updateSubscription(request: UpdateSubscription)` - Update subscription
- `deleteSubscription(request: DeleteSubscriptionRequest)` - Cancel subscription

## Response Types

All API responses are fully typed and validated using Zod schemas:

```typescript
type TransactionResponse = {
  response: "1" | "2" | "3"; // 1=success, 2=declined, 3=error
  responsetext: string;
  authcode: string;
  transactionid?: string;
  avsresponse: string;
  cvvresponse: string;
  orderid: string;
  type:
    | "sale"
    | "auth"
    | "validate"
    | "credit"
    | "offline"
    | "refund"
    | "void"
    | "capture";
  response_code: string;
};
```

## Error Handling

The wrapper includes comprehensive error handling:

```typescript
try {
  const response = await znmi.transactions.createTransaction(transactionData);
  if (response.response === "1") {
    // Success
    console.log("Transaction ID:", response.transactionid);
  } else {
    // Declined or Error
    console.error("Error:", response.responsetext);
  }
} catch (error) {
  console.error("API Error:", error);
}
```

## Type Safety

All requests and responses are fully typed using Zod schemas. Import types directly:

```typescript
import {
  AddUpdateCustomerRequest,
  TransactionRequest,
  CustomerVaultResponse,
} from "znmi";
```

## Testing

Run the test suite:

```bash
pnpm test
```

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

- 0.2.2: Fix the test running
- 0.2.1: Fix types
- 0.2.0: Initial changelog
