import axios, { AxiosInstance } from "axios";

const baseURL = "https://api.createburger.com.br";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("tokenBurger");
  // console.log("CADE DO LOCALSTORAGE", tokenBurger);
  const strSemAspas = token?.replace(/"/g, "");
  // console.log("CADE SEM ASPAS", strSemAspas);

  if (token) {
    config.headers["Authorization"] = `Bearer ${strSemAspas}`;
  }
  return config;
});

export default axiosInstance;

export const api = axiosInstance;
