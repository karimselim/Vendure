import { expect } from "@playwright/test";
import { test } from "../../../fixtures/base";
import { sortingMethodType } from "../../../types/ui/shop/productsPage";

test("Products page navigation", async ({ productsPage, page }) => {
  await productsPage.navigateToProductsPage();
  await expect(page).toHaveURL("en/search");
});

// I'm testing navigation to the product details using the first and last products
test("Products details navigation ( using boundary values ) ", async ({
  productsPage,
  page,
}) => {
  await productsPage.navigateToProductsPage();

  const firstHref = await productsPage
    .getProducts()
    .first()
    .getAttribute("href");
  const lastHref = await productsPage.getProducts().last().getAttribute("href");

  if (!firstHref) {
    throw new Error("first product doesn't have href");
  }
  if (!lastHref) {
    throw new Error("last product doesn't have href");
  }

  await productsPage.navigateToFirstProductDetails();
  await expect(page).toHaveURL(firstHref);

  await page.goBack();

  await productsPage.navigateToLastProductDetails();
  await expect(page).toHaveURL(lastHref);
});

test("Checking for products details", async ({ productsPage, page }) => {
  await productsPage.navigateToProductsPage();
  const products = productsPage.getProducts();
  await expect(products.first()).toBeVisible();

  const productsCount = await products.count();

  expect(productsCount).toBeGreaterThan(0);

  for (let i = 0; i < productsCount; i++) {
    const product = products.nth(i);

    await expect(productsPage.getProductImage(product)).toBeVisible();
    await expect(productsPage.getProductTitle(product)).toHaveText(/\S/);
    await expect(productsPage.getProductPrice(product)).toHaveText(/\d/);
  }
});
