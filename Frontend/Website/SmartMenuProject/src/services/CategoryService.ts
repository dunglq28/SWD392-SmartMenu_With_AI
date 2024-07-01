import axiosAuth from "../api/axiosAuth";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { CategoryData } from "../payloads/responses/CategoryData.model";
import { GetData } from "../payloads/responses/GetData.model";

//cái này để bỏ vào selection lúc add product
export interface CategoryDataSelection {
  categoryId:number,
  categoryCode:string,
  categoryName:string
}
export const getCategoryByBrandId = async(
    Id: number
): Promise<GetData<CategoryDataSelection>> => {
    const res = await axiosAuth.get("categories/get-by-brand-id", {
        params: {
          brandId: Id
        },
      });
      const apiResponse = res.data as ApiResponse<Object>;
      return apiResponse.data as GetData<CategoryDataSelection>;
}
//===========================================

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
