import { Locator, Page } from "@playwright/test";

export class ProductsPage {
  private readonly shopNowButton: Locator;
  private readonly products: Locator;
  private readonly sortingMenu: Locator;
  private readonly ZToAOption: Locator;

  constructor(private readonly page: Page) {
    this.shopNowButton = this.page.getByRole("button", {
      name: "Shop Now",
      exact: true,
    });

    //pay attention that these are all the products
    this.products = this.page.getByTestId("product");

    this.sortingMenu = this.page.getByRole("combobox");
    this.ZToAOption = this.page.getByRole("option", {
      name: "Name: Z to A",
      exact: true,
    });
  }

  getProducts(): Locator {
    return this.products;
  }

  async navigateToProductsPage(): Promise<void> {
    await this.page.goto("/");
    await this.shopNowButton.click();
  }

  async navigateToFirstProductDetails(): Promise<void> {
    await this.products.first().click();
  }

  async navigateToLastProductDetails(): Promise<void> {
    await this.products.last().click();
  }

  getProductImage(product: Locator): Locator {
    return product.getByTestId("image");
  }

  getProductTitle(product: Locator): Locator {
    return product.getByTestId("title");
  }

  getProductPrice(product: Locator): Locator {
    return product.getByTestId("price");
  }

  async sortingProducts(
    sortingMethod: "A-Z" | "Z-A" | "lowest to highest" | "highest to lowest",
  ): Promise<void> {
    await this.page.goto("/search");
    await this.sortingMenu.click();
    if (sortingMethod === "Z-A") {
      await this.ZToAOption.click();
    }
  }
}
