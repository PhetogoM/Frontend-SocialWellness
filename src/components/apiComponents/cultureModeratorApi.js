// src/services/cultureModeratorApi.js
import api from "./api.js";

export const cultureModeratorAPI = {
  /**
   * Fetch all posts (approved, rejected, or pending)
   * 
   * @param {string} status - filter posts by status: "approved", "rejected", or "pending"
   * @returns Promise with all posts
   */
  getAllPosts: (status = "pending") => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    return api.get(`culture-posts/?${params.toString()}`);
  },

  /**
   * Approve a user-submitted post
   * 
   * @param {number} postId - ID of the post to approve
   * @returns Promise with updated post data
   */
  approvePost: (postId) => {
    return api.post(`culture-posts/${postId}/approve/`);
  },

  /**
   * Reject a user-submitted post
   * 
   * @param {number} postId - ID of the post to reject
   * @returns Promise with updated post data
   */
  rejectPost: (postId) => {
    return api.post(`culture-posts/${postId}/reject/`);
  },

  /**
   * Fetch all available cultures
   */
  getCultures: () => api.get("cultures/"),

  /**
   * Fetch all users (to show post authors)
   */
  getUsers: () => api.get("users/"),
};
