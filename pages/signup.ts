import { Page, Locator } from "@playwright/test";
import { signupData } from "../test-data/signup";

export class SignupPage {
  private readonly email: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly phoneNumber: Locator;
  private readonly password: Locator;
  private readonly confirmPassword: Locator;
  private readonly createAccountButton: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByLabel("Email Address");
    this.firstName = page.getByLabel("First Name");
    this.lastName = page.getByLabel("Last Name");
    this.phoneNumber = page.getByLabel("Phone Number (Optional)");
    this.password = page.getByRole("textbox", {
      name: "Password",
      exact: true,
    });
    this.confirmPassword = page.getByRole("textbox", {
      name: "Confirm Password",
      exact: true,
    });
    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
  }

  async signup() {
    const passwordInput = process.env.SIGNUP_PASSWORD;
    if (!passwordInput) {
      throw new Error(
        "the password that I should get from .env file is not existing",
      );
    }

    await this.page.goto(signupData.signupUrl);
    //I've removed networkIdle as playwright docs it self descourage using it
    //networkidle' - DISCOURAGED consider operation to be finished when there are no network connections
    await this.email.waitFor({ state: "visible" });
    await this.email.fill(signupData.email);
    await this.firstName.fill(signupData.firstName);
    await this.lastName.fill(signupData.lastName);
    await this.phoneNumber.fill(signupData.phoneNumber);
    await this.password.fill(passwordInput);
    await this.confirmPassword.fill(passwordInput);
    // await this.page.pause();
    await this.createAccountButton.click();
  }
}
