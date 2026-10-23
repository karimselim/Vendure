import { expect } from "@playwright/test";
import { test } from "../fixtures/base";

test("testing signup", async ({ signupPage, page }) => {
  await signupPage.signup();
  await expect(page).toHaveURL((url) =>
    url.pathname.endsWith("/verify-pending"),
  );
});
