import { test as base } from "@playwright/test";
import { SignupPage } from "../pages/auth/signup";
import { LoginPage } from "../pages/auth/login";
import { ForgotPassword } from "../pages/auth/forgotPassword";

type MyFixtures = {
  signupPage: SignupPage;
  loginPage: LoginPage;
  forgotPasswordPage: ForgotPassword;
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
});
