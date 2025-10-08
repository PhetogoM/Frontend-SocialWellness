// src/apiComponents/chatApi.js
import api from "./api";

export const chatAPI = {
  // Get all messages
  getMessages: async () => {
    const response = await api.get("chat/messages/");
    return response.data;
  },

  // Send a message
  sendMessage: async (messageText) => {
    const response = await api.post("chat/messages/", {
      message_text: messageText, // ✅ matches Django field
    });
    return response.data;
  },

  // Delete message
  deleteMessage: async (id) => {
    const response = await api.delete(`chat/messages/${id}/`);
    return response.data;
  },

  // Report message
  reportMessage: async (id, reason = "Inappropriate") => {
    const response = await api.patch(`chat/messages/${id}/report/`, {
      report: true,
    });
    return response.data;
  },
};
