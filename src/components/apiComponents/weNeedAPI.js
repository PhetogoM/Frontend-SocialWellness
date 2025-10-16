// src/apiComponents/api.js

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  "http://127.0.0.1:8000/api";

export { API_BASE_URL };

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

  //update request status (approve/reject)
  async updateRequestStatus(id, status) {
    const res = await fetch(`${API_BASE_URL}/requests/${id}/`, {
      method: "PATCH",
      headers: jsonHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || `updateRequestStatus: ${res.status}`);
    }
    return res.json();
  },

  //delete request
  async deleteRequest(id) {
    const res = await fetch(`${API_BASE_URL}/requests/${id}/`, {
      method: "DELETE",
      headers: jsonHeaders(),
    });
    if (!res.ok && res.status !== 204) {
      const msg = await res.text();
      throw new Error(msg || `deleteRequest: ${res.status}`);
    }
    return true;
  },
};
