import { ShopApiClient } from "./../api-clients/shop-api-client";
import { LoginApiClient } from "../api-clients/login-api-client";
import { test as base } from "@playwright/test";
import { SignupApiClient } from "../api-clients/signup-api-client";

type MyFixtures = {
  loginApiClient: LoginApiClient;
  shopApiClient: ShopApiClient;
  signupApiClient: SignupApiClient;
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
});
