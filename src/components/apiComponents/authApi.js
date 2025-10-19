import api from "./api.js";

export const authAPI = {
  // LOGIN
  login: async (email, password) => {
    const response = await api.post("auth/login/", { email, password });
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    return response.data;
  },

  // REGISTER
  register: async (userData) => {
    const response = await api.post("auth/register/", userData);
    return response.data;
  },

  // REFRESH TOKEN - IMPROVED
  refreshToken: async () => {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) {
      throw new Error("No refresh token found");
    }
    
    try {
      const response = await api.post("auth/login/refresh/", { refresh });
      localStorage.setItem("access_token", response.data.access);
      
      // If backend returns new refresh token, store it
      if (response.data.refresh) {
        localStorage.setItem("refresh_token", response.data.refresh);
      }
      
      return response.data.access;
    } catch (error) {
      // Clear tokens on refresh failure
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      throw error;
    }
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },

  // GET CURRENT USER
  getUser: async () => {
    const response = await api.get("auth/me/");
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  },
};