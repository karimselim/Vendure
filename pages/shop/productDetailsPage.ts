import { Locator, Page } from "@playwright/test";
import { productDataType } from "../../types/ui/shop/productDetailsPage";

export class ProductDetailsPage {
  private readonly image: Locator;
  private readonly title: Locator;
  private readonly price: Locator;
  private readonly description: Locator;
  private readonly sku: Locator;
  private readonly stockStatus: Locator;
  private readonly addToCartButton: Locator;
  private readonly outOfStockButton: Locator;

  constructor(private readonly page: Page) {
    this.image = this.page.getByTestId("productImg");
    this.title = this.page
      .getByTestId("productTitle")
      .filter({ visible: true });
    this.price = this.page
      .getByTestId("productPrice")
      .filter({ visible: true });
    this.description = this.page.getByTestId("productDescription");
    this.sku = this.page.getByTestId("productSku");
    this.stockStatus = this.page.getByTestId("productStockStatus");
    this.addToCartButton = this.page.getByRole("button", {
      name: "Add to Cart",
    });
    this.outOfStockButton = this.page.getByRole("button", {
      name: "Out of Stock",
    });
  }

  getProducDetails(): productDataType {
    return {
      title: this.title,
      price: this.price,
      sku: this.sku,
      stockStatus: this.stockStatus,
      addToCartButton: this.addToCartButton,
      outOfStockButton: this.outOfStockButton,
    };
  }
}
