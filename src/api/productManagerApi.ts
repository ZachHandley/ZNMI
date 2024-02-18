import {
  AddProductRequestSchema,
  UpdateProductRequestSchema,
  DeleteProductRequestSchema,
  PRODUCT_MANAGER_URL,
} from "../types/productManagerRequest";
import { ProductResponseSchema } from "@/types/responseTypes";
import { PostRequest } from "./utils";
import { z } from "zod";

type AddProductRequest = z.infer<typeof AddProductRequestSchema>;
type UpdateProductRequest = z.infer<typeof UpdateProductRequestSchema>;
type DeleteProductRequest = z.infer<typeof DeleteProductRequestSchema>;

export class ProductManagerApi {
  _securityKey: string;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
  }

  beforeRequest = (request: any) => {
    return {
      ...request,
      security_key: this._securityKey,
    };
  };

  parseResponse = (data: any) => {
    return ProductResponseSchema.parse(data);
  };

  addProduct = async (addProductRequest: AddProductRequest) => {
    const request = this.beforeRequest(addProductRequest);
    const response = await PostRequest(PRODUCT_MANAGER_URL, request);
    return this.parseResponse(response.data);
  };

  updateProduct = async (updateProductRequest: UpdateProductRequest) => {
    const request = this.beforeRequest(updateProductRequest);
    const response = await PostRequest(PRODUCT_MANAGER_URL, request);
    return this.parseResponse(response.data);
  };

  deleteProduct = async (deleteProductRequest: DeleteProductRequest) => {
    const request = this.beforeRequest(deleteProductRequest);
    const response = await PostRequest(PRODUCT_MANAGER_URL, request);
    return this.parseResponse(response.data);
  };
}
