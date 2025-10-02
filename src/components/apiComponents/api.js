import axios from "axios";
import { API_URL } from "./api-base-url"; // Import from your config file

const api = axios.create({
  baseURL: `${API_URL}/api/`, // Backend API base
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/* Auth API */
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post("auth/token/", { email, password });
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("auth/register/", userData);
    return response.data;
  },

  refreshToken: async () => {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) throw new Error("No refresh token found");
    const response = await api.post("auth/token/refresh/", { refresh });
    localStorage.setItem("access_token", response.data.access);
    return response.data.access;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },

  getUser: async () => {
    const response = await api.get("auth/user/");
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  },
};

// for Campus Map or other endpoints
export const getLocations = async () => {
  try {
    const res = await api.get("locations/"); // e.g., /api/locations/
    return res.data;
  } catch (err) {
    console.error("Error fetching locations:", err);
    return [];
  }
};

export default api;
