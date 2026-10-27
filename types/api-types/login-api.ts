type LoginSuccess = {
  id: number;
  identifier: string;
};

type LoginError = {
  errorCode: string;
  message: string;
};

type GraphLoginResult = LoginSuccess | LoginError;

export type GraphLoginResponse = {
  data?: {
    login: GraphLoginResult;
  };
  errors?: {
    message: string;
  }[];
};
