import { Locator, Page } from "@playwright/test";

export class ProductsPage {
  private readonly shopNowButton: Locator;
  private readonly products: Locator;
  private readonly productImages: Locator;
  private readonly productTitles: Locator;
  private readonly productPrices: Locator;
  private readonly sortingMenu: Locator;

  constructor(private readonly page: Page) {
    this.shopNowButton = this.page.getByRole("button", {
      name: "Shop Now",
      exact: true,
    });

    //pay attention that these are all the products
    this.products = this.page.locator("#product");
    this.productImages = this.products.locator("img");
    this.productTitles = this.products.locator("h3");
    this.productPrices = this.products.locator("p");

    this.sortingMenu = this.page.getByRole("combobox");
  }

  async navigateToProductsPage() {
    await this.page.goto("/");
    await this.shopNowButton.click();
  }

  async checkForProductDetails() {
    await this.page.goto("/en/search");
    const productCount = await this.products.count();
    const productImagesCount = await this.productImages.count();
    const productTitlesCount = await this.productTitles.count();
    const productPricesCount = await this.productPrices.count();

    if (productCount === 0) throw new Error("There's no products in the page");

    if (
      productCount !== productImagesCount ||
      productCount !== productTitlesCount ||
      productCount !== productPricesCount
    ) {
      throw new Error("Some Products details are missing");
    }
  }
}
