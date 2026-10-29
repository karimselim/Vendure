import { expect } from "@playwright/test";
import { test } from "../../../fixtures/api-base";
import { loginData } from "../../../test-data/auth/login";

test("Valid Forgot Passwor", async ({ forgotPasswordApiClient }) => {
  const { body } = await forgotPasswordApiClient.ForgotPassword(
    loginData.email,
  );

  if (!body.data) {
    throw new Error(body.errors[0].message);
  }

  const forgotPassword = body.data.requestPasswordReset;
  if ("errorCode" in forgotPassword) {
    throw new Error(forgotPassword.message);
  }
  expect(forgotPassword.success).toBe(true);
});
