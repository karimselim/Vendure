import { Page, Locator } from "@playwright/test";

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
    this.page.goto("http://localhost:3001/en/register");
    this.email.fill();
    this.firstName.fill();
    this.firstName.fill();
    this.firstName.fill();
    this.firstName.fill();
    this.firstName.fill();
    this.firstName.fill();
  }
}
