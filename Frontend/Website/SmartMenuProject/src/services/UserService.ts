import axiosAuth from "../api/axiosAuth";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { GetData } from "../payloads/responses/GetData.model";
import { UserData } from "../payloads/responses/UserData.model";

export const getUsers = async (
  currentPage: number,
  rowsPerPage: number
): Promise<GetData<UserData>> => {
  const res = await axiosAuth.get("app-users", {
    params: {
      pageNumber: currentPage,
      PageSize: rowsPerPage
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse.data as GetData<UserData>;
};
