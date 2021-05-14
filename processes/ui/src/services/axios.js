import Axios from "axios";

export const apiClient = Axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:5000/api/v1",
});

apiClient.interceptors.request.use(request => {
  const accessToken = localStorage.getItem('token')
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }
  return request
})

