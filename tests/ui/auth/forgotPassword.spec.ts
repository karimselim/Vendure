import { expect } from "@playwright/test";
import { test } from "../../../fixtures/base";
// import { loginData } from "../../test-data/auth/login";
import { loginData } from "../../../test-data/auth/login";

test("Valid forgot password", async ({ forgotPasswordPage, page }) => {
  await forgotPasswordPage.validForgotPassword(loginData);
  await expect(page.getByText("Check your email", { exact: true })).toBeVisible(
    { timeout: 10_000 },
  );
});
