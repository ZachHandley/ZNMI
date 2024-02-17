import {
  AddProductRequestSchema,
  UpdateProductRequestSchema,
  DeleteProductRequestSchema,
  PRODUCT_MANAGER_URL,
} from "../types/productManagerRequest";
import { z } from "zod";
import { PostRequest } from "./utils";

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

  addProduct = async (addProductRequest: AddProductRequest) => {
    const request = this.beforeRequest(addProductRequest);
    return PostRequest(PRODUCT_MANAGER_URL, request);
  };

  updateProduct = async (updateProductRequest: UpdateProductRequest) => {
    const request = this.beforeRequest(updateProductRequest);
    return PostRequest(PRODUCT_MANAGER_URL, request);
  };

  deleteProduct = async (deleteProductRequest: DeleteProductRequest) => {
    const request = this.beforeRequest(deleteProductRequest);
    return PostRequest(PRODUCT_MANAGER_URL, request);
  };
}
