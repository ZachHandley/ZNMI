import { describe, it, expect } from "vitest";
import { CustomerVaultApi } from "../src/api/customerVaultApi.ts";
import { TransactionsApi } from "../src/api/transactionsApi.ts";
import { ProductManagerApi } from "../src/api/productManagerApi.ts";
import { InvoicesApi } from "../src/api/invoicesApi.ts";
import { RecurringApi } from "../src/api/recurringApi.ts";
import { ZNMI } from "../src/index.ts";

describe("ZNMI", () => {
  // ZNMI can be instantiated with a security key
  it("should instantiate ZNMI with a security key", () => {
    // Arrange
    const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";

    // Act
    const znmi = new ZNMI(securityKey);

    // Assert
    expect(znmi._securityKey).toBe(securityKey);
  });

  // CustomerVault, Transactions, ProductManager, Invoices, and Recurring objects can be created from ZNMI
  it("should create CustomerVault, Transactions, ProductManager, Invoices, and Recurring objects from ZNMI", () => {
    // Arrange
    const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
    const znmi = new ZNMI(securityKey);

    // Act
    const customerVault = znmi.customerVault;
    const transactions = znmi.transactions;
    const productManager = znmi.products;
    const invoices = znmi.invoices;
    const recurring = znmi.recurring;

    // Assert
    expect(customerVault).toBeInstanceOf(CustomerVaultApi);
    expect(transactions).toBeInstanceOf(TransactionsApi);
    expect(productManager).toBeInstanceOf(ProductManagerApi);
    expect(invoices).toBeInstanceOf(InvoicesApi);
    expect(recurring).toBeInstanceOf(RecurringApi);
  });

  // CustomerVault object can add or update a customer record
  it("should add or update a customer record using CustomerVault object", async () => {
    // Arrange
    const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
    const znmi = new ZNMI(securityKey);
    const addUpdateCustomerRequest = {
      customer_vault: "add_customer",
      ccnumber: "4111111111111111",
      ccexp: "10/25", // MMYY format
      cvv: "999",
    };

    // Act
    const response = await znmi.customerVault.addOrUpdateCustomer(
      addUpdateCustomerRequest
    );

    // Assert
    expect(response).toBeDefined(); // Example assertion
  });

  // ZNMI cannot be instantiated with an empty security key
  it("should throw an error when instantiating ZNMI with an empty security key", () => {
    // Arrange
    const securityKey = "";

    // Act & Assert
    expect(() => new ZNMI(securityKey)).toThrowError();
  });

  // CustomerVault object can delete a customer record
  it("should delete a customer record using CustomerVault object", async () => {
    // Arrange
    const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
    const znmi = new ZNMI(securityKey);
    const deleteCustomerRecord = {
      // Assuming deletion requires an ID or similar identifier
      customerId: "12345",
    };

    // Act
    const response = await znmi.customerVault.deleteCustomer(
      deleteCustomerRecord
    );

    // Assert
    expect(response).toBeDefined(); // Example assertion
  });

  // Transactions object can capture a transaction
  it("should capture a transaction using Transactions object", async () => {
    // Arrange
    const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
    const znmi = new ZNMI(securityKey);
    const captureTransactionRequest = {
      amount: 100.0,
      currency: "USD",
      payment: "creditcard",
      ccnumber: "4111111111111111",
      ccexp: "1025",
      cvv: "999",
    };

    // Act
    const response = await znmi.transactions.captureTransaction(
      captureTransactionRequest
    );

    // Assert
    expect(response).toBeDefined(); // Example assertion
  });

  // Transactions object can create a transaction
  it("should create a transaction when called", async () => {
    // Arrange
    const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
    const znmi = new ZNMI(securityKey);

    // Act
    const result = await znmi.createTransaction(
      100.0,
      "4111111111111111",
      "1025",
      "999"
    );

    // Assert
    expect(result).toBeDefined();
    expect(result.data?.response).toBe("1");
    expect(result.data?.responsetext).toBe("SUCCESS");
    expect(result.data).toBeDefined();
  });

  // ProductManager object can add a product
  it("should add a product when called", async () => {
    // Arrange
    const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
    const znmi = new ZNMI(securityKey);
    const addProductRequest = {
      // Assuming adding a product requires specific product details
      productName: "Example Product",
      price: 19.99,
    };

    // Act
    const result = await znmi.products.addProduct(addProductRequest);

    // Assert
    expect(result.status).toBe(200);
    expect(result.data).toBeDefined();
  });

  // Invoices object can create an invoice
  it("should create an invoice when called", async () => {
    // Arrange
    const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
    const znmi = new ZNMI(securityKey);
    const createInvoiceRequest = {
      // Assuming creating an invoice requires specific details like customer ID, amount, etc.
      customerId: "12345",
      amount: 100.0,
      dueDate: "2023-12-31",
    };

    // Act
    const result = await znmi.invoices.createInvoice(createInvoiceRequest);

    // Assert
    expect(result).toBeDefined();
    expect(result.status).toBe(200);
    expect(result.data).toBeDefined();
  });

  // The test is checking if the Recurring object can create a recurring plan
  it("should create a recurring plan when called", async () => {
    // Arrange
    const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
    const znmi = new ZNMI(securityKey);
    const recurringPlanRequest = {
      // Assuming creating a recurring plan requires specific details like plan name, amount, frequency, etc.
      planName: "Monthly Subscription",
      amount: 9.99,
      frequency: "monthly",
    };

    // Act
    const result = await znmi.recurring.createRecurringPlan(
      recurringPlanRequest
    );

    // Assert
    expect(result).toBeDefined();
    expect(result.status).toBe(200);
    expect(result.data).toBeDefined();
  });

  // Transactions object can refund a transaction
  it("should refund a transaction when called", async () => {
    // Arrange
    const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
    const znmi = new ZNMI(securityKey);
    const refundTransactionRequest = {
      transactionId: "987654321", // Example transaction ID
      amount: 50.0, // Partial refund example
    };

    // Act
    const result = await znmi.transactions.refundTransaction(
      refundTransactionRequest
    );

    // Assert
    expect(result).toBeDefined();
    expect(result.status).toBe(200); // Assuming 200 is success
    expect(result.data).toBeDefined();
  });
});
