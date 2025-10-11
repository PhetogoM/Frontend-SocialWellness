// src/api/mapsApi.js
import api from "./api.js";

// Fetch locations (example endpoint)
export const mapsAPI = {
  getLocations: async () => {
    try {
      const res = await api.get("locations/");
      return res.data;
    } catch (err) {
      console.error("Error fetching locations:", err);
      return [];
    }
  },
};
