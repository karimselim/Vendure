import { expect } from "@playwright/test";
import { test } from "../fixtures/base";
import { signupData } from "../test-data/signup";

test("testing signup", async ({ signupPage, page }) => {
  await signupPage.signup(signupData);
  await expect(page).toHaveURL((url) =>
    url.pathname.endsWith("/verify-pending"),
  );
});
