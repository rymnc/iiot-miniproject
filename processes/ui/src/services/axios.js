import Axios from "axios";

export const apiClient = Axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:5000/api/v1",
});
