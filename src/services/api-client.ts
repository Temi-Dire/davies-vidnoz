import { useClientStore } from "@/store/user-store";
import { API_URL } from "@/utils/constants";
import axios, { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";


const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor to handle 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    const { auth_token, reset } = useClientStore();
    if ( error.response && error.response?.status === 401 && auth_token ) {
      window.location.reload();
      toast.error('Please login again');
      reset();
    }
    return Promise.reject(error);
  }
);

class ApiClient<T, PostDataType> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = async (config: AxiosRequestConfig = {}) => {
    try {
      const response = await axiosInstance.get<T>(this.endpoint, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      // throw error;
    }
  };

  post = async (data: PostDataType, config: AxiosRequestConfig = {}) => {
    return axiosInstance.post<T>(this.endpoint, data, config).then((res) => res.data);
  };

  patch = async (data: PostDataType) => {
    try {
      const response = await axiosInstance.patch<T>(this.endpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  delete = async () => {
    try {
      const response = await axiosInstance.delete<T>(this.endpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
}

export default ApiClient;
