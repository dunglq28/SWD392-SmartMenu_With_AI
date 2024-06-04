// @ts-nocheck
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const API_HOST = import.meta.env.VITE_API_HOST;
const API_PORT = import.meta.env.VITE_API_PORT;

const BASE_URL = `${API_HOST}:${API_PORT}/api`;

const axiosLogin: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Response interceptor
axiosLogin.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },

  function (error) {        
    if (error.message === "Network Error" && !error.response) {
      toast.error("Lỗi mạng, vui lòng kiểm tra kết nối!");
    }
    if (error.response && error.response.status === 403) {
      toast.error(error.response.data.message);
    }
    if (error.response && error.response.status === 401) {
      toast.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default axiosLogin;
