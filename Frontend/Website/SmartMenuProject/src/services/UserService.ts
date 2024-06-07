import axiosAuth from "../api/axiosAuth";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";


export const getUsers = async (): Promise<ApiResponse<Object>> => {
  const res = await axiosAuth.get("appUsers");
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};