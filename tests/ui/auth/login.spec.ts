import { expect } from "@playwright/test";
import { test } from "../../../fixtures/base";
import { loginData } from "../../../test-data/auth/login";

test("valid login", async ({ loginPage, page }) => {
  await Promise.all([
    await loginPage.login(loginData),
    await page.waitForURL("http://localhost:3001/en"),
  ]);
  const cookies = await page.context().cookies("http://localhost:3001");
  const authCookie = cookies.find(
    (cookie) => cookie.name === "vendure-auth-token",
  );
  expect(authCookie).toBeDefined();
});
