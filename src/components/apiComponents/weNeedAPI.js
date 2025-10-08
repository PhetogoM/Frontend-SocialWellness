const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  "http://127.0.0.1:8000/api";

const jsonHeaders = () => {
  const token = localStorage.getItem("access_token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export const WeNeedAPI = {
  async getApprovedRequests() {
    const res = await fetch(`${API_BASE_URL}/requests/?status=approved`, {
      headers: jsonHeaders(),
    });
    if (!res.ok) throw new Error(`getApprovedRequests: ${res.status}`);
    return res.json();
  },

  async getCategories() {
    const res = await fetch(`${API_BASE_URL}/requests/categories/`, {
      headers: jsonHeaders(),
    });
    if (!res.ok) throw new Error(`getCategories: ${res.status}`);
    return res.json();
  },

  async createRequest({ category, text }) {
    const res = await fetch(`${API_BASE_URL}/requests/`, {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({ category, text }),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || `createRequest: ${res.status}`);
    }
    return res.json();
  },

  async likeRequest(id) {
    const res = await fetch(`${API_BASE_URL}/requests/${id}/like/`, {
      method: "POST",
      headers: jsonHeaders(),
    });
    if (!res.ok) throw new Error(`likeRequest: ${res.status}`);
    return res.text();
  },

  async unlikeRequest(id) {
    const res = await fetch(`${API_BASE_URL}/requests/${id}/like/`, {
      method: "DELETE",
      headers: jsonHeaders(),
    });
    if (!res.ok) throw new Error(`unlikeRequest: ${res.status}`);
    return res.text();
  },
};
