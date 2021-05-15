import Axios from "axios";

export const apiClient = Axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? "http://192.168.0.196:5000/api/v1",
});

apiClient.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});
