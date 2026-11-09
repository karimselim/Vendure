import { ShopApiClient } from "../api-clients/shop-api-client";
import { LoginApiClient } from "../api-clients/auth/login-api-client";
import { test as base } from "@playwright/test";
import { SignupApiClient } from "../api-clients/auth/signup-api-client";
import { ForgotPasswordApiClient } from "../api-clients/auth/forgotPassword-api-clients";
import { GetProductsApiClient } from "../api-clients/shop/getProducts-api-client";

type MyFixtures = {
  loginApiClient: LoginApiClient;
  shopApiClient: ShopApiClient;
  signupApiClient: SignupApiClient;
  forgotPasswordApiClient: ForgotPasswordApiClient;
  getProductsApiClient: GetProductsApiClient;
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

  getProductsApiClient: async ({ shopApiClient }, use) => {
    const getProductsApiClient = new GetProductsApiClient(shopApiClient);
    await use(getProductsApiClient);
  },
});
