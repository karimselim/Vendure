import { APIRequestContext } from "@playwright/test";

export class ShopApiClient {
  constructor(
    private request: APIRequestContext,
    private baseUrl = "http://localhost:3000/shop-api",
  ) {}

  async send<T>(
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<{ status: number; body: T }> {
    const response = await this.request.post(this.baseUrl, {
      data: { query, variables },
    });
    const body = await response.json();
    return { status: response.status(), body };
  }
}
