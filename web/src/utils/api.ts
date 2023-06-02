import axios, { AxiosInstance } from "axios";

const baseURL = "http://localhost:3031";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;

export const api = axiosInstance;
