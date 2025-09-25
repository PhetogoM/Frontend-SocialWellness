// src/api.js
import axios from "axios";
import { API_URL } from "./api-base-url"; // Import from your config file

const api = axios.create({
  baseURL: `${API_URL}/api/`, // Adjust to match your backend endpoints
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

// --- Add this function for Campus Map ---
export const getLocations = async () => {
  try {
    const res = await api.get("locations/"); // your endpoint, e.g., /api/locations/
    return res.data;
  } catch (err) {
    console.error("Error fetching locations:", err);
    return []; // Return empty array if error
  }
};

export default api;
