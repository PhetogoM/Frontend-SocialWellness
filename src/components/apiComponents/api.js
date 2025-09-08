// src/api.js
import axios from "axios";
import { API_URL } from "./api-base-url";

const api = axios.create({
  baseURL: `${API_URL}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
