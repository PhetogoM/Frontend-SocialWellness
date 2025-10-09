// src/components/pageComponents/SocialChatboxPage/SocialChatBox.js
import React, { useState, useEffect } from "react";
import "./SocialChatbox.css";
import { chatAPI } from "../../apiComponents/chatApi.js";

const SocialChatBox = ({ currentUser = { username: "Guest" }, isAdmin = false }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load messages from backend on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await chatAPI.getMessages();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchMessages();
  }, []);

  // Send message to backend
  const handleSend = async () => {
    if (input.trim() === "") return;

    try {
      const newMsg = await chatAPI.sendMessage(input.trim());
      setMessages((prev) => [...prev, newMsg]);
      setInput("");
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message.");
    }
  };

  // Delete message (admin or owner)
  const handleDelete = async (id, user) => {
    if (user === currentUser.username || isAdmin) {
      try {
        await chatAPI.deleteMessage(id);
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      } catch (err) {
        console.error("Error deleting message:", err);
        alert("Failed to delete message.");
      }
    } else {
      alert("You can only delete your own messages.");
    }
  };

  return (
    <div className="chatbox-container">
      <h1 className="chatbox-title">Social Chatbox</h1>
      <p className="chatbox-subtitle">
        Connect and share your thoughts with others in real time.
      </p>

      <div className="chatbox-wrapper">
        <div className="chatbox-messages">
          {messages.length === 0 ? (
            <p className="no-messages">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg) => {
              if (!msg || typeof msg.message_text !== "string") return null;

              // Safe username fallback
              const msgUsername = msg.username || "";
              const isMine = msgUsername === currentUser.username;
              const isAdminUser = msgUsername.toLowerCase() === "admin";

              return (
                <div
                  key={msg.id}
                  className={`message-bubble ${
                    isMine
                      ? "my-message"
                      : isAdminUser
                      ? "admin-message"
                      : "other-message"
                  }`}
                >
                  <div className="message-header">
                    <span className="user-name">
                      {isMine ? "You" : msg.user}
                      {isAdminUser && <span className="admin-badge">Admin</span>}
                    </span>
                    <span className="message-time">{msg.date_created || "Just now"}</span>
                  </div>

                  <div className="message-text">{msg.message_text}</div>

                  <div className="message-actions">
                    {(isMine || isAdmin) && (
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(msg.id, msgUsername)}
                      >
                        ❌
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="chatbox-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send ➤</button>
        </div>
      </div>
    </div>
  );
};

export default SocialChatBox;
