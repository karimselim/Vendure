import { expect } from "@playwright/test";
import { test } from "../../../fixtures/api-base";
import { loginData } from "../../../test-data/auth/login";

test("valid login", async ({ loginApiClient }) => {
  const password = process.env.SIGNUP_PASSWORD;

  if (!password) {
    throw new Error("SIGNUP_PASSWORD is missing from the .env file");
  }

  const { body } = await loginApiClient.login(loginData.email, password);

  if (!body.data) {
    throw new Error("GraphQL response did not contain data");
  }

  const login = body.data.login;

  if ("errorCode" in login) {
    throw new Error(login.message);
  }

  expect(login.id).toBeTruthy();
  expect(login.identifier).toBe(loginData.email);
});
