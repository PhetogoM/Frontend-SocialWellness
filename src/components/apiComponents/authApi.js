// src/api/authApi.js
import api from "./api.js";

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post("auth/login/", { email, password });
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
    const response = await api.post("auth/login/refresh/", { refresh });
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
