type forgotPasswordSuccess = {
  success: string;
};

type forgotPasswordNativeAuthStrategyError = {
  errorCode: string;
  message: string;
};

type forgotPasswordErrorResult = {
  errorCode: string;
  message: string;
};

type graphForgotPasswordResult =
  | forgotPasswordSuccess
  | forgotPasswordErrorResult
  | forgotPasswordNativeAuthStrategyError;

export type graphForgotPasswordResponse = {
  data?: {
    requestPasswordReset: graphForgotPasswordResult;
  };
  errors: {
    message: string;
  }[];
};
