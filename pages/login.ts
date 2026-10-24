import { Locator, Page } from "@playwright/test";

export class SignIn {
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly signInButton: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByLabel("Email");
    this.password = page.getByRole("textbox", {
      name: "Password",
      exact: true,
    });
    this.signInButton = page.getByRole("button", { name: "Sign In" });
  }

  async login(data) {
    const passwordInput = process.env.SIGNUP_PASSWORD;
    if (!passwordInput) {
      throw new Error(
        "the password that I should get from .env file is not existing",
      );
    }

    this.page.goto(data.url);
    this.email.waitFor({ state: "visible" });
    this.email.fill(data.email);
    this.password.fill(passwordInput);
    this.signInButton.click();
  }
}
