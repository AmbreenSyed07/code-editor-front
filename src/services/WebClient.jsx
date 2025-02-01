import axios from "axios";

export const apiClient = async (
  endPoint = "",
  method = "get",
  data = null,
  headers = {}
) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
  return await instance({
    url: endPoint,
    method,
    data,
    headers,
  });
};
