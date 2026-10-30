import { GraphLoginResponse } from "../../types/api-types/auth/login-api";
import { ShopApiClient } from "./shop-api-client";

export class LoginApiClient {
  constructor(private client: ShopApiClient) {}

  async login(username: string, password: string, rememberMe?: boolean) {
    const query = `
      mutation Login($username: String!, $password: String!, $rememberMe: Boolean) {
        login(username: $username, password: $password, rememberMe: $rememberMe) {
          ... on CurrentUser {
            id
            identifier
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `;
    return this.client.send<GraphLoginResponse>(query, {
      username,
      password,
      rememberMe,
    });
  }
}
