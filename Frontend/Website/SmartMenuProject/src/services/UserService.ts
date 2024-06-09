import axiosAuth from "../api/axiosAuth";
import { UserForm } from "../models/User.model";
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
      pageSize: rowsPerPage,
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse.data as GetData<UserData>;
};

export const createUser = async (
  user: UserForm,
  roleId: number
): Promise<ApiResponse<Object>> => {
  const res = await axiosAuth.post("app-users", {
    userName: user.userName.value,
    fullname: user.fullName.value,
    phone: user.phoneNumber.value,
    dob: user.DOB.value ? user.DOB.value.toISOString().split("T")[0] : "",
    gender: user.gender.value,
    roleId: roleId,
    isActive: user.isActive.value === 1 ? true : false,
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};

export const deleteUser = async (id: number): Promise<ApiResponse<Object>> => {
  const res = await axiosAuth.delete("app-users", {
    params: {
      id: id,
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};
