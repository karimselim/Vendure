import { graphGetProductsResponse } from "../../types/api-types/shop/products-page/getProducts-api";
import { ShopApiClient } from "../shop-api-client";
import { itemsType } from "../../types/api-types/shop/products-page/getProducts-api";

export class GetProductsApiClient {
  constructor(private client: ShopApiClient) {}

  async getProducts() {
    const query = `#graphql
  query getProducts{
    products{
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
    return this.client.send<graphGetProductsResponse>(query);
  }
}
