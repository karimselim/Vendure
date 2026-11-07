import { test } from "../../../fixtures/base";
import { sortCasesType } from "../../../types/ui/shop/productsPage";
import { expect } from "@playwright/test";

const parseInt = (text: string) => Number(text.replace(/[^\d.]/g, ""));

const sorting = (a: string | number, b: string | number) =>
  typeof a === "number" && typeof b === "number"
    ? a - b
    : String(a).localeCompare(String(b));

const sortCases: sortCasesType = [
  { method: "A-Z", url: /sort=name-asc/, field: "title", order: "asc" },
  { method: "Z-A", url: /sort=name-desc/, field: "title", order: "desc" },
  {
    method: "highest to lowest",
    url: /sort=price-desc/,
    field: "price",
    order: "desc",
  },
  {
    method: "lowest to highest",
    url: /sort=price-asc/,
    field: "price",
    order: "asc",
  },
];

for (const { method, url, field, order } of sortCases) {
  test(`Sorting ${field} in a ${method} way`, async ({
    productsPage,
    page,
  }) => {
    await productsPage.sortingProducts(method);
    await expect(page).toHaveURL(url);

    const cells = productsPage.getProducts().getByTestId(field);
    await expect(cells.first()).toBeVisible();
    expect(await cells.count()).toBeGreaterThan(1);

    await expect
      .poll(
        async () => {
          const texts = await cells.allTextContents();
          const values = field === "price" ? texts.map(parseInt) : texts;
          const expected = [...values].sort(sorting);
          if (order === "desc") expected.reverse();
          return values.every((v, i) => v === expected[i]);
        },
        { message: `${method} is the wrong sorting method` },
      )
      .toBe(true);
  });
}
