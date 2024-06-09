import axiosAuth from "../api/axiosAuth";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { GetData } from "../payloads/responses/GetData.model";
import { ProductData } from "../payloads/responses/ProductData.model";

export const getProduct = async (
  currentPage: number,
  rowsPerPage: number
): Promise<GetData<ProductData>> => {
  const res = await axiosAuth.get("products", {
    params: {
      pageNumber: currentPage,
      pageSize: rowsPerPage
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse.data as GetData<ProductData>;
};
