import axios, { type AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`,
};

const api = axios.create(config);

export default api;
