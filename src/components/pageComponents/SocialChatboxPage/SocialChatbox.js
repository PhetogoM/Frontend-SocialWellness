import React, { useState, useRef, useEffect } from "react";
import "./SocialChatBox.css";

const SocialChatBox = ({ currentUser = "Guest", isAdmin = false }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      user: currentUser,
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleDelete = (id, user) => {
    if (user === currentUser || isAdmin) {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } else {
      alert("⚠️ You can only delete your own messages.");
    }
  };

  const handleReport = (user) => {
    if (user !== currentUser) {
      alert(`🚨 You reported ${user}'s message. (Feature under development)`);
    }
  };

  return (
    <div className="chatbox-container">
      <h2 className="chatbox-title">💬 Social Chatbox</h2>

      <div className="chatbox-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-bubble ${
              msg.user === currentUser ? "my-message" : "other-message"
            }`}
          >
            <div className="message-header">
              <span className="user-name">
                {msg.user === currentUser ? "You" : msg.user}
              </span>
              <span className="message-time">{msg.timestamp}</span>
            </div>

            <div className="message-text">{msg.text}</div>

            <div className="message-actions">
              {(msg.user === currentUser || isAdmin) && (
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(msg.id, msg.user)}
                  title="Delete message"
                >
                  ❌
                </button>
              )}
              {msg.user !== currentUser && (
                <button
                  className="report-btn"
                  onClick={() => handleReport(msg.user)}
                  title="Report message"
                >
                  ⚠️
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
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
  );
};

export default SocialChatBox;
