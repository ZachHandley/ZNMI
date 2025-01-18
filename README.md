# ZNMI TypeScript Wrapper

A comprehensive TypeScript wrapper for NMI (Network Merchants, Inc.) payment gateway API. This wrapper provides type-safe interactions with NMI's services including customer vault management, transaction processing, product management, invoicing, and recurring payments.

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

## 0.2.0 Update

My bad for leaving it for so long pointing to the wrong file, I have fixed it and updated the `README` <3

- Zach

**Please Note: NMI's Payment API & Query API Docs SUCK. I am doing my best to keep things up to date as I find them, if you find any out of date typedefs or invalid requests, please file a report!**

## Type Safety

All requests and responses are fully typed using Zod schemas. The library provides comprehensive type definitions for:

- Request Categories (Transaction, CustomerVault, Recurring, etc.)
- Action Types per Category
- Request Data Schemas
- Response Types

Import types directly:

```typescript
import type {
  // Request Types
  RequestInfo,
  RequestCategory,
  TransactionRequestActions,
  CustomerVaultRequestActions,
  RecurringRequestActions,
  InvoiceRequestActions,
  ProductManagerRequestActions,
  QueryRequestActions,

  // Response Types
  TransactionResponse,
  CustomerVaultResponse,
  RecurringResponse,
  QueryResponse,
  FlatQueryResponse,
} from "znmi";
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

- `addOrUpdateCustomer(request: AddUpdateCustomerRequest)` - Add or update customer
- `validateCustomerVaultId(request: ValidateCustomerVaultIdRequest)` - Validate stored customer
- `authorizeCustomerByVaultId(request: AuthorizeCustomerByVaultIdRequest)` - Authorize payment
- `saleByVaultId(request: SaleByVaultIdRequest)` - Process sale
- `creditTransactionByVaultId(request: CreditTransactionByVaultIdRequest)` - Process credit
- `offlineTransactionByVaultId(request: OfflineTransactionByVaultIdRequest)` - Process offline
- `initiateCustomerVaultTransaction(request: CustomerVaultInitiatedTransaction)` - Start transaction
- `deleteCustomer(request: DeleteCustomerRecord)` - Remove customer
- `addBillingForCustomer(request: AddBillingForCustomerRequest)` - Add billing
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

// Add Subscription to Existing Plan
const subscriptionData = {
  plan_id: "PLAN-001",
  ccnumber: "4111111111111111",
  ccexp: "1225",
};
await znmi.recurring.addSubscriptionToExistingPlan(subscriptionData);
```

Available Methods:

- `createRecurringPlan(request: AddRecurringPlan)` - Create new plan
- `editRecurringPlan(request: EditRecurringPlan)` - Modify existing plan
- `addSubscriptionToExistingPlan(request: AddSubscriptionToExistingPlan)` - Add to plan
- `addCustomSubscription(request: AddCustomSubscription)` - Create custom subscription
- `updateSubscription(request: UpdateSubscription)` - Update subscription
- `deleteSubscription(request: DeleteSubscriptionRequest)` - Cancel subscription

### Query API

Query transaction data and account information.

```typescript
// Query a Transaction
const transactionId = "1234567890";
const response = await znmi.query.queryTransaction(transactionId);

// Query Transactions by Date Range with Pagination
const dateResponse = await znmi.query.queryTransactionsWithPagination(
  1, // page number
  100, // results per page
  "asc", // order
  {
    start_date: "2024-01-01",
    end_date: "2024-01-31",
  }
);
```

Available Methods:

- `queryTransaction(transactionId: string)` - Query single transaction
- `queryReceipt(transactionId: string)` - Get transaction receipt
- `queryProfile(includeProcessorDetails?: boolean)` - Query account profile
- `queryTransactionsByDate(startDate: string, endDate: string, options?: QueryRequestWithoutKey)` - Query by date
- `queryCustomerVault(customerVaultId?: string, dateRange?: DateRange, options?: QueryRequestWithoutKey)` - Query vault
- `queryRecurring(subscriptionId?: string, options?: QueryRequestWithoutKey)` - Query recurring
- `queryRecurringPlans(options?: QueryRequestWithoutKey)` - Query plans
- `queryInvoices(invoiceId?: string, status?: string[], options?: QueryRequestWithoutKey)` - Query invoices
- `queryTransactionsBySource(sources: QueryTransactionSourceEnum[], options?: QueryRequestWithoutKey)` - By source
- `queryTransactionsByCondition(conditions: QueryTransactionConditionEnum[], options?: QueryRequestWithoutKey)` - By condition
- `queryTransactionsByActionType(actionTypes: QueryTransactionActionTypeEnum[], options?: QueryRequestWithoutKey)` - By action
- `queryTransactionsByCard(cardNumber: string, options?: QueryRequestWithoutKey)` - By card
- `queryTransactionsWithPagination(pageNumber: number, resultLimit: number, resultOrder: QueryResultOrderEnum, options?: QueryRequestWithoutKey)` - Paginated
- `queryGatewayProcessors(options?: QueryRequestWithoutKey)` - Query processors
- `queryAccountUpdater(options?: QueryRequestWithoutKey)` - Query updater status
- `queryTestModeStatus(options?: QueryRequestWithoutKey)` - Query test mode

## Error Handling

The wrapper includes comprehensive error handling for both query string and XML responses:

```typescript
try {
  // Query string response
  const response = await znmi.transactions.createTransaction(transactionData);
  if (response.response === "1") {
    console.log("Transaction ID:", response.transactionid);
  } else {
    console.error("Error:", response.responsetext);
  }

  // XML response
  const queryResponse = await znmi.query.queryTransaction("1234567");
  if (queryResponse.status === 200 && queryResponse.data) {
    console.log("Transaction data:", queryResponse.data);
  } else {
    console.error("Query error:", queryResponse.message);
  }
} catch (error) {
  console.error("API Error:", error);
}
```

## Testing

Testing will work for all but the Query API with the default key

To test using your NMI_SECURITY_KEY please set the env variable `export ZNMI_SECURITY_KEY=your-security-key`

Run the test suite:

```bash
pnpm test
```

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

- 0.2.41: Fix Query Recurring types
- 0.2.40: Tested and revamped the `Query` API to make sure it works, additionally, I updated the main query endpoints to just take an object parameter. I initially made them that way so you could just pass the required info, but I realize that at this point it's probably just annoying.
- 0.2.37: Fix typedefs of `Query` API (some)
- 0.2.36: Fixed export of `saleByVaultId`
- 0.2.35: Fixed `package.json` and `tsup.config.ts` to hopefully build it properly so we can reference it
- 0.2.34: Change `updateSubscription` so it doesn't _need_ an `amount` (for example for pausing)
- 0.2.33: Add `addSubscriptionToExistingPlan`
- 0.2.32: Add `FlatQueryResponse` type, cause I like having logging in my database and I can't transform a union into a singular collection
- 0.2.31: Add `QueryResponse` type, which is just a union of the others, but makes my life (and maybe yours) easier
- 0.2.3: Add `Query` API, which I didn't know existed
- 0.2.2: Fix the test running
- 0.2.1: Fix types
- 0.2.0: Initial changelog
