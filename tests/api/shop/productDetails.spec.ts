import { expect } from "@playwright/test";
import { test } from "../../../fixtures/api-base";

test("Should get all required fields for the UI", async ({
  productDetailsApiClient,
}) => {
  const { body, status } = await productDetailsApiClient.productDetails();

  if (!body.data) {
    throw new Error("body has no data");
  }

  expect(status).toBe(200);
  console.log(body.data.product);
});
