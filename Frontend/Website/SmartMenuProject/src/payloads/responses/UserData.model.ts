import { TokenData } from "./TokenData.model";

export interface UserData {
    userId: number;
    roleId: number;
    token: TokenData;
  }