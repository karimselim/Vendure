import { Locator } from "@playwright/test";

export type productDataType = {
  title: Locator;
  price: Locator;
  sku: Locator;
  stockStatus: Locator;
  outOfStockButton: Locator;
  addToCartButton: Locator;
};
