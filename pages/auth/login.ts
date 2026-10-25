import { Locator, Page } from "@playwright/test";
import { loginDataType } from "../../types/auth/login";

export class LoginPage {
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly signInButton: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByLabel("Email");
    this.password = page.getByRole("textbox", {
      name: "Password",
      exact: true,
    });
    this.signInButton = page.getByRole("button", {
      name: "Sign In",
      exact: true,
    });
  }

  async login(data: loginDataType) {
    const passwordInput = process.env.SIGNUP_PASSWORD;
    if (!passwordInput) {
      throw new Error(
        "the password that I should get from .env file is not existing",
      );
    }

    await this.page.goto("/sign-in");
    await this.email.waitFor({ state: "visible" });
    await this.email.fill(data.email);
    await this.password.fill(passwordInput);
    await this.page.pause();
    await this.signInButton.click();
  }
}
