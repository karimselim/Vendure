import { expect } from "@playwright/test";
import { test } from "../../../fixtures/api-base";
import { requiredFieldsType } from "../../../types/api-types/shop/productDetails-api";

test("Should get all required fields for the UI", async ({
  productDetailsApiClient,
  getProductsApiClient,
}) => {
  const { body, status } = await getProductsApiClient.getProducts();
  expect(status).toBe(200);

  if (!body.data || !body.data.products.items)
    throw new Error("Body has no items");
  const items = body.data.products.items;
  const count = items.length;

  for (let i = 0; i < count; i++) {
    await test.step(`Product ${i + 1}`, async () => {
      const item = items[i];
      expect.soft(item.id).toEqual(expect.any(String));
      const id = item.id;
      const { body, status } = await productDetailsApiClient.productDetails(id);
      expect(status).toBe(200);
      expect.soft(body.data).toBeTruthy();

      const product = body.data.product;

      const requiredFields: requiredFieldsType = {
        name: product.name,
        description: product.description,
        id: product.id,
        price: product.variants[0]?.price,
        sku: product.variants[0]?.sku,
        stockLevel: product.variants[0]?.stockLevel,
      };

      const missingRequiredFields = [];

      for (const field in requiredFields) {
        const key = field as keyof typeof requiredFields;
        if (!requiredFields[key]) {
          missingRequiredFields.push(
            `the ${key} is missing for the product that has id: ${product.id} and name:${product.name}`,
          );
        }
      }

      console.log(missingRequiredFields);
    });
  }
});
