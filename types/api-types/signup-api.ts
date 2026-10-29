type signupSuccess = {
  success: string;
};

type signupMissingPasswordError = {
  errorCode: string;
  message: string;
};

type signupPasswordVAlidationError = {
  errorCode: string;
  message: string;
  validationErrorMessage: string;
};

export type signupNativeAuthStrategyError = {
  errorCode: string;
  message: string;
};

export type graphSignupResult =
  | signupSuccess
  | signupMissingPasswordError
  | signupPasswordVAlidationError
  | signupNativeAuthStrategyError;

export type graphSignupResponse = {
  data?: {
    registerCustomerAccount: graphSignupResult;
  };
  errors?: {
    message: string;
  };
};
