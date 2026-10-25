import { loginDataType } from "./../types/login";
import { Locator, Page } from "@playwright/test";

export class ForgotPassword {
  private readonly email: Locator;
  private readonly sendResetLinkButton: Locator;

  constructor(private readonly page: Page) {
    this.email = this.page.getByRole("textbox", { name: "Email" });
    this.sendResetLinkButton = this.page.getByRole("button", {
      name: "Send reset link",
      exact: true,
    });
  }

  async validForgotPassword(data: loginDataType) {
    await this.page.goto("/forgot-password");
    await this.email.waitFor({ state: "visible" });
    await this.email.fill(data.email);
    await this.page.pause();
    await this.sendResetLinkButton.click();
  }
}
