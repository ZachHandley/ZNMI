import { z } from "zod";

export const PRODUCT_MANAGER_URL = "https://secure.nmi.com/api/transact.php";

export const AddProductRequestSchema = z.object({
  products: z
    .literal("add_product")
    .describe("Add a product to the product manager"),
  product_sku: z.string().optional().describe("The product SKU"),
  product_description: z
    .string()
    .optional()
    .describe("The product description"),
  product_cost: z.string().optional().describe("The product cost"),
  product_currency: z
    .string()
    .default("USD")
    .optional()
    .describe("The product currency"),
  product_commodity_code: z
    .string()
    .optional()
    .describe("The product commodity code"),
  product_unit_of_measure: z.string().default("NAR").optional()
    .describe(`The unit of measure for the product. Defaults to "NAR" (number of articles).
    Examples: "TDK" or "MTQ"`),
  product_tax_amount: z.string().optional()
    .describe(`The tax that should be added to the product cost. This is a fixed amount,
  not a percentage.
  Example: "1.54"`),
  product_discount_amount: z
    .string()
    .optional()
    .describe(`The discount that should be subtracted from the product cost.`),
  product_image_data: z
    .string()
    .optional()
    .describe(
      `The base64 encoded image data for the product image. Must be 2 MB or less.`
    ),
  product_image_name: z
    .string()
    .optional()
    .describe(
      `The file name of the image being added with product_image_data.`
    ),
});

export type AddProductRequest = z.infer<typeof AddProductRequestSchema>;

export const UpdateProductRequestSchema = z.object({
  products: z
    .literal("update_product")
    .describe("Update a product in the product manager"),
  product_id: z.string().optional().describe("The product ID"),
  product_sku: z.string().optional().describe("The product SKU"),
  product_description: z
    .string()
    .optional()
    .describe("The product description"),
  product_cost: z.string().optional().describe("The product cost"),
  product_currency: z
    .string()
    .default("USD")
    .optional()
    .describe("The product currency"),
  product_commodity_code: z
    .string()
    .optional()
    .describe("The product commodity code"),
  product_unit_of_measure: z
    .string()
    .default("NAR")
    .optional()
    .describe(
      `The unit of measure for the product. Defaults to "NAR" (number of articles). Examples: "TDK" or "MTQ"`
    ),
  product_tax_amount: z
    .string()
    .optional()
    .describe(
      `The tax that should be added to the product cost. This is a fixed amount, not a percentage. Example: "1.54"`
    ),
  product_discount_amount: z
    .string()
    .optional()
    .describe(`The discount that should be subtracted from the product cost.`),
  product_image_data: z
    .string()
    .optional()
    .describe(
      `The base64 encoded image data for the product image. Must be 2 MB or less.`
    ),
  product_image_name: z
    .string()
    .optional()
    .describe(
      `The file name of the image being added with product_image_data.`
    ),
});

export type UpdateProductRequest = z.infer<typeof UpdateProductRequestSchema>;

export const DeleteProductRequestSchema = z.object({
  products: z
    .literal("delete_product")
    .describe("Delete a product from the product manager"),
  product_id: z.string().optional().describe("The product ID"),
});

export type DeleteProductRequest = z.infer<typeof DeleteProductRequestSchema>;
