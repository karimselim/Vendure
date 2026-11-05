import { Locator, Page } from "@playwright/test";

export class ProductsPage {
  private readonly shopNowButton: Locator;
  private readonly products: Locator;
  private readonly sortingMenu: Locator;

  constructor(private readonly page: Page) {
    this.shopNowButton = this.page.getByRole("button", {
      name: "Shop Now",
      exact: true,
    });

    //pay attention that these are all the products
    this.products = this.page.getByTestId("product");

    this.sortingMenu = this.page.getByRole("combobox");
  }

  getProducts(): Locator {
    return this.products;
  }

  async navigateToProductsPage() {
    await this.page.goto("/");
    await this.shopNowButton.click();
  }

  async navigateToFirstProductDetails() {
    await this.products.first().click();
  }

  async navigateToLastProductDetails() {
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
}
