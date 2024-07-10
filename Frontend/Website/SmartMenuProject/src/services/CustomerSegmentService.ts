import axios from "axios";
import axiosAuth from "../api/axiosAuth";
import { ApiResponse } from "../payloads/responses/ApiResponse.model";
import { GetData } from "../payloads/responses/GetData.model";
import { CustomerSegmentData } from "../payloads/responses/CustomerSegment.model";
import { customerSegmentCreate } from "../payloads/requests/createRequests.model";
import { customerSegmentUpdate } from "../payloads/requests/updateRequests.model";

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

export const getCustomerSegmentsNoPaging = async (
  brandId: number,
): Promise<GetData<CustomerSegmentData>> => {
  const res = await axiosAuth.get("customer-segment/no-paging", {
    params: {
      brandId: brandId,
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse.data as GetData<CustomerSegmentData>;
};

export const getCustomerSegment = async (
  id: number
): Promise<ApiResponse<CustomerSegmentData>> => {
  const res = await axiosAuth.get("customer-segment/get-by-id", {
    params: {
      customerSegmentId: id,
    },
  });
  const apiResponse = res.data as ApiResponse<CustomerSegmentData>;
  return apiResponse;
};

export const createCustomerSegment = async (
  brandId: number,
  customerSegment: customerSegmentCreate,
): Promise<ApiResponse<Object>> => {
  try {
    const res = await axiosAuth.post("customer-segment", {
      segmentName: customerSegment.segmentName,
      age: customerSegment.age,
      gender: customerSegment.gender,
      session: customerSegment.session,
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

export const updateCustomerSegment = async (
  segmentId: number,
  brandId: number,
  customerSegment: customerSegmentUpdate,
): Promise<ApiResponse<Object>> => {
  try {
    const res = await axiosAuth.put(`customer-segment/update-value`, {
      segmentId: segmentId,
      segmentName: customerSegment.segmentName,
      age: customerSegment.age,
      gender: customerSegment.gender,
      session: customerSegment.session,
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

export const deleteCustomerSegment = async (
  id: number
): Promise<ApiResponse<Object>> => {
  const res = await axiosAuth.delete("customer-segment", {
    params: {
      segmentId: id,
    },
  });
  const apiResponse = res.data as ApiResponse<Object>;
  return apiResponse;
};
