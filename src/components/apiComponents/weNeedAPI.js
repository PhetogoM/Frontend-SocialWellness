export const WeNeedAPI = {
  async getRequests() {
    const res = await fetch(`/api/weneed/requests`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to load requests");
    return res.json();
  },

  async getCategories() {
    const res = await fetch(`/api/weneed/categories`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to load categories");
    return res.json();
  },

  async createRequest(body) {
    const res = await fetch(`/api/weneed/requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to create request");
    return res.json();
  },

  async likeRequest(id) {
    const res = await fetch(`/api/weneed/requests/${id}/like`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to like request");
    return res.json();
  },

  async unlikeRequest(id) {
    const res = await fetch(`/api/weneed/requests/${id}/unlike`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to unlike request");
    return res.json();
  },
};
