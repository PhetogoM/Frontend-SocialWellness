import axios from "axios";
import { API_URL } from "./api-base-url.js";
import { authAPI } from "./authApi.js"; // Import authAPI

const api = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🧩 Add token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🛑 Improved: Try to refresh token before logging out
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token first
        await authAPI.refreshToken();
        
        // Retry the original request with new token
        const newToken = localStorage.getItem("access_token");
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        // If refresh fails, then logout
        console.log("Token refresh failed, logging out...");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;