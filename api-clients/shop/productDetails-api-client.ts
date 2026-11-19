import { graphProductDetailsType } from "../../types/api-types/shop/productDetails-api";
import { ShopApiClient } from "../shop-api-client";

export class ProductDetailsApiClient {
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

    return this.client.send<graphProductDetailsType>(query);
  }
}
