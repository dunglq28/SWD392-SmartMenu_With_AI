import axios from "axios";
import axiosMultipartForm from "../api/axiosMultipartForm";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import axiosAuth from "../api/axiosAuth";
import { listAddToMenu } from "../payloads/requests/createRequests.model";

// Luồng tạo menu
//================================================================//
export const createMenu = async (
  menuForm: FormData
): Promise<ApiResponse<Object>> => {
  try {
    const res = await axiosMultipartForm.post("menus", menuForm);
    const apiResponse = res.data as ApiResponse<Object>;
    return apiResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as ApiResponse<Object>;
    }
    throw new Error("Unexpected error");
  }
};

export const createListPosition = async (
  totalProducts: number,
  brandId: number
): Promise<ApiResponse<Object>> => {
  try {
    const res = await axiosAuth.post("list-positions", {
      totalProduct: totalProducts,
      brandId: brandId,
    });
    const apiResponse = res.data as ApiResponse<Object>;
    return apiResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as ApiResponse<Object>;
    }
    throw new Error("Unexpected error");
  }
};

export const createMenuList = async (
  menuId: number,
  brandId: number,
  listAddToMenu: listAddToMenu[]
): Promise<ApiResponse<Object>> => {
  try {
    const res = await axiosAuth.post("list-positions", {
      menuId: menuId,
      brandId: brandId,
      listAddToMenu: listAddToMenu,
    });
    const apiResponse = res.data as ApiResponse<Object>;
    return apiResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as ApiResponse<Object>;
    }
    throw new Error("Unexpected error");
  }
};

export const createProductList = async (
  productId: number,
  brandId: number,
  listId: number,
  indexInList: number
): Promise<ApiResponse<Object>> => {
  try {
    const res = await axiosAuth.post("list-positions", {
      productId: productId,
      brandId: brandId,
      listId: listId,
      indexInList: indexInList,
    });
    const apiResponse = res.data as ApiResponse<Object>;
    return apiResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as ApiResponse<Object>;
    }
    throw new Error("Unexpected error");
  }
};
//================================================================//
