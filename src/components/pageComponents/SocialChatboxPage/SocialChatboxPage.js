import React, { useState, useEffect } from "react";
import "./SocialChatbox.css";
import { chatAPI } from "../../apiComponents/chatApi.js";

const SocialChatBox = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load current user + messages
  useEffect(() => {
    const fetchUserAndMessages = async () => {
      try {
        // 1️⃣ Get messages
        const data = await chatAPI.getMessages();
        const sorted = Array.isArray(data)
          ? data.sort((a, b) => new Date(a.date_created) - new Date(b.date_created))
          : [];
        setMessages(sorted);
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    };

    fetchUserAndMessages();
  }, []);

  // Send message
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

  // Delete message
  const handleDelete = async (msg) => {
    if (!msg.is_current_user && !msg.is_admin_user) {
      alert("You can only delete your own messages!");
      return;
    }

    try {
      await chatAPI.deleteMessage(msg.id);
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Failed to delete message.");
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

              const isMine = msg.is_current_user;
              const isAdminUser = msg.is_admin_user;

              return (
                <div
                  key={msg.id}
                  className={`message-bubble ${
                    isMine ? "my-message" : isAdminUser ? "admin-message" : "other-message"
                  }`}
                >
                  <div className="message-header">
                    <span className="user-name">
                      {isMine ? "You" : msg.username}
                    </span>
                    <span className="message-time">
                      {msg.date_created
                        ? new Date(msg.date_created).toLocaleTimeString()
                        : "Just now"}
                    </span>
                  </div>

                  <div className="message-text">{msg.message_text}</div>

                  <div className="message-actions">
                    {(isMine || isAdminUser) && (
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(msg)}
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
