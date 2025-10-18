import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./SocialChatbox.css";
import { chatAPI } from "../../apiComponents/chatApi.js";

const SocialChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load messages
  useEffect(() => {
    const fetchUserAndMessages = async () => {
      try {
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

  // 🌐 SEO Metadata
  const seoTitle = "Social Chatbox | Connect and Share Ideas in Real-Time";
  const seoDescription =
    "Join the Social Chatbox to connect with other users, share thoughts, and engage in real-time conversations. Stay informed and build your community.";
  const seoKeywords =
    "social chat, chatbox, real-time messaging, community, messaging app, online chat, user interaction, Unipath";

  return (
    <div className="chatbox-container">
      {/* 🧠 SEO Metadata */}
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/social-chatbox" />
        <meta
          property="og:image"
          content="https://yourdomain.com/assets/chatbox-banner.jpg"
        />
      </Helmet>

      <h1 className="chatbox-title">Social Chatbox</h1>
      <p className="chatbox-subtitle">
        Connect and share your thoughts with others in real time.
      </p>

      <div className="chatbox-wrapper">
        <div className="chatbox-messages">
          {messages.length === 0 ? (
            <p className="no-messages">No messages yet. Start the conversation!</p>
          ) : (
            (() => {
              let lastDate = null;
              return messages.map((msg) => {
                if (!msg || typeof msg.message_text !== "string") return null;

                const msgDate = new Date(msg.date_created).toDateString();
                const isMine = msg.is_current_user;
                const isAdminUser = msg.is_admin_user;

                const showDivider = lastDate !== msgDate;
                lastDate = msgDate;

                return (
                  <React.Fragment key={msg.id}>
                    {showDivider && (
                      <div className="chat-date-divider">
                        {msgDate === new Date().toDateString()
                          ? "Today"
                          : msgDate === new Date(Date.now() - 86400000).toDateString()
                          ? "Yesterday"
                          : msgDate}
                      </div>
                    )}

                    <div
                      className={`message-bubble ${
                        isMine ? "my-message" : isAdminUser ? "admin-message" : "other-message"
                      }`}
                    >
                      <div className="message-header">
                        <span className="user-name">{isMine ? "You" : msg.username}</span>
                        <span className="message-time">
                          {msg.date_created
                            ? new Date(msg.date_created).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                            : "Just now"}
                        </span>
                      </div>

                      <div className="message-text">{msg.message_text}</div>

                      <div className="message-actions">
                        {(isMine || isAdminUser) && (
                          <button className="delete-btn" onClick={() => handleDelete(msg)}>
                            ❌
                          </button>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                );
              });
            })()
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
