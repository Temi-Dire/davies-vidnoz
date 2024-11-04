import { API_URL } from "@/utils/constants";
import axios, { AxiosRequestConfig } from "axios";


const axiosInstance = axios.create({
  baseURL: API_URL,
});

class ApiClient<T> {
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

  post = async (data: any, config: AxiosRequestConfig = {}) => {
    return axiosInstance.post<T>(this.endpoint, data, config).then((res) => res.data);
  };

  patch = async (data: any) => {
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
