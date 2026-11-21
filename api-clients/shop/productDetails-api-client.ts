import { graphProductDetailsType } from "../../types/api-types/shop/productDetails-api";
import { ShopApiClient } from "../shop-api-client";

export class ProductDetailsApiClient {
  constructor(private client: ShopApiClient) {}

  async productDetails(id: string) {
    const query = `#graphql
    query productDetails($id:ID){
  product(id:$id){
    id
    name
    description
    variants{
      sku
      price
      stockLevel
    }
  }
}
    `;

    return this.client.send<graphProductDetailsType>(query, { id });
  }
}
