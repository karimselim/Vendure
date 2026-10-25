import { expect } from "@playwright/test";
import { test } from "../fixtures/base";
import { signupData } from "../test-data/signup";

test("testing signup", async ({ signupPage, page }) => {
  await Promise.all([
    page.waitForURL(/\/verify-pending$/),
    signupPage.signup(signupData),
  ]);
  await expect(page).toHaveURL((url) =>
    url.pathname.endsWith("/verify-pending"),
  );
});
