// apiClient.ts (common Axios instance setup)

import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import cookie from "js-cookie";

// Function to retrieve the authorization token (implement according to your needs)
const getToken = (): string | null => {
  // Replace this with your actual token retrieval logic
  return cookie.get("token") || null;
};

const request: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default request;
