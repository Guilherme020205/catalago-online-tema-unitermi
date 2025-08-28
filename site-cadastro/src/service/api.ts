import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",  
});

// interceptador para incluir o token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
