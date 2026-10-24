import { test } from "../fixtures/base";
import { loginData } from "../test-data/login";

test("valid login", async ({ loginPage }) => {
  await loginPage.login(loginData);
});
