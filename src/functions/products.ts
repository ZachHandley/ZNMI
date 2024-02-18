import {
  AddProductRequestSchema,
  UpdateProductRequestSchema,
  DeleteProductRequestSchema,
  PRODUCT_MANAGER_URL,
} from "@/types/productManagerRequest";
import { ProductManagerApi } from "@/api/productManagerApi";
import { ProductResponseSchema } from "@/types/responseTypes";
import { z } from "zod";

type AddProductRequest = z.infer<typeof AddProductRequestSchema>;
type UpdateProductRequest = z.infer<typeof UpdateProductRequestSchema>;
type DeleteProductRequest = z.infer<typeof DeleteProductRequestSchema>;
type ProductResponse = z.infer<typeof ProductResponseSchema>;

export class Products {
  productManagerApi: ProductManagerApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
    this.productManagerApi = new ProductManagerApi(securityKey);
  }

  beforeRequest = (request: any) => {
    return {
      ...request,
      securityKey: this._securityKey,
    };
  };

  async addProduct(
    productData?: {
      product_sku: string;
      product_description: string;
      product_cost: string;
      product_currency?: string;
      product_commodity_code?: string;
      product_unit_of_measure?: string;
      product_tax_amount?: string;
      product_discount_amount?: string;
      product_image_data?: string;
      product_image_name?: string;
    },
    additionalOptions?: Partial<AddProductRequest>
  ): Promise<{
    status: number;
    data?: ProductResponse;
    message?: string;
  }> {
    try {
      if (!productData && !additionalOptions) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const addProductRequest: AddProductRequest =
        AddProductRequestSchema.parse({
          products: "add_product",
          ...productData,
          ...additionalOptions,
        });
      const request = this.beforeRequest(addProductRequest);
      const result = await this.productManagerApi.addProduct(request);
      return {
        status: 200,
        data: result,
        message: "Product added successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error adding product",
      };
    }
  }

  async updateProduct(
    productData?: {
      product_id: string;
      product_sku?: string;
      product_description?: string;
      product_cost?: string;
      product_currency?: string;
      product_commodity_code?: string;
      product_unit_of_measure?: string;
      product_tax_amount?: string;
      product_discount_amount?: string;
      product_image_data?: string;
      product_image_name?: string;
    },
    additionalOptions?: Partial<UpdateProductRequest>
  ): Promise<{
    status: number;
    data?: ProductResponse;
    message?: string;
  }> {
    try {
      if (!productData && !additionalOptions) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const updateProductRequest: UpdateProductRequest =
        UpdateProductRequestSchema.parse({
          products: "update_product",
          ...productData,
          ...additionalOptions,
        });
      const request = this.beforeRequest(updateProductRequest);
      const result = await this.productManagerApi.updateProduct(request);
      return {
        status: 200,
        data: result,
        message: "Product updated successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error updating product",
      };
    }
  }

  async deleteProduct(
    productData?: {
      product_id: string;
    },
    additionalOptions?: Partial<DeleteProductRequest>
  ): Promise<{
    status: number;
    data?: ProductResponse;
    message?: string;
  }> {
    try {
      if (
        !productData &&
        (!additionalOptions || !additionalOptions.product_id)
      ) {
        return {
          status: 400,
          message: "product_id is required",
        };
      }
      const deleteProductRequest: DeleteProductRequest =
        DeleteProductRequestSchema.parse({
          products: "delete_product",
          ...productData,
          ...additionalOptions,
        });
      const request = this.beforeRequest(deleteProductRequest);
      const result = await this.productManagerApi.deleteProduct(request);
      return {
        status: 200,
        data: result,
        message: "Product deleted successfully",
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error deleting product",
      };
    }
  }
}
