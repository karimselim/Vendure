import { test } from "../fixtures/base";

test("testing signup", async ({ signupPage }) => {
  await signupPage.signup();
});
