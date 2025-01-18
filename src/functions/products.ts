import { ProductManagerApi } from "../api/productManagerApi.js";
import {
  type AddProductRequest,
  type UpdateProductRequest,
  type DeleteProductRequest,
} from "../types/productManagerRequest.js";
import type { ProductResponse } from "../types/responseTypes.js";

export class Products {
  productManagerApi: ProductManagerApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
    this.productManagerApi = new ProductManagerApi(securityKey);
  }

  async addProduct(request: AddProductRequest): Promise<{
    status: number;
    data?: ProductResponse;
    message: string;
  }> {
    try {
      const result = await this.productManagerApi.addProduct({
        ...request,
        products: "add_product",
      });
      return {
        status: 200,
        data: result,
        message: "Product added successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error adding product: ${error.message}`,
      };
    }
  }

  async updateProduct(request: UpdateProductRequest): Promise<{
    status: number;
    data?: ProductResponse;
    message: string;
  }> {
    try {
      const result = await this.productManagerApi.updateProduct({
        ...request,
        products: "update_product",
      });
      return {
        status: 200,
        data: result,
        message: "Product updated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error updating product: ${error.message}`,
      };
    }
  }

  async deleteProduct(request: DeleteProductRequest): Promise<{
    status: number;
    data?: ProductResponse;
    message: string;
  }> {
    try {
      const result = await this.productManagerApi.deleteProduct({
        ...request,
        products: "delete_product",
      });
      return {
        status: 200,
        data: result,
        message: "Product deleted successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error deleting product: ${error.message}`,
      };
    }
  }
}
