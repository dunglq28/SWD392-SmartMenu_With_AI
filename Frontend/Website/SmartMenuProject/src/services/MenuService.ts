import axios from "axios";
import axiosMultipartForm from "../api/axiosMultipartForm";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import axiosAuth from "../api/axiosAuth";
import { listAddToMenu } from "../payloads/requests/createRequests.model";
import { ListData, MenuData } from "../payloads/responses/MenuData.model";
import { GetData } from "../payloads/responses/GetData.model";
import { MenuList } from "../models/Menu.model";

// Luồng tạo menu
//================================================================//
export const createMenu = async (
  menuForm: FormData
): Promise<ApiResponse<MenuData>> => {
  try {
    const res = await axiosMultipartForm.post("menus", menuForm);
    const apiResponse = res.data as ApiResponse<MenuData>;
    return apiResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as ApiResponse<MenuData>;
    }
    throw new Error("Unexpected error");
  }
};

export const createListPosition = async (
  menuList: MenuList[],
  brandId: number
): Promise<ApiResponse<ListData[]>> => {
  try {
    const listDetails = menuList.map((list) => ({
      "list-name": list.listName,
      "total-product": list.maxProduct,
    }));
    
    const res = await axiosAuth.post("list-positions/add-list-list", {
      brandId: brandId,
      listDetails: listDetails,
    });
    const apiResponse = res.data as ApiResponse<ListData[]>;
    return apiResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as ApiResponse<ListData[]>;
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
    console.log(listAddToMenu);
    
    const res = await axiosAuth.post("menu-list", {
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
export const getAllMenu = async (
  brandId: number,
  currentPage: number,
  rowsPerPage: number
): Promise<GetData<MenuData>> => {
  const res = await axiosAuth.get("menus", {
    params: {
      brandId: brandId,
      pageNumber: currentPage,
      pageSize: rowsPerPage,
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse.data as GetData<MenuData>;
};
