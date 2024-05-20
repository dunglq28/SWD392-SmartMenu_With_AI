// @ts-nocheck
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { WEB_API_URL } from "../config";
import { toast } from "react-toastify";

const BASE_URL = WEB_API_URL + "/api";

const axiosAuth: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add a Request interceptor
axiosAuth.interceptors.request.use(
	function (config: InternalAxiosRequestConfig) {
		// Initialize header if not already defined
		config.headers = config.headers || {};

		const accessToken = localStorage.getItem("token");
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// Add Response interceptor
axiosAuth.interceptors.response.use(
	function (response: AxiosResponse) {
		return response;
	},

	function (error) {
		if (error.message === "Network Error" && !error.response) {
			toast.error("Network Error, Please check connection!");
		}
		if (error.response && error.response.status === 401) {
			toast.error("You not allow to access this page");
		}
		return Promise.reject(error);
	}
);

export default axiosAuth;
