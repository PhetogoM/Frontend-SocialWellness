// src/services/cultureApi.js
import api from './api.js'; // Correct import path

// API methods using your existing axios instance
export const cultureAPI = {
  // Posts
  getPosts: (filters = {}) => {
    const params = new URLSearchParams();
    
    // Add filters to params
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });
    
    return api.get(`posts?${params.toString()}`); // Removed leading slash
  },
  
  createPost: (postData) => api.post('posts', postData), // Removed leading slash
  
  likePost: (postId) => api.post(`posts/${postId}/like`), // Removed leading slash
  
  addComment: (postId, comment) => api.post(`posts/${postId}/comments`, { content: comment }), // Removed leading slash
  
  // Moderation endpoints (for staff only)
  approvePost: (postId) => api.put(`posts/${postId}/approve`), // Removed leading slash
  
  rejectPost: (postId) => api.put(`posts/${postId}/reject`), // Removed leading slash
  
  // Cultures
  getCultures: () => api.get('cultures'), // Removed leading slash
  
  // User-specific endpoints
  getUserPosts: (userId) => api.get(`users/${userId}/posts`), // Removed leading slash
};