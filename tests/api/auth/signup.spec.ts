import { signupData } from "./../../../test-data/auth/signup";
import { test } from "../../../fixtures/api-base";
import { expect } from "@playwright/test";

test("Valid Signup Filling All Fields", async ({ signupApiClient }) => {
  const password = process.env.SIGNUP_PASSWORD;
  if (!password)
    throw new Error("SIGNUP_PASSWORD is missing from the .env file");

  const { body } = await signupApiClient.signup(
    signupData.email,
    signupData.firstName,
    signupData.lastName,
    signupData.phoneNumber,
    password,
  );

  if (!body.data) {
    throw new Error("GraphQL response did not contain data");
  }

  const signup = body.data.registerCustomerAccount;

  if ("errorCode" in signup) {
    throw new Error(signup.message);
  }

  expect(signup.success).toBe(true);
});
