import { ShopApiClient } from "../shop-api-client";

export class productDetailsApiClient {
  constructor(private client: ShopApiClient) {}

  async productDetails() {
    const query = `#graphql
    query productDetails{
      product(slug:"air-pods"){
        id
        name
        description
        variants{
          sku
          price
        }
      }
    }
    `;

    return this.client.send(query);
  }
}
