// src/apiComponents/chatApi.js
import api from "./api.js";

export const chatAPI = {
  // Get all messages
  getMessages: async () => {
    const response = await api.get("chat/messages/");
    return response.data;
  },

  // Send a message
  sendMessage: async (messageText) => {
    const response = await api.post("chat/messages/", {
      message_text: messageText,
    });
    return response.data;
  },

  // Delete a message
  deleteMessage: async (id) => {
    const response = await api.delete(`chat/messages/${id}/`);
    return response.data;
  },

  // Get current logged-in user
  getCurrentUser: async () => {
    const response = await api.get("me/"); // MeView endpoint
    return response.data;
  },
};
