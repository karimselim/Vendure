import { Page, Locator } from "@playwright/test";
import { signupData } from "../test-data/signup";

export class signupPage {
  private readonly email: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly phoneNumber: Locator;
  private readonly password: Locator;
  private readonly confirmPassword: Locator;
  private readonly createAccountButton: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByLabel("Email Adress");
    this.firstName = page.getByLabel("First Name");
    this.lastName = page.getByLabel("Last Name");
    this.phoneNumber = page.getByLabel("Phone Number (Optoinal)");
    this.password = page.getByLabel("Password");
    this.confirmPassword = page.getByLabel("Confirm Password");
    this.createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
  }

  async signup() {
    this.page.goto(signupData.signupUrl);
    this.email.fill(signupData.email);
    this.firstName.fill(signupData.firstName);
    this.lastName.fill(signupData.lastName);
    this.phoneNumber.fill(signupData.phoneNumber);
    this.password.fill(process.env.SIGNUP_PASSWORD);
    this.confirmPassword.fill(process.env.SIGNUP_PASSWORD);
    this.createAccountButton.click();
  }
}
