import axios from "axios";
import config from "../config";

const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL + "/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use((response) => {
  return response;
});

export async function get(url, config = {}) {
  return await axiosInstance
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosInstance
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosInstance
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosInstance
    .delete(url, { ...config })
    .then((response) => response.data);
}
