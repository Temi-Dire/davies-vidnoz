import { API_URL } from "@/utils/constants";
import axios from "axios";
import { useClientStore } from "@/store/user-store";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Token expired or forbidden
      const { reset } = useClientStore.getState(); // Access Zustand store
      reset(); // Clear authentication state
      // localStorage.clear();  Clear local storage
      window.location.reload(); // Refresh the page
    }
    return Promise.reject(error);
  }
);

class ApiClient<T, PostDataType> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  private shouldValidateToken(): boolean {
    // Skip token validation for authentication-related endpoints
    const excludedEndpoints = ["/api/auth/login/", "/api/auth/register/", "/api/auth/google-login/"];
    return !excludedEndpoints.includes(this.endpoint);
  }

  private hasValidToken(): boolean {
    const { auth } = useClientStore.getState();
    return !!auth?.access_token; // Check if token exists and is non-empty
  }

  get = async (config = {}) => {
    if (this.shouldValidateToken() && !this.hasValidToken()) {
      console.warn("No valid token. Skipping API call.");
      return Promise.reject(new Error("No valid token."));
    }
    try {
      const response = await axiosInstance.get<T>(this.endpoint, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  post = async (data: PostDataType, config = {}) => {
    if (this.shouldValidateToken() && !this.hasValidToken()) {
      console.warn("No valid token. Skipping API call.");
      return Promise.reject(new Error("No valid token."));
    }
    try {
      return axiosInstance.post<T>(this.endpoint, data, config).then((res) => res.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  patch = async (data: PostDataType) => {
    if (this.shouldValidateToken() && !this.hasValidToken()) {
      console.warn("No valid token. Skipping API call.");
      return Promise.reject(new Error("No valid token."));
    }
    try {
      const response = await axiosInstance.patch<T>(this.endpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error patching data:", error);
      throw error;
    }
  };

  delete = async () => {
    if (this.shouldValidateToken() && !this.hasValidToken()) {
      console.warn("No valid token. Skipping API call.");
      return Promise.reject(new Error("No valid token."));
    }
    try {
      const response = await axiosInstance.delete<T>(this.endpoint);
      return response.data;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  };
}

export default ApiClient;
