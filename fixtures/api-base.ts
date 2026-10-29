import { ShopApiClient } from "../api-clients/auth/shop-api-client";
import { LoginApiClient } from "../api-clients/auth/login-api-client";
import { test as base } from "@playwright/test";
import { SignupApiClient } from "../api-clients/auth/signup-api-client";
import { ForgotPasswordApiClient } from "../api-clients/auth/forgotPassword-api-clients";

type MyFixtures = {
  loginApiClient: LoginApiClient;
  shopApiClient: ShopApiClient;
  signupApiClient: SignupApiClient;
  forgotPasswordApiClient: ForgotPasswordApiClient;
};

export const test = base.extend<MyFixtures>({
  shopApiClient: async ({ request }, use) => {
    const shopApiClient = new ShopApiClient(request);
    await use(shopApiClient);
  },

  loginApiClient: async ({ shopApiClient }, use) => {
    const loginApiClient = new LoginApiClient(shopApiClient);
    await use(loginApiClient);
  },

  signupApiClient: async ({ shopApiClient }, use) => {
    const signupApiClient = new SignupApiClient(shopApiClient);
    await use(signupApiClient);
  },

  forgotPasswordApiClient: async ({ shopApiClient }, use) => {
    const forgotPasswordApiClient = new ForgotPasswordApiClient(shopApiClient);
    await use(forgotPasswordApiClient);
  },
});
