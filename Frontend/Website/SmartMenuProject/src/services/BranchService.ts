import axiosAuth from "../api/axiosAuth";
import { BranchForm } from "../models/BranchForm.model";
import { branchUpdate } from "../payloads/requests/updateBranch.model";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { BranchData } from "../payloads/responses/BranchData.model";
import { GetData } from "../payloads/responses/GetData.model";

export const getBranches = async (
  id: number,
  currentPage: number,
  rowsPerPage: number,
  searchValue: string
): Promise<GetData<BranchData>> => {
  const res = await axiosAuth.get("stores", {
    params: {
      brandId: id,
      pageNumber: currentPage,
      pageSize: rowsPerPage,
      searchKey: searchValue,
    },
  });
  const apiResponse = res.data as ApiResponse<object>;
  return apiResponse.data as GetData<BranchData>;
};

export const getBranch = async (id: number): Promise<ApiResponse<BranchData>> => {
  const res = await axiosAuth.get("stores/get-by-id", {
    params: {
      id: id,
    },
  });
  const apiResponse = res.data as ApiResponse<BranchData>;
  return apiResponse;
};

export const createBranch = async (
  branchForm: BranchForm,
  id: string
): Promise<ApiResponse<Object>> => {
  const res = await axiosAuth.post("stores", {
    userId: id,
    address: `${branchForm.address.value}, Phường ${branchForm.ward.name}, Quận ${branchForm.ward.name}`,
    city: branchForm.city.name,
    brandId: branchForm.brandName.id,
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};

export const updateBranch = async (
  branch: branchUpdate
): Promise<ApiResponse<Object>> => {
  const res = await axiosAuth.put(`stores?id=${branch.id}`, {
    city: branch.city,
    address: `${branch.address}, Phường ${branch.ward}, Quận ${branch.ward}`,
    isActive: branch.isActive
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};

export const deleteBranch = async (id: number): Promise<ApiResponse<Object>> => {
  const res = await axiosAuth.delete("stores", {
    params: {
      id: id,
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};
