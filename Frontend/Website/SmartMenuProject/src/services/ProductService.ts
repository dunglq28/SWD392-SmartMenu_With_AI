import axiosAuth from "../api/axiosAuth";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { GetData } from "../payloads/responses/GetData.model";
import { ProductData } from "../payloads/responses/ProductData.model";

export const getProduct = async (
  brandId: number,
  currentPage: number,
  rowsPerPage: number,
  searchValue: string
): Promise<GetData<ProductData>> => {
  const res = await axiosAuth.get("products", {
    params: {
      brandId: brandId,
      pageNumber: currentPage,
      pageSize: rowsPerPage,
      searchKey: searchValue
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse.data as GetData<ProductData>;
};
