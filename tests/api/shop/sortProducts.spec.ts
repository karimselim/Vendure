// I will only use sorting with ( id, name, created At )

import { expect } from "@playwright/test";
import { test } from "../../../fixtures/api-base";
import {
  apiSortCasesType,
  sortingOptionType,
} from "../../../types/api-types/shop/products-page/getProducts-api";

// Notice that the UI only have name and price
const apiSortCases: apiSortCasesType = [
  { option: "id", order: "ASC" },
  { option: "id", order: "DESC" },
  { option: "name", order: "ASC" },
  { option: "name", order: "DESC" },
  { option: "createdAt", order: "ASC" },
  { option: "createdAt", order: "DESC" },
];

const sorting: Record<sortingOptionType, (a: string, b: string) => number> = {
  createdAt: (a, b) => Date.parse(a) - Date.parse(b),
  id: (a, b) => Number(a) - Number(b),
  name: (a, b) => a.localeCompare(b),
};

for (const { option, order } of apiSortCases) {
  test(`Test sorting the products using ${option} in a ${order} way`, async ({
    getProductsApiClient,
  }) => {
    const { body, status } = await getProductsApiClient.getProducts({
      options: {
        sort: {
          [option]: order,
        },
      },
    });
    expect(status).toBe(200);
    if (!body.data) throw new Error(body.errors?.message);

    const items = body.data.products.items;
    expect(items.length).toBeGreaterThan(1);

    const actual = items.map((item) => item[option]);
    const expected = [...actual].sort(sorting[option]);
    order === "DESC" && expected.reverse();
    expect(actual).toEqual(expected);
  });
}
