type LoginSuccess = {
  id: number;
  identifier: string;
};

type LoginError = {
  errorCode: number;
  message: string;
};

export type GraphLoginResult = LoginSuccess | LoginError;
