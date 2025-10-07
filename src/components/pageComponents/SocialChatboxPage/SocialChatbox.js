import React, { useState } from "react";
import "./SocialChatBox.css";

const SocialChatBox = ({ currentUser = "Guest", isAdmin = false }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: currentUser,
      text: "Hey everyone! 👋",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    {
      id: 2,
      user: "Alex",
      text: "Hi there! Nice to see you online 😄",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessage = {
      id: Date.now(),
      user: currentUser,
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  const handleDelete = (id, user) => {
    if (user === currentUser || isAdmin) {
      setMessages(messages.filter((msg) => msg.id !== id));
    } else {
      alert("You can only delete your own messages.");
    }
  };

  const handleReport = (user) => {
    if (user !== currentUser) {
      alert(`You reported ${user}'s message. (Feature under development)`);
    }
  };

  return (
    <div className="chatbox-container">
      <h1 className="chatbox-title"> Social Chatbox</h1>
      <p className="chatbox-subtitle">
        Connect and share your thoughts with others in real-time.
      </p>

      <div className="chatbox-wrapper">
        <div className="chatbox-messages">
          {messages.length === 0 ? (
            <p className="no-messages">
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg) => (
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
                    >
                      ❌
                    </button>
                  )}
                  {msg.user !== currentUser && (
                    <button
                      className="report-btn"
                      onClick={() => handleReport(msg.user)}
                    >
                      ⚠️
                    </button>
                  )}
                </div>
              </div>
            ))
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
