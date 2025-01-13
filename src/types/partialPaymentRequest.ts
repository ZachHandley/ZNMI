import { z } from "zod";

export const PARTIAL_PAYMENT_URL = "https://secure.nmi.com/api/transact.php";

export const PartialPaymentRequestSchema = z.object({
  partial_payment_id: z.string().optional()
    .describe(`Unique identifier returned when making the original transaction. This
        should only be used for secondary transactions.`),
  partial_payments: z.literal("settle_partial").or(z.literal("payment_in_full"))
    .describe(`This variable allows the following two values to be passed to it:
    settle_partial: Settles any amount of tender collected (captured partial
    auth's and approved partial sales) at cut off.
    payment_in_full: Required that any split tendered transaction is collected
    in-full before settlement gets initiated.`),
  type: z.literal("complete_partial_payment").optional()
    .describe(`This variable can be passed the value 'complete_partial_payment' which
    will complete a payment_in_full transaction that has not been collected in
    full. This allows industries that require payment_in_full but subsequently
    decide to still settle the transaction even though it has not been collected in
    full.`),
});

export type PartialPaymentRequest = z.infer<typeof PartialPaymentRequestSchema>;

export const PartialPaymentResponseSchema = z.object({
  partial_payment_id: z
    .string()
    .optional()
    .describe(
      `A numeric identifier which is used when submitting subsequent transactions.`
    ),
  partial_payment_balance: z
    .string()
    .optional()
    .describe(`Returns the payment's reamining balance.`),
  amount_authorized: z
    .string()
    .optional()
    .describe(`Returns the amount that was authorized.`),
});

export type PartialPaymentResponse = z.infer<
  typeof PartialPaymentResponseSchema
>;
