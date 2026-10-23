import { test as base } from "@playwright/test";
import { SignupPage } from "../pages/signup";

type MyFixtures = {
  signupPage: SignupPage;
};

export const test = base.extend<MyFixtures>({
  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page);
    await use(signupPage);
  },
});
