import axiosAuth from "../api/axiosAuth";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { CategoryData } from "../payloads/responses/CategoryData.model";
import { GetData } from "../payloads/responses/GetData.model";

export const getCategoryByBrandId = async(
    Id: number
): Promise<GetData<CategoryData>> => {
    const res = await axiosAuth.get("categories/get-by-brand-id", {
        params: {
          brandId: Id
        },
      });
      const apiResponse = res.data as ApiResponse<Object>;
      return apiResponse.data as GetData<CategoryData>;
}