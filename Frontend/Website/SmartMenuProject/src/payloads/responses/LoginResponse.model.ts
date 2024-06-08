import { UserData } from "./UserData.model";

interface IDictionary<T> {
  [key: string]: T;
}

export interface LoginResponse {
  data: UserData;
  errors: IDictionary<string[]>;
  isSuccess: boolean;
  message: string;
  statusCode: number;
}
