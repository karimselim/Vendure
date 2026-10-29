import { graphSignupResponse } from "../types/api-types/signup-api";
import { ShopApiClient } from "./shop-api-client";

export class SignupApiClient {
  constructor(private client: ShopApiClient) {}

  async signup(
    emailAddress: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    password?: string,
  ) {
    const query = `#graphql
    mutation Signup($emailAddress:String!,$firstName:String,$lastName:String,$phoneNumber:String,$password:String){
      registerCustomerAccount(input:{emailAddress:$emailAddress,firstName:$firstName,lastName:$lastName,phoneNumber:$phoneNumber,password:$password}){
        ... on Success{
          success
        }
        ... on MissingPasswordError{
          errorCode
          message
        }
        ... on PasswordValidationError{
          errorCode
          message
          validationErrorMessage
        }
        ... on NativeAuthStrategyError{
          errorCode
          message
        }
      }
    }
    `;
    return this.client.send<graphSignupResponse>(query, {
      emailAddress,
      firstName,
      lastName,
      phoneNumber,
      password,
    });
  }
}
