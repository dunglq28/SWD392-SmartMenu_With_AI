import axiosAuth from "../api/axiosAuth";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { CategoryData } from "../payloads/responses/CategoryData.model";
import { GetData } from "../payloads/responses/GetData.model";

export const getCategory = async (
    brandId: number,
    currentPage: number,
    rowsPerPage: number,
    searchValue: string
  ): Promise<GetData<CategoryData>> => {
    const res = await axiosAuth.get("categories", {
      params: {
        brandId: brandId,
        pageNumber: currentPage,
        pageSize: rowsPerPage,
        searchKey: searchValue
      },
    });
    const apiResponse = res.data as ApiResponse<Object>;
    return apiResponse.data as GetData<CategoryData>;
  };