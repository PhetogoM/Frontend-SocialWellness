// src/services/cultureApi.js
import api from './api.js';

export const cultureAPI = {
  // Posts
  getPosts: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });
    return api.get(`culture-posts/?${params.toString()}`);
  },

  createPost: (postData) => api.post('culture-posts/', postData),

  // Likes
  likePost: (postId) => api.post('culture-user-post/like/', { post: postId }),
  
  // Approve/Reject (send post ID and action)
  approvePost: (postId) => api.patch('culture-post-rejects/', { post: postId, action: 'approve' }),
  rejectPost: (postId) => api.patch('culture-post-rejects/', { post: postId, action: 'reject' }),

  // Cultures
  getCultures: () => api.get('cultures/'),

  // User-specific posts
  getUserPosts: (userId) => api.get(`users/${userId}/posts/`),

  getUsers: () => api.get('users/'),
};
