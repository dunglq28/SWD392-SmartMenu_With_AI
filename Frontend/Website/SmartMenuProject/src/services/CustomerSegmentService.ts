import axios from "axios";
import axiosAuth from "../api/axiosAuth";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { GetData } from "../payloads/responses/GetData.model";
import { CustomerSegmentData } from "../payloads/responses/CustomerSegment.model";

export const getCustomerSegments = async (
  brandId: number,
  currentPage: number,
  rowsPerPage: number,
  searchValue: string
): Promise<GetData<CustomerSegmentData>> => {
  const res = await axiosAuth.get("customer-segment", {
    params: {
      brandId: brandId,
      pageNumber: currentPage,
      pageSize: rowsPerPage,
      searchKey: searchValue,
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse.data as GetData<CustomerSegmentData>;
};

// export const getCategory = async (
//   id: number
// ): Promise<ApiResponse<CategoryData>> => {
//   const res = await axiosAuth.get("categories/get-by-id", {
//     params: {
//       id: id,
//     },
//   });
//   const apiResponse = res.data as ApiResponse<CategoryData>;
//   return apiResponse;
// };

// export const createCategory = async (
//   cateName: string,
//   brandId: number
// ): Promise<ApiResponse<Object>> => {
//   try {
//     const res = await axiosAuth.post("categories", {
//       categoryName: cateName,
//       brandId: brandId,
//     });
//     const apiResponse = res.data as ApiResponse<Object>;
//     return apiResponse;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       return error.response.data as ApiResponse<Object>;
//     }
//     throw new Error("Unexpected error");
//   }
// };

// export const updateCategory = async (
//   id: number,
//   brandId: number,
//   cateName: string
// ): Promise<ApiResponse<Object>> => {
//   try {
//     const res = await axiosAuth.put(`categories?id=${id}`, {
//       categoryName: cateName,
//       brandId: brandId,
//     });
//     const apiResponse = res.data as ApiResponse<Object>;
//     return apiResponse;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       return error.response.data as ApiResponse<Object>;
//     }
//     throw new Error("Unexpected error");
//   }
// };

// export const deleteCategory = async (
//   id: number
// ): Promise<ApiResponse<Object>> => {
//   const res = await axiosAuth.delete("categories", {
//     params: {
//       id: id,
//     },
//   });
//   const apiResponse = res.data as ApiResponse<Object>;
//   return apiResponse;
// };
