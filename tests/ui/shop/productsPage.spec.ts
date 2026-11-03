import { expect } from "@playwright/test";
import { test } from "../../../fixtures/base";

test("Products page navigation", async ({ productsPage, page }) => {
  await productsPage.navigateToProductsPage();
  expect(page).toHaveURL("en/search");
});

test.only("Products details navigation ( using boundary values", async ({
  productsPage,
  page,
}) => {
  await productsPage.navigateToProductsPage();

  const firstHref = (await productsPage.getProductInfo()).firstProductHref;
  if (!firstHref) {
    throw new Error("");
  }
  await productsPage.navigateToFirstProductDetails();
  await expect(page).toHaveURL(firstHref);
});

test("Checking for products details", async ({ productsPage }) => {
  await productsPage.checkForProductDetails();
});
