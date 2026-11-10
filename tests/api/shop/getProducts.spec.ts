import { expect } from "@playwright/test";
import { test } from "../../../fixtures/api-base";
import {
  itemsType,
  sortingWayType,
} from "../../../types/api-types/shop/products-page/getProducts-api";
import { stat } from "node:fs";

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

test.only("Test Sorting", async ({ getProductsApiClient }) => {
  const sortingWay = "DESC" as sortingWayType;
  const { body, status } = await getProductsApiClient.getProducts({
    options: {
      sort: { name: sortingWay },
    },
  });
  const sorting = (a: string, b: string) =>
    sortingWay === "ASC"
      ? String(a).localeCompare(String(b))
      : String(b).localeCompare(String(a));

  const items = body.data?.products.items;
  if (!items) throw new Error("Products data is missing");

  console.log(items);

  const names = items?.map((item) => item.name);
  const sortedNames = [...names].sort(sorting);

  if (!sortedNames) throw new Error("Couldn't sort the names array");

  expect(status).toBe(200);
  expect(items?.length).toBeGreaterThan(0);
  expect(names).toEqual(sortedNames);
});
