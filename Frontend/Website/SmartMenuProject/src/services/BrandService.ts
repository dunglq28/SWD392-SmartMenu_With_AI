import axiosAuth from "../api/axiosAuth";
import axiosMultipartForm from "../api/axiosMultipartForm";
import { brandUpdate } from "../payloads/requests/updateBrand.model";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { BrandData } from "../payloads/responses/BrandData.model";
import { GetData } from "../payloads/responses/GetData.model";

export const getBrands = async (
  currentPage: number,
  rowsPerPage: number
): Promise<GetData<BrandData>> => {
  const res = await axiosAuth.get("brands", {
    params: {
      pageNumber: currentPage,
      pageSize: rowsPerPage,
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse.data as GetData<BrandData>;
};

export const createBrand = async (
  brandForm: FormData
): Promise<ApiResponse<Object>> => {
  const res = await axiosMultipartForm.post("brands/add", brandForm);
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};

export const updateBrand = async (
  brand: brandUpdate
): Promise<ApiResponse<Object>> => {
  const res = await axiosMultipartForm.put("brands/update", brand);
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};

export const deleteBrand = async (id: number): Promise<ApiResponse<Object>> => {
  const res = await axiosAuth.delete("brands/delete", {
    params: {
      id: id,
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};
