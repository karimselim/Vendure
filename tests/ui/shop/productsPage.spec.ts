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

test.only("Test Sorting", async ({ productsPage, page }) => {
  const ascendingSort = (array: string[]): string[] => {
    return array.sort((a, b) => a.localeCompare(b));
  };
  const descendingSort = (array: string[]): string[] => {
    return array.sort((a, b) => b.localeCompare(a));
  };

  const sortingMethod: sortingMethodType = "lowest to highest";
  await productsPage.sortingProducts(sortingMethod);
  if (sortingMethod === "Z-A") {
    await expect(page).toHaveURL(/sort=name-desc/);
  } else if (sortingMethod === "A-Z") {
    await expect(page).toHaveURL(/sort=name-asc/);
  } else if (sortingMethod === "lowest to highest") {
    await expect(page).toHaveURL(/sort=price-asc/);
  } else if (sortingMethod === "highest to lowest") {
    await expect(page).toHaveURL(/sort=price-desc/);
  }

  const productsTitles = await productsPage
    .getProducts()
    .getByTestId("title")
    .allTextContents();

  const productsPrices = await productsPage
    .getProducts()
    .getByTestId("price")
    .allTextContents();

  if (productsPrices.length <= 1)
    throw new Error("There's no products to sort or there's just one product");

  if (sortingMethod == "Z-A") {
    const sortedTitlesArray = descendingSort([...productsTitles]);
    expect(productsTitles).toEqual(sortedTitlesArray);
  } else if (sortingMethod === "A-Z") {
    const sortedTitlesArray = ascendingSort([...productsTitles]);
    expect(productsTitles).toEqual(sortedTitlesArray);
  } else if (sortingMethod === "highest to lowest") {
    const sortedPricesArray = descendingSort([...productsPrices]);
    expect(productsPrices).toEqual(sortedPricesArray);
  } else if (sortingMethod === "lowest to highest") {
    const sortedPricesArray = ascendingSort([...productsPrices]);
    expect(productsPrices).toEqual(sortedPricesArray);
  } else {
    throw new Error("Wrong sorting method");
  }
});
