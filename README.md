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

### NMI Guide for Integrations

Request ...type=sale&billing_method=recurring&initiated_by=customer&stored_credential_indicator=stored...
Response ...response=1&responsetext=Approved&transactionid=1234567890...
The transaction ID would be stored and submitted on follow up transactions. The follow up transaction(s) would
include:
billing_method=recurring
initiated_by=merchant
stored_credential_indicator=used
initial_transaction_id=XXXXXXXXXX
Example 2: In this request, the subsequent merchant initiated sale is processed using the stored transaction
from Example 1.
Request ...type=sale&billing_method=recurring&initiated_by=merchant&stored_credential_indicator=used&initial_transac
Response ...response=1&responsetext=Approved&transactionid=1234567891...
Please Note: This transaction ID cannot be used for "unscheduled" or "installment" credential-on-file
transactions.
Installment:
An “installment” transaction is a series of transactions that uses a stored credential and represents cardholder
agreement with the merchant to initiate one or more future transactions over a period of time for a single
purchase of goods or services.
Installment transactions work just like Recurring in that you need a customer initiated transaction for a
subsequent installment transaction. The difference is the billing_method will be “installment”.
The customer initiated transaction MUST INCLUDE at least three items (* recommended to send, if available):
billing_method=installment
initiated_by=customer
stored_credential_indicator=stored
* billing_total
* billing_number (Values: 0-99)
Examples
Example 3: In this request, an initial installment sale is sent and an approved transaction is returned in the
response. Store this transaction for the follow up request.
Request ...type=sale&billing_method=installment&initiated_by=customer&stored_credential_indicator=stored&billing_tota
=25.00...
Response ...response=1&responsetext=Approved&transactionid=1234567890…
The transaction ID would be stored and submitted on follow up transactions. The follow up transaction(s) would
include (* recommended to send, if available):
billing_method=installment
initiated_by=merchant
stored_credential_indicator=used
initial_transaction_id=XXXXXXXXXX
* billing_total
* billing_number
Example 4: In this request, the subsequent merchant initiated sale is processed using the stored transaction
from Example 3.
Request ...type=sale&billing_method=installment&initiated_by=merchant&stored_credential_indicator=used&initial_trans
100.00&billing_number=1&amount=25.00...
Response ...response=1&responsetext=Approved&transactionid=1234567891…
Please Note: This transaction ID cannot be used for "unscheduled" or "recurring" card on file transactions.
Unscheduled Credential On File:
For payments that aren’t recurring or installment - there are unscheduled options as well.
The first customer initiated transaction will include these two items (no billing method):
initiated_by=customer
stored_credential_indicator=stored
Examples
Example 5: In this request, an initial unscheduled sale is sent and an approved transaction is returned in the
response. Store this transaction for the follow up request.
Request ...type=sale&initiated_by=customer&stored_credential_indicator=stored...
Response ...response=1&responsetext=Approved&transactionid=1234567890...
The transaction ID can be used, without a billing method, for a customer initiated or merchant initiated
transaction.
Please Note: The transaction ID cannot be used for a “recurring” or “installment” transaction.
Unscheduled, Customer Initiated: A card-absent transaction initiated by the cardholder where the cardholder
does not need to enter their card details as the merchant uses the payment credential previously stored by the
cardholder to perform the transaction. Examples include a transaction using customer’s merchant profile or
digital wallet.
This is your typical shopping cart scenario where the customer checks out without having to re-enter their card
details.
The follow up transaction(s) would include:
initiated_by=customer
stored_credential_indicator=used
Example 6: In this request, a subsequent unscheduled sale is sent and an approved transaction is returned in
the response.
Request ...type=sale&initiated_by=customer&stored_credential_indicator=used...
Response ...response=1&responsetext=Approved&transactionid=1234567891...
Unscheduled, Merchant Initiated: A transaction using a stored credential for a fixed or variable amount that
does not occur on a scheduled or regularly occurring transaction date, where the cardholder has provided
consent for the merchant to initiate one or more future transactions. An example of this transaction is an
account auto-top up transaction.
An example of an account auto-top up would be a customer with an account with a balance. When that balance
gets low, the customer's card is charged automatically, without the customer's involvement.
The follow up transaction(s) would include:
initiated_by=merchant
stored_credential_indicator=used
initial_transaction_id=XXXXXXXXXX
Example 7: In this request, a subsequent unscheduled sale is sent and an approved transaction is returned in
the response.
Request ...type=sale&initiated_by=merchant&stored_credential_indicator=used&initial_transaction_id=1234567890...
Response ...response=1&responsetext=Approved&transactionid=1234567892...
Appendix 1: Recommend Further Reading:
If there is any question where a transaction type falls, we recommend reviewing the official card brand
documentation. Visa’s guidelines are the most stringent, and generally if you follow those guidelines, you’ll also
be compliant for MasterCard, American Express and Discover.
Visa:
https://usa.visa.com/dam/VCOM/global/support-legal/documents/stored-credential-transaction-framework-vbs-
10-may-17.pdf
MasterCard:
https://www.mastercard.us/content/dam/public/mastercardcom/na/us/en/banks-and-credit-
unions/other/credential-on-file-the-digital-commerce-growth-engine.pdf
Transaction Response Variables
Payment API
Standard Response
Variable Name Description
response
1 = Transaction Approved
2 = Transaction Declined
3 = Error in transaction data or system error
responsetext Textual response
authcode Transaction authorization code.
transactionid Payment gateway transaction id.
avsresponse AVS response code (See AVS Response Codes).
cvvresponse CVV response code (See See CVV Response Codes).
orderid The original order id passed in the transaction request.
response_code Numeric mapping of processor responses (See See Result Code Table).
emv_auth_response_data
This will optionally come back when any chip card data is provided on the
authorization. This data needs to be sent back to the SDK after an
authorization.
Conditional Response
Variable Name Description
customer_vault_id
The original customer_vault_id passed in the transaction request or the
resulting customer_vault_id created on an approved transaction.
Note: Only returned when the "Customer Vault" service is active.
kount_score
The Kount "Omniscore" indicating the level of risk on a given transaction.
The higher the score, the lower the risk.
Note: Only returned when the "Kount" service is active.
merchant_advice_code
Mastercard’s Merchant Advice Code (MAC) is returned in response if one
is provided by the processor.
Note: Only returned if API configuration is set to return this value.
Testing Information
Payment API
Transaction Testing Methods
Method 1: Put your account in test mode
Transactions can be submitted to any merchant account that is in test mode. Keep in mind that if an account is
in test mode, all valid credit cards will be approved but no charges will actually be processed and nothing
will be sent to the credit card or ACH processor.
Method 2: Send in a one-off test transaction
One-off test transactions can be processed using the below test_mode variable. This will process this
singular transaction in test mode, but it will not impact anything else on the account. An example use case
would be running test transactions in a developent environment while your website is actively processing real
transactions from customers.
test_mode:
If set to "enabled" and providing one of the test credit card numbers listed below with "1025" as
the expiration date, the single transaction will process in test mode. To see this transaction in
reporting, you will need to toggle your account to test mode, but the Payment API testing can
be done without doing this.
Method 3: Dedicated test account
The Payment Gateway Demo Account can be used for testing at any time. Please use the below security key
for testing with this account. This account is always available and allows testing in a completely sandboxed
environment. Like all testing methods, no card or check data will ever be sent for actual processing.
security_key: 6457Thfj624V5r7WUwc5v6a68Zsd6YEm
Transaction POST URL
Transaction details should be POST'ed to the following URL:
POST URL: https://secure.nmi.com/api/transact.php
Test Data
Transactions can be submitted using the following information:
Visa: 4111111111111111
MasterCard: 5431111111111111
Discover: 6011000991300009
American Express: 341111111111111
Diner's Club: 30205252489926
JCB: 3541963594572595
Maestro: 6799990100000000019
Credit Card Expiration: 10/25
account (ACH): 24413815
routing (ACH): 490000018
Triggering Errors in Test Mode
To cause a declined message, pass an amount less than 1.00.
To trigger a fatal error message, pass an invalid card number.
To simulate an AVS match, pass 888 in the address1 field, 77777 for zip.
To simulate a CVV match, pass 999 in the cvv field.
AVS Response Codes
Payment API
AVS Response Codes
X Exact match, 9-character numeric ZIP
Y Exact match, 5-character numeric ZIP
D Exact match, 5-character numeric ZIP
M Exact match, 5-character numeric ZIP
2 Exact match, 5-character numeric ZIP, customer name
6 Exact match, 5-character numeric ZIP, customer name
A Address match only
B Address match only
3 Address, customer name match only
7 Address, customer name match only
W 9-character numeric ZIP match only
Z 5-character ZIP match only
P 5-character ZIP match only
L 5-character ZIP match only
1 5-character ZIP, customer name match only
5 5-character ZIP, customer name match only
N No address or ZIP match only
C No address or ZIP match only
4 No address or ZIP or customer name match only
8 No address or ZIP or customer name match only
U Address unavailable
G Non-U.S. issuer does not participate
I Non-U.S. issuer does not participate
R Issuer system unavailable
E Not a mail/phone order
S Service not supported
0 AVS not available
O AVS not available
B AVS not available
CVV Response Codes
Payment API
CVV Response Codes
M CVV2/CVC2 match
N CVV2/CVC2 no match
P Not processed
S Merchant has indicated that CVV2/CVC2 is not present on card
U Issuer is not certified and/or has not provided Visa encryption keys
Result Code Table
Payment API
Result Code Table
100 Transaction was approved.
200 Transaction was declined by processor.
201 Do not honor.
202 Insufficient funds.
203 Over limit.
204 Transaction not allowed.
220 Incorrect payment information.
221 No such card issuer.
222 No card number on file with issuer.
223 Expired card.
224 Invalid expiration date.
225 Invalid card security code.
226 Invalid PIN.
240 Call issuer for further information.
250 Pick up card.
251 Lost card.
252 Stolen card.
253 Fraudulent card.
260 Declined with further instructions available. (See response text)
261 Declined-Stop all recurring payments.
262 Declined-Stop this recurring program.
263 Declined-Update cardholder data available.
264 Declined-Retry in a few days.
300 Transaction was rejected by gateway.
400 Transaction error returned by processor.
410 Invalid merchant configuration.
411 Merchant account is inactive.
420 Communication error.
421 Communication error with issuer.
430 Duplicate transaction at processor.
440 Processor format error.
441 Invalid transaction information.
460 Processor feature not available.
461 Unsupported card type.
Rate Limits
Payment API
Rate Limits
In order to ensure the platform is available for everyone, in very rare cases, some users may encounter rate
limits. If your request rate exceeds the limit, you may receive one of two responses: the Payment API-specific
Rate Limit response, or the System-Wide Rate Limit response.
Payment API-Specific Rate Limit
If you exceed the Payment API rate limit, you will receive a response with the following fields:
response 3
responsetext Rate limit exceeded
response_code 301
Example
Response response=3&responsetext=Rate limit
exceeded&authcode=&transactionid=&avsresponse=&cvvresponse=&orderid=&type=&response_code=301
System-Wide Rate Limit
You may encounter the system-wide rate limit if you using other services, for example if you are making
requests to both the Payment API and the Query API, or if there are too many concurrent connections from
your IP. In this case, your request will receive HTTP 429: Too Many Requests
Handling Rate Limit Responses
Wait before retrying
If you receive a response_code of 301 or an HTTP 429 response, do not immediately retry the request.
Immediately retrying may increase the delay before transactions are allowed again.