import { test as base } from "@playwright/test";
import { SignupPage } from "../pages/auth/signup";
import { LoginPage } from "../pages/auth/login";
import { ForgotPassword } from "../pages/auth/forgotPassword";
import { ProductsPage } from "../pages/shop/productsPage";

type MyFixtures = {
  signupPage: SignupPage;
  loginPage: LoginPage;
  forgotPasswordPage: ForgotPassword;
  productsPage: ProductsPage;
};

export const test = base.extend<MyFixtures>({
  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page);
    await use(signupPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  forgotPasswordPage: async ({ page }, use) => {
    const forgotPasswordPage = new ForgotPassword(page);
    await use(forgotPasswordPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
});
