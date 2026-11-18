import { expect } from "@playwright/test";
import { test } from "../../../fixtures/base";

test("Should display all required info for the product", async ({
  producDetailsPage,
  productsPage,
  page,
}) => {
  await page.goto("/search");
  const cards = productsPage.getProducts();
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    await test.step(`product ${i + 1}`, async () => {
      const card = cards.nth(i);

      await page.goto("/search");
      await expect(cards.first()).toBeVisible();

      await card.click();

      const details = producDetailsPage.getProducDetails();
      await expect(details.price).toBeVisible();
      await expect(details.title).toBeVisible();
      await expect(details.sku).toBeVisible();
      await expect(details.stockStatus).toBeVisible();
      if ((await details.stockStatus.innerText()) === "Out of Stock") {
        await expect(details.addToCartButton).not.toBeVisible();
        await expect(details.outOfStockButton).toBeVisible();
      }
    });
  }
});
