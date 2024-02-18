# ZNMI TypeScript Wrapper

The ZNMI TypeScript Wrapper is a comprehensive library designed to facilitate interactions with the NMI (Network Merchants, Inc.) API in a type-safe and structured manner. This wrapper simplifies the integration of NMI's payment gateway services into TypeScript applications by providing easy-to-use functionalities for managing customer vaults, transactions, products, invoices, and recurring payments.

## Features

- **Customer Vault**: Securely manage customer data by easily adding, updating, or deleting customer information in the NMI Customer Vault.
- **Transactions**: Process a wide range of transactions including sales, authorizations, credits, validations, and offline transactions, with detailed responses.
- **Product Manager**: Dynamically manage products by adding or deleting them in the NMI Product Manager.
- **Invoices**: Seamlessly integrate billing and payment processing by creating and managing invoices.
- **Recurring Payments**: Support various billing cycles and payment methods by adding and managing recurring payment plans.

## Installation

To integrate the ZNMI wrapper into your TypeScript project, follow these steps:

1. Install the package via npm or yarn:

   ```bash
   npm install znmi
   # or
   yarn add znmi
   ```

2. Import the package into your project:

   ```typescript
   import { ZNMI } from 'znmi';
   ```

3. Instantiate the ZNMI class with your security key:

   ```typescript
   const znmi = new ZNMI('your_security_key_here');
   ```

## Usage Examples

Below are some examples demonstrating how to use the ZNMI wrapper to interact with various components of the NMI API.

### Adding a Customer

```typescript
const addCustomerRequest = {
  ccnumber: "4111111111111111",
  ccexp: "1234",
};
const response = await znmi.customerVault.addCustomer(addCustomerRequest);
console.log(response.data);
```

### Processing a Transaction

```typescript
const validateTransactionRequest = {
  ccnumber: "4111111111111111",
  ccexp: "1025",
  cvv: "123",
};
const response = await znmi.transactions.validateTransaction(validateTransactionRequest);
console.log(response.data);
```

### Adding a Product

```typescript
let productSku = `sku${Math.floor(Math.random() * 10000)}`;
const addProductRequest = {
  product_sku: productSku,
  product_description: "Test Product",
  product_cost: "19.99",
  product_currency: "USD",
};
const response = await znmi.products.addProduct(addProductRequest);
console.log(response.data);
```

### Creating an Invoice

```typescript
const createInvoiceRequest = {
  amount: 1.0,
  email: "test@example.com",
};
const response = await znmi.invoices.createInvoice(createInvoiceRequest);
console.log(response.data);
```

### Adding a Recurring Payment Plan

```typescript
const subscriptionId = `sub${Math.floor(Math.random() * 10000)}`;
const addRecurringPlanRequest = {
  plan_name: "Monthly Subscription",
  plan_amount: 9.99,
  day_frequency: 31,
  plan_id: subscriptionId,
};
const response = await znmi.recurring.addRecurringPlan(addRecurringPlanRequest);
console.log(response.data);
```

## Running Tests

To ensure the functionality of the ZNMI wrapper, a suite of tests is provided. These tests cover the instantiation of the ZNMI class, the creation of various objects (CustomerVault, Transactions, Products, Invoices, Recurring), and the execution of key operations such as adding and updating customers, processing transactions, managing products, creating invoices, and handling recurring payments.
To run the tests, execute the following command in your terminal:
`vitest run`
This command will run all tests defined in the `znmi.test.ts` file, which also has the testing security key in it for NMI, verifying the correct behavior of the ZNMI wrapper's functionalities.

## Further Reading

For more detailed information on transaction types, response variables, and testing methods, please refer to the official card brand documentation and the NMI API documentation. These resources provide comprehensive guidelines and best practices for integrating payment gateway services into your applications.

### Changelog

0.1.3 - Added return types to all functions
0.1.2 - Added additional methods I forgot to customerVault, added more tests for data to use in my integration package
0.1.1 - Fixed Vite dependency instead of dev dependency
