# NMI TypeScript Wrapper

This project is a TypeScript wrapper for the NMI (Network Merchants, Inc.) API. It aims to provide a structured and type-safe way to interact with NMI's payment gateway. The wrapper includes functionalities for managing customer vaults, transactions, products, invoices, and recurring payments, making it easier to integrate NMI's services into TypeScript applications.

## Features

- **Customer Vault**: Easily add, update, or delete customer information in the NMI Customer Vault to manage customer data securely.
- **Transactions**: Process various types of transactions including sales, authorizations, credits, validations, and offline transactions, with detailed responses.
- **Product Manager**: Add or delete products in the NMI Product Manager, allowing for dynamic product management.
- **Invoices**: Create and manage invoices, providing a seamless integration for billing and payment processing.
- **Recurring Payments**: Add and manage recurring payment plans, supporting a variety of billing cycles and payment methods.

## Installation

To use this wrapper, follow these steps:

1. Install the package via npm or yarn:

   ```bash
   npm install znmi
   # or
   yarn add znmi
   ```

2. Import the package into your project:

   ```typescript
   import { NMI } from 'znmi';
   ```

3. Create a new instance of the NMI class with your security key:

   ```typescript
   const nmi = new NMI('your_security_key_here');
   ```

By following these steps, you can start integrating NMI's payment gateway functionalities into your TypeScript projects efficiently.
