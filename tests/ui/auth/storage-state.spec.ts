import { test } from "../../../fixtures/base";
import { loginData } from "../../../test-data/auth/login";

test("Storing storage state", async ({ loginPage, page, context }) => {
  (await loginPage.login(loginData),
    await page.waitForURL("http://localhost:3001/en"),
    await context.storageState({ path: ".auth/state.json" }));
});
