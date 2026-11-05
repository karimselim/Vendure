import { expect } from "@playwright/test";
import { test } from "../../../fixtures/base";

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

test.only("Test Sorting", async ({ productsPage, page }) => {
  const ascendingSort = (array: string[]) => {
    array.sort((a, b) => a.localeCompare(b));
  };
  const descendingSort = (array: string[]): string[] => {
    return array.sort((a, b) => b.localeCompare(a));
  };

  const sortingMethod = "Z-A";
  await productsPage.sortingProducts(sortingMethod);
  await expect(page).toHaveURL(/sort=name-desc/);

  const productsTitles = await productsPage
    .getProducts()
    .getByTestId("title")
    .allTextContents();

  if (productsTitles.length === 0 || productsTitles.length === 1)
    throw new Error("There's no products to sort or there's just one product");

  const sortedTitlesArray = descendingSort([...productsTitles]);
  expect(productsTitles).toEqual(sortedTitlesArray);
});
