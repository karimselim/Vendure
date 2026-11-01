import { expect } from "@playwright/test";
import { test } from "../../../fixtures/base";

test("Products page navigation", async ({ productsPage, page }) => {
  await productsPage.navigateToDetailsPage();
  expect(page).toHaveURL("en/search");
});

test("Checking for products details", async ({ productsPage }) => {
  await productsPage.checkForProductDetails();
});
