import axiosMultipartForm from "../api/axiosMultipartForm";
import { BrandData } from "../models/Brand.model";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";

export const createBrand = async (
  brandForm: FormData
): Promise<ApiResponse<Object>> => {
  const res = await axiosMultipartForm.post("brands/add", brandForm);
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};
