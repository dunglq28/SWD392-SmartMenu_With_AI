import axiosAuth from "../api/axiosAuth";
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
