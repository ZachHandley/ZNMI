import { describe, it, expect, beforeAll } from "vitest";
import { CustomerVault } from "../src/functions/customerVault";
import { Transactions } from "../src/functions/transactions";
import { Products } from "../src/functions/products";
import { Invoices } from "../src/functions/invoices";
import { Recurring } from "../src/functions/recurring";
import { ZNMI } from "../src/index";

describe("ZNMI Core", () => {
  const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
  let znmi: ZNMI;

  beforeAll(() => {
    znmi = new ZNMI(securityKey);
  });

  it("should instantiate ZNMI with a security key", () => {
    expect(znmi._securityKey).toBe(securityKey);
  });

  it("should create API instances", () => {
    expect(znmi.customerVault).toBeInstanceOf(CustomerVault);
    expect(znmi.transactions).toBeInstanceOf(Transactions);
    expect(znmi.products).toBeInstanceOf(Products);
    expect(znmi.invoices).toBeInstanceOf(Invoices);
    expect(znmi.recurring).toBeInstanceOf(Recurring);
  });
});

describe("Customer Vault API", () => {
  const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
  let znmi: ZNMI;

  beforeAll(() => {
    znmi = new ZNMI(securityKey);
  });

  describe("Customer Management", () => {
    it("should add a customer", async () => {
      const addCustomerRequest = {
        ccnumber: "4111111111111111",
        ccexp: "1234",
      };
      const response = await znmi.customerVault.addCustomer(addCustomerRequest);
      console.log("Add Customer Response:", response);
      expect(response.data).toBeDefined();
      expect(response.data?.response).toBe("1");
    });

    it("should update a customer", async () => {
      const updateCustomerRequest = {
        customer_vault_id: "123456789",
        ccnumber: "4111111111111111",
        ccexp: "1234",
      };
      const response = await znmi.customerVault.updateCustomer(
        updateCustomerRequest
      );
      console.log("Update Customer Response:", response);
      expect(response.data?.response).toBe("1");
    });
  });

  describe("Billing Operations", () => {
    it("should add billing to a customer", async () => {
      const addBillingRequest = {
        customer_vault_id: "123456789",
        billing_id: "BillingId1",
        ccnumber: "4111111111111111",
        ccexp: "1234",
      };
      const response = await znmi.customerVault.addBillingToCustomer(
        addBillingRequest
      );
      console.log("Add Billing Response:", response);
      expect(response.data?.response).toBe("1");
    });

    it("should update billing for a customer", async () => {
      const updateBillingRequest = {
        billing_id: "BillingId1",
        customer_vault_id: "123456789",
        ccnumber: "4111111111111111",
        ccexp: "1234",
      };
      const response = await znmi.customerVault.updateBillingForCustomer(
        updateBillingRequest
      );
      console.log("Update Billing Response:", response);
      expect(response.data?.response).toBe("1");
    });

    it("should delete a customer's billing", async () => {
      const deleteBillingRequest = {
        billing_id: "BillingId1",
        customer_vault_id: "123456789",
      };
      const response = await znmi.customerVault.deleteBillingForCustomer(
        deleteBillingRequest
      );
      console.log("Delete Billing Response:", response);
      expect(response.data?.response).toBe("1");
    });
  });
});

describe("Transactions API", () => {
  const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
  let znmi: ZNMI;
  let transactionId: string;

  beforeAll(() => {
    znmi = new ZNMI(securityKey);
  });

  describe("Transaction Operations", () => {
    it("should validate a transaction", async () => {
      const validateTransactionRequest = {
        ccnumber: "4111111111111111",
        ccexp: "1025",
        cvv: "123",
      };
      const response = await znmi.transactions.validateTransaction(
        validateTransactionRequest
      );
      console.log("Validate Transaction Response:", response);
      expect(response.data?.response).toBe("1");
    });

    it("should authorize a transaction", async () => {
      const authorizeTransactionRequest = {
        ccnumber: "4111111111111111",
        ccexp: "1025",
        cvv: "123",
        amount: 10,
      };
      const response = await znmi.transactions.authorizeTransaction(
        authorizeTransactionRequest
      );
      console.log("Authorize Transaction Response:", response);
      transactionId = response.data?.transactionid ?? "";
      expect(response.data?.response).toBe("1");
    });

    it("should capture a transaction", async () => {
      const captureTransactionRequest = {
        transactionid: transactionId,
        amount: 10,
      };
      const response = await znmi.transactions.captureTransaction(
        captureTransactionRequest
      );
      console.log("Capture Transaction Response:", response);
      expect(response.data?.response).toBe("1");
    });

    it("should refund a transaction", async () => {
      const refundTransactionRequest = {
        transactionid: transactionId,
        amount: 10,
      };
      const response = await znmi.transactions.refundTransaction(
        refundTransactionRequest
      );
      console.log("Refund Transaction Response:", response);
      expect(response.data?.response).toBe("1");
    });
  });
});

describe("Products API", () => {
  const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
  let znmi: ZNMI;
  let productSku: string;
  let productId: string;

  beforeAll(() => {
    znmi = new ZNMI(securityKey);
    productSku = `sku${Math.floor(Math.random() * 10000)}`;
  });

  describe("Product Management", () => {
    it("should add a product", async () => {
      const addProductRequest = {
        product_sku: productSku,
        product_description: "Test Product",
        product_cost: "19.99",
        product_currency: "USD",
      };
      const response = await znmi.products.addProduct(addProductRequest);
      productId = response.data?.product_id ?? "";
      console.log("Add Product Response:", response);
      expect(response.data?.response).toBe("1");
    });

    it("should update a product", async () => {
      const updateProductRequest = {
        product_id: productId,
        product_sku: productSku,
        product_description: "Test Product Updated",
        product_cost: "29.99",
        product_currency: "USD",
      };
      const response = await znmi.products.updateProduct(updateProductRequest);
      console.log("Update Product Response:", response);
      expect(response.data?.response).toBe("1");
    });

    it("should delete a product", async () => {
      const deleteProductRequest = {
        product_id: productId,
      };
      const response = await znmi.products.deleteProduct(deleteProductRequest);
      console.log("Delete Product Response:", response);
      expect(response.data?.response).toBe("1");
    });
  });
});

describe("Invoices API", () => {
  const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
  let znmi: ZNMI;

  beforeAll(() => {
    znmi = new ZNMI(securityKey);
  });

  describe("Invoice Operations", () => {
    it("should create an invoice", async () => {
      const createInvoiceRequest = {
        amount: 1.0,
        email: "test@example.com",
      };
      const response = await znmi.invoices.createInvoice(createInvoiceRequest);
      console.log("Create Invoice Response:", response);
      expect(response.data?.response).toBe("3"); // because no invoicing setup on test account
    });
  });
});

describe("Recurring API", () => {
  const securityKey = "6457Thfj624V5r7WUwc5v6a68Zsd6YEm";
  let znmi: ZNMI;
  const subscriptionId = `sub${Math.floor(Math.random() * 10000)}`;

  beforeAll(() => {
    znmi = new ZNMI(securityKey);
  });

  describe("Recurring Payment Operations", () => {
    it("should add a recurring plan", async () => {
      const addRecurringPlanRequest = {
        plan_name: "Monthly Subscription",
        plan_amount: 9.99,
        day_frequency: 31,
        plan_id: subscriptionId,
        recurring: "add_plan",
        plan_payments: 1,
      };
      const response = await znmi.recurring.addRecurringPlan(
        addRecurringPlanRequest
      );
      console.log("Add Recurring Plan Response:", response);
      expect(response.data?.response).toBe("1");
    });

    it("should update a recurring plan", async () => {
      const updateRecurringPlanRequest = {
        current_plan_id: subscriptionId,
        plan_name: "Monthly Subscription Updated",
        plan_amount: 19.99,
        day_frequency: 31,
        recurring: "edit_plan",
      };
      const response = await znmi.recurring.editRecurringPlan(
        updateRecurringPlanRequest
      );
      console.log("Update Recurring Plan Response:", response);
      expect(response.data?.response).toBe("1");
    });

    it("should delete a subscription", async () => {
      const deleteSubscriptionRequest = {
        subscription_id: subscriptionId,
      };
      const response = await znmi.recurring.deleteSubscription(
        deleteSubscriptionRequest
      );
      console.log("Delete Subscription Response:", response);
      expect(response.data?.response).toBe("3");
    });
  });
});
