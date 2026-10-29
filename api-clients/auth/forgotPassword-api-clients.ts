import { graphForgotPasswordResponse } from "../../types/api-types/forgotPassword-api";
import { ShopApiClient } from "./shop-api-client";

export class ForgotPasswordApiClient {
  constructor(private client: ShopApiClient) {}

  async ForgotPassword(email: string) {
    const query = `#graphql
  mutation ForgotPassword($email:String!){
    requestPasswordReset(emailAddress:$email){
      ... on Success{
        success
      }
      ... on NativeAuthStrategyError{
        errorCode
        message
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;
    return this.client.send<graphForgotPasswordResponse>(query, { email });
  }
}
