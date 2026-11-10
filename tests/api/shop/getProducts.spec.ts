import { expect } from "@playwright/test";
import { test } from "../../../fixtures/api-base";
import { itemsType } from "../../../types/api-types/shop/products-page/getProducts-api";

test("Testing get products", async ({ getProductsApiClient }) => {
  const { status, body } = await getProductsApiClient.getProducts();

  if (!body.data) {
    throw new Error("GraphQL response did not contain data");
  }

  const items: itemsType = body.data.products.items;

  expect(status).toBe(200);
  expect(items.length).toBeGreaterThan(0);
  expect(items[0].id).toBeTruthy();
  for (const item of items) {
    expect(item.id).toBeTruthy();
    expect(item.name).toBeTruthy();

    expect(item.createdAt).toBeTruthy();
    expect(item.updatedAt).toBeTruthy();

    expect(item.description).toBeDefined();
    expect(typeof item.description).toBe("string");

    expect(typeof item.enabled).toBe("boolean");
  }
});
