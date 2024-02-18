import { describe, it, expect } from "vitest";
import { CustomerVault } from "../src/functions/customerVault.ts";
import { Transactions } from "../src/functions/transactions.ts";
import { Products } from "../src/functions/products.ts";
import { Invoices } from "../src/functions/invoices";
import { Recurring } from "../src/functions/recurring";

import { ZNMI } from "../src/index.ts";
const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
const znmi = new ZNMI(securityKey);

describe("ZNMI", () => {
  // ZNMI can be instantiated with a security key
  it("should instantiate ZNMI with a security key", () => {
    // Assert
    expect(znmi._securityKey).toBe(securityKey);
  });

  // CustomerVault, Transactions, ProductManager, Invoices, and Recurring objects can be created from ZNMI
  it("should create CustomerVault, Transactions, ProductManager, Invoices, and Recurring objects from ZNMI", () => {
    // Act
    const customerVault = znmi.customerVault;
    const transactions = znmi.transactions;
    const productManager = znmi.products;
    const invoices = znmi.invoices;
    const recurring = znmi.recurring;

    // Assert
    expect(customerVault).toBeInstanceOf(CustomerVault);
    expect(transactions).toBeInstanceOf(Transactions);
    expect(productManager).toBeInstanceOf(Products);
    expect(invoices).toBeInstanceOf(Invoices);
    expect(recurring).toBeInstanceOf(Recurring);
  });

  // CustomerVault object can add or update a customer record
  // Add Customer
  it("should add a customer using CustomerVault object", async () => {
    const addCustomerRequest = {
      ccnumber: "4111111111111111",
      ccexp: "1234",
    };
    const response = await znmi.customerVault.addCustomer(addCustomerRequest);
    expect(response.data).toBeDefined();
    expect(response.data.response).toBe("1");
  });

  // Update Customer
  it("should update a customer using CustomerVault object", async () => {
    const updateCustomerRequest = {
      customer_vault_id: "123456789",
      ccnumber: "4111111111111111",
      ccexp: "1234",
    };
    const response = await znmi.customerVault.updateCustomer(
      updateCustomerRequest
    );
    expect(response.data).toBeDefined();
    expect(response.data.response).toBe("1");
  });

  // Add Billing to Customer
  it("should add billing to a customer using CustomerVault object", async () => {
    const addBillingRequest = {
      customer_vault_id: "123456789",
      billing_id: "BillingId1",
      ccnumber: "4111111111111111",
      ccexp: "1234",
    };
    const response = await znmi.customerVault.addBillingToCustomer(
      addBillingRequest
    );
    expect(response.data).toBeDefined();
    expect(response.data.response).toBe("1");
  });

  // Update Billing for Customer
  it("should update billing for a customer using CustomerVault object", async () => {
    const updateBillingRequest = {
      billing_id: "BillingId1",
      customer_vault_id: "123456789",
      ccnumber: "4111111111111111",
      ccexp: "1234",
    };
    const response = await znmi.customerVault.updateBillingForCustomer(
      updateBillingRequest
    );
    expect(response.data).toBeDefined();
    expect(response.data.response).toBe("1");
  });

  it("should delete a customer's billing using CustomerVault object", async () => {
    const deleteBillingRequest = {
      billing_id: "BillingId1",
      customer_vault_id: "123456789",
    };
    const response = await znmi.customerVault.deleteBillingForCustomer(
      deleteBillingRequest
    );
    expect(response.data).toBeDefined();
    expect(response.data.response).toBe("1");
  });

  // Validate Transaction
  it("should validate a transaction using Transactions object", async () => {
    const validateTransactionRequest = {
      ccnumber: "4111111111111111",
      ccexp: "1025",
      cvv: "123",
    };
    const response = await znmi.transactions.validateTransaction(
      validateTransactionRequest
    );
    expect(response.data).toBeDefined();
    expect(response.data?.response).toBe("1");
  });

  let transactionId: string;

  it("should authorize a transaction using Transactions object", async () => {
    const authorizeTransactionRequest = {
      ccnumber: "4111111111111111",
      ccexp: "1025",
      cvv: "123",
      amount: 10,
    };
    const response = await znmi.transactions.authorizeTransaction(
      authorizeTransactionRequest
    );
    transactionId = response.data?.transactionid ?? "";
    expect(response.data).toBeDefined();
    expect(response.data?.response).toBe("1");
  });

  // Capture Transaction
  it("should capture a transaction using Transactions object", async () => {
    const captureTransactionRequest = {
      transactionid: transactionId,
      amount: 10,
    };
    const response = await znmi.transactions.captureTransaction(
      captureTransactionRequest
    );
    expect(response.data).toBeDefined();
    // Can't capture a transaction without a transaction id
    expect(response.data?.response).toBe("1");
  });

  // Refund Transaction
  it("should refund a transaction using Transactions object", async () => {
    const refundTransactionRequest = {
      transactionid: transactionId,
      amount: 10,
    };
    const response = await znmi.transactions.refundTransaction(
      refundTransactionRequest
    );
    expect(response.data).toBeDefined();
    // Can't refund a non-existent transaction
    expect(response.data?.response).toBe("1");
  });

  let productSku: string = `sku${Math.floor(Math.random() * 10000)}`;
  let productId: string;
  // Add Product
  it("should add a product using Products object", async () => {
    const addProductRequest = {
      product_sku: productSku,
      product_description: "Test Product",
      product_cost: "19.99",
      product_currency: "USD",
    };
    const response = await znmi.products.addProduct(addProductRequest);
    productId = response.data.product_id;
    expect(response.data).toBeDefined();
    expect(response.data.response).toBe("1");
  });

  it("should update a product using Products object", async () => {
    const updateProductRequest = {
      product_id: productId,
      product_sku: productSku,
      product_description: "Test Product",
      product_cost: "19.99",
      product_currency: "USD",
    };
    const response = await znmi.products.updateProduct(updateProductRequest);
    expect(response.data).toBeDefined();
    expect(response.data.response).toBe("1");
  });

  // Update Product
  it("should delete a product using Products object", async () => {
    const deleteProductRequest = {
      product_id: productId,
    };
    const response = await znmi.products.deleteProduct(deleteProductRequest);
    expect(response.data).toBeDefined();
    expect(response.data.response).toBe("1");
  });

  // Create Invoice
  it("should create an invoice using Invoices object", async () => {
    const createInvoiceRequest = {
      amount: 1.0,
      email: "test@example.com",
    };
    const response = await znmi.invoices.createInvoice(createInvoiceRequest);
    expect(response.data).toBeDefined();
    // expect(response.data.response).toBe("1"); because no invoicing setup on test account
    expect(response.data.response).toBe("3");
  });

  const subscriptionId = `sub${Math.floor(Math.random() * 10000)}`;
  // Add Recurring Plan
  it("should add a recurring plan using Recurring object", async () => {
    const addRecurringPlanRequest = {
      plan_name: "Monthly Subscription",
      plan_amount: 9.99,
      day_frequency: 31,
      plan_id: subscriptionId,
    };
    const response = await znmi.recurring.addRecurringPlan(
      addRecurringPlanRequest
    );
    expect(response.data).toBeDefined();
    expect(response.data?.response).toBe("1");
  });

  // Update Recurring Plan
  it("should update a recurring plan using Recurring object", async () => {
    const updateRecurringPlanRequest = {
      current_plan_id: subscriptionId,
      plan_name: "Monthly Subscription",
      plan_amount: 9.99,
      day_frequency: 31,
    };
    const response = await znmi.recurring.editRecurringPlan(
      updateRecurringPlanRequest
    );
    expect(response.data).toBeDefined();
    expect(response.data?.response).toBe("1");
  });

  // Delete Subscription
  it("should delete a subscription using Recurring object", async () => {
    const deleteSubscriptionRequest = {
      subscription_id: subscriptionId,
    };
    const response = await znmi.recurring.deleteSubscription(
      deleteSubscriptionRequest
    );
    expect(response.data).toBeDefined();
    expect(response.data?.response).toBe("3");
  });
});
