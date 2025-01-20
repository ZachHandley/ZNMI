import { describe, it, expect, beforeAll } from "vitest";
import { CustomerVault } from "../src/functions/customerVault";
import { Transactions } from "../src/functions/transactions";
import { Products } from "../src/functions/products";
import { Invoices } from "../src/functions/invoices";
import { Recurring } from "../src/functions/recurring";
import {
  CreateInvoiceRequest,
  DeleteProductRequest,
  QueryTransactionCondition,
  QueryTransactionRequest,
  QueryTransactionSource,
  ZNMI,
} from "../src/index";

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
  let customerVaultId: string;
  let znmi: ZNMI;

  beforeAll(() => {
    znmi = new ZNMI(securityKey);
  });

  describe("Customer Management", () => {
    it("should add a customer", async () => {
      const addCustomerRequest = {
        customer_vault: "add_customer" as const,
        currency: "USD",
        ccnumber: "4111111111111111",
        ccexp: "1234",
      };
      const response = await znmi.customerVault.addCustomer(addCustomerRequest);
      console.log("Add Customer Response:", response);
      expect(response.data).toBeDefined();
      expect(response.data?.response).toBe("1");
      customerVaultId = response.data?.customer_vault_id ?? "";
    });

    it("should update a customer", async () => {
      const updateCustomerRequest = {
        customer_vault: "update_customer" as const,
        currency: "USD",
        customer_vault_id: customerVaultId,
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
        customer_vault: "add_billing" as const,
        currency: "USD",
        customer_vault_id: customerVaultId,
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
        customer_vault: "update_billing" as const,
        currency: "USD",
        billing_id: "BillingId1",
        customer_vault_id: customerVaultId,
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
        customer_vault: "delete_billing" as const,
        billing_id: "BillingId1",
        customer_vault_id: customerVaultId,
      };
      const response = await znmi.customerVault.deleteBillingForCustomer(
        deleteBillingRequest
      );
      console.log("Delete Billing Response:", response);
      expect(response.data?.response).toBe("1");
    });

    it("should delete a customer", async () => {
      const deleteCustomerRequest = {
        customer_vault: "delete_customer" as const,
        customer_vault_id: customerVaultId,
      };
      const response = await znmi.customerVault.deleteCustomer(
        deleteCustomerRequest
      );
      console.log("Delete Customer Response:", response);
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
        type: "validate" as const,
        payment: "creditcard",
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
        type: "auth" as const,
        payment: "creditcard",
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
        type: "capture" as const,
        payment: "creditcard",
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
        type: "refund" as const,
        payment: "creditcard" as const,
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
        products: "add_product" as const,
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
        products: "update_product" as const,
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
      const deleteProductRequest: DeleteProductRequest = {
        products: "delete_product",
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
      const createInvoiceRequest: CreateInvoiceRequest = {
        amount: 1.0,
        email: "test@example.com",
        invoicing: "add_invoice",
        currency: "USD",
        payment_terms: "upon_receipt",
        payment_terms_allowed: ["cc", "ck", "cs"],
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
        recurring: "add_plan",
        plan_name: "Monthly Subscription",
        plan_amount: 9.99,
        day_frequency: 31,
        plan_id: subscriptionId,
        plan_payments: 1,
      };
      const response = await znmi.recurring.createRecurringPlan(
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

describe("Query API", () => {
  const securityKey = process.env.ZNMI_SECURITY_KEY;
  let znmi: ZNMI;

  if (!securityKey) {
    throw new Error(
      "ZNMI_SECURITY_KEY is not set in the environment variables"
    );
  }

  beforeAll(() => {
    znmi = new ZNMI(securityKey);
  });

  describe("Transaction Queries", () => {
    it("should query transactions by date", async () => {
      const startDate = "2024-01-01";
      const endDate = "2024-03-20";
      const response = await znmi.query.queryTransactionsByDate({
        start_date: startDate,
        end_date: endDate,
      });
      console.log("Query Transactions By Date Response:", response);
      expect(response.status).toBe(200);
    });

    it("should query transactions by condition", async () => {
      const conditions = [
        "complete",
        "pendingsettlement",
      ] as QueryTransactionCondition[];
      const response = await znmi.query.queryTransactionsByCondition({
        condition: conditions,
      });
      console.log("Query Transactions By Condition Response:", response);
      expect(response.status).toBe(200);
    });

    it("should query transactions by source", async () => {
      const sources = [
        "virtual_terminal",
        "recurring",
      ] as QueryTransactionSource[];
      const response = await znmi.query.queryTransactionsBySource({
        source: sources,
      });
      console.log("Query Transactions By Source Response:", response);
      expect(response.status).toBe(200);
    });

    it("should query transactions with pagination", async () => {
      const response = await znmi.query.queryTransactions({
        page_number: 1,
        result_limit: 10,
        result_order: "reverse",
      });
      console.log("Query Transactions With Pagination Response:", response);
      expect(response.status).toBe(200);
    });
  });

  describe("Customer Vault Queries", () => {
    it("should query customer vault", async () => {
      const response = await znmi.query.queryCustomerVault({
        report_type: "customer_vault",
      });
      console.log("Query Customer Vault Response:", response);
      expect(response.status).toBe(200);
    });
  });

  describe("Recurring Queries", () => {
    it("should query recurring plans", async () => {
      const response = await znmi.query.queryRecurringPlans({
        report_type: "recurring_plans",
      });
      console.log("Query Recurring Plans Response:", response);
      expect(response.status).toBe(200);
    });

    it("should query recurring subscriptions", async () => {
      const response = await znmi.query.queryRecurring({
        report_type: "recurring",
      });
      console.log("Query Recurring Subscriptions Response:", response);
      expect(response.status).toBe(200);
    });
  });

  describe("Invoice Queries", () => {
    it("should query invoices", async () => {
      const response = await znmi.query.queryInvoices({
        report_type: "invoicing",
      });
      console.log("Query Invoices Response:", response);
      expect(response.status).toBe(200);
    });
  });

  describe("Profile and System Queries", () => {
    it("should query merchant profile", async () => {
      const response = await znmi.query.queryProfile({
        report_type: "profile",
        include_processor_details: "1",
      });
      console.log("Query Profile Response:", response);
      expect(response.status).toBe(200);
    });

    it("should query gateway processors", async () => {
      const response = await znmi.query.queryGatewayProcessors({
        report_type: "gateway_processors",
      });
      console.log("Query Gateway Processors Response:", response);
      expect(response.status).toBe(200);
    });

    it("should query test mode status", async () => {
      const response = await znmi.query.queryTestModeStatus({
        report_type: "test_mode_status",
      });
      console.log("Query Test Mode Status Response:", response);
      expect(response.status).toBe(200);
    });
  });
});
