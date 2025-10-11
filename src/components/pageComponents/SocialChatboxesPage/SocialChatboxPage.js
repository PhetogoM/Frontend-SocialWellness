// src/components/social/SocialChatbox.js
import React, { useState } from "react";
import "./SocialChatboxPage.css";

const SocialChatbox = ({ roomName, isModerator = false }) => {
  const [messages, setMessages] = useState([]); // approved messages
  const [pendingMessages, setPendingMessages] = useState([]); // messages awaiting moderation
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("Anonymous");

  // --- Student submits a message (goes to pending) ---
  const handleSend = () => {
    if (input.trim() === "") return;
    const newMsg = {
      id: Date.now(),
      user: username,
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    if (isModerator) {
      // moderators can post directly
      setMessages([...messages, newMsg]);
    } else {
      setPendingMessages([...pendingMessages, newMsg]);
    }
    setInput("");
  };

  // --- Approve pending message ---
  const approveMessage = (id) => {
    const approved = pendingMessages.find((msg) => msg.id === id);
    setMessages([...messages, approved]);
    setPendingMessages(pendingMessages.filter((msg) => msg.id !== id));
  };

  // --- Reject pending message ---
  const rejectMessage = (id) => {
    setPendingMessages(pendingMessages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="chatbox-container">
      <h2 className="chatbox-title">{roomName}</h2>

      {/* Username input */}
      <div className="username-field">
        <label>Username: </label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      {/* Approved messages */}
      <div className="chatbox-messages">
        {messages.length === 0 && <p className="no-messages">No messages yet.</p>}
        {messages.map((msg) => (
          <div key={msg.id} className="chat-message">
            <div className="msg-header">
              <strong>{msg.user}</strong>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
            <div className="msg-body">{msg.text}</div>
          </div>
        ))}
      </div>

      {/* Input box */}
      {!isModerator && (
        <div className="chatbox-input">
          <input
            type="text"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      )}

      {/* Moderator panel */}
      {isModerator && (
        <div className="chatbox-pending">
          <h3>Pending Messages</h3>
          {pendingMessages.length === 0 && <p>No pending messages.</p>}
          {pendingMessages.map((msg) => (
            <div key={msg.id} className="pending-message">
              <span>
                <strong>{msg.user}:</strong> {msg.text}
              </span>
              <div className="pending-buttons">
                <button onClick={() => approveMessage(msg.id)}>Approve</button>
                <button onClick={() => rejectMessage(msg.id)}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialChatbox;
