import { ShopApiClient } from "./../api-clients/shop-api-client";
import { AuthApiClient } from "./../api-clients/auth-api-client";
import { test as base } from "@playwright/test";

type MyFixtures = {
  authApiClient: AuthApiClient;
  shopApiClient: ShopApiClient;
};

export const test = base.extend<MyFixtures>({
  shopApiClient: async ({ request }, use) => {
    const shopApiClient = new ShopApiClient(request);
    await use(shopApiClient);
  },

  authApiClient: async ({ shopApiClient }, use) => {
    const authApiClient = new AuthApiClient(shopApiClient);
    await use(authApiClient);
  },
});
