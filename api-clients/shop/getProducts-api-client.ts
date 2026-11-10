import {
  graphGetProductsResponse,
  productListOptionsType,
} from "../../types/api-types/shop/products-page/getProducts-api";
import { ShopApiClient } from "../shop-api-client";

export class GetProductsApiClient {
  constructor(private client: ShopApiClient) {}

  async getProducts(options?: productListOptionsType) {
    const query = `#graphql
  query getProducts($options:ProductListOptions){
    products(options: $options){
      items{
        id
        name
        description
        createdAt
        updatedAt
        description
        enabled
      }
    }
  }
`;
    return this.client.send<graphGetProductsResponse>(query, options);
  }
}
