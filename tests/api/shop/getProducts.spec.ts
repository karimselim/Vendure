import { expect } from "@playwright/test";
import { test } from "../../../fixtures/api-base";

test("Testing get products", async ({ getProductsApiClient }) => {
  const { status, body } = await getProductsApiClient.getProducts();

  if (!body.data) {
    throw new Error("GraphQL response did not contain data");
  }

  const products = body.data.products;

  expect(status).toBe(200);
  expect(products.items.length).toBeGreaterThan(0);
  expect(products.items[0].id).toBeTruthy();
  for (const product of products.items) {
    expect(product.id).toBeTruthy();
  }
});
