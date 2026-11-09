import { graphGetProductsResponse } from "../../types/api-types/shop/products-page/getProducts-api";
import { ShopApiClient } from "../shop-api-client";

export class GetProductsApiClient {
  constructor(private client: ShopApiClient) {}

  async getProducts() {
    const query = `#graphql
  query getProducts{
    products{
      items{
        id
      }
    }
  }
`;
    return this.client.send<graphGetProductsResponse>(query);
  }
}
