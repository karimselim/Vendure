import { expect } from "@playwright/test";
import { test } from "../../../fixtures/base";

test("Products page navigation", async ({ productsPage, page }) => {
  await productsPage.navigateToProductsPage();
  expect(page).toHaveURL("en/search");
});

// I'm testing navigation to the product details using the first and last products
test.only("Products details navigation ( using boundary values ) ", async ({
  productsPage,
  page,
}) => {
  await productsPage.navigateToProductsPage();

  const firstHref = (await productsPage.getProductInfo()).firstProductHref;
  const lastHref = (await productsPage.getProductInfo()).lastProductHref;

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

test("Checking for products details", async ({ productsPage }) => {
  await productsPage.checkForProductDetails();
});
