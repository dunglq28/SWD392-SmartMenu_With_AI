interface IDictionary<T> {
  [key: string]: T;
}

interface LoginResponse {
  data: UserData;
  errors: IDictionary<string[]>;
  isSuccess: boolean;
  message: string;
  statusCode: number;
}
