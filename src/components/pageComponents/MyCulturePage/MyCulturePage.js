// src/components/pageComponents/MyCulturePage/MyCulturePage.js
import React, { useState, useEffect } from "react";
import "./MyCulturePage.css";

const SOUTH_AFRICAN_CULTURES = [
  "Zulu","Xhosa","Sotho","Tswana","Venda","Tsonga","Swati","Ndebele","Afrikaans","English"
];

const initialFeed = [
  { id: 1, culture:"Zulu", text:"We open celebrations with traditional songs.", likes:24, comments:[{user:"Lindiwe", text:"Lovely!"}], author:"Aisha", time:"2h ago", pending:true },
  { id: 2, culture:"Afrikaans", text:"Sunday braai with family.", likes:12, comments:[], author:"Johan", time:"5h ago", pending:false },
];

const initialChat = [
  { id:1, author:"Sipho", culture:"Sotho", text:"Teaching a song for Heritage Day 🎶", likes:10, time:"14:22" },
  { id:2, author:"You", culture:"Tswana", text:"Bring drums to rehearsal tomorrow?", likes:3, time:"14:25" },
];

export default function MyCulturePage({ user }) {
  const [feedPosts, setFeedPosts] = useState(initialFeed);
  const [chatMessages, setChatMessages] = useState(initialChat);
  const [showCommentBox, setShowCommentBox] = useState({});
  const [sortBy, setSortBy] = useState("most-liked");
  const [filterCulture, setFilterCulture] = useState("");

  const isStaff = user?.role?.toLowerCase() === "staff";

  // --- Chat logic ---
  const handleNewMessage = (text) => {
    if (!text.trim()) return;
    setChatMessages([
      { id: Date.now(), author: user.first_name || "You", culture: "", text, likes: 0, time: "Now" },
      ...chatMessages,
    ]);
  };

  // --- Staff functions ---
  const toggleLike = id =>
    setFeedPosts(feedPosts.map(p=>p.id===id ? {...p, likes:p.likes+1}:p));

  const toggleCommentBox = id =>
    setShowCommentBox(prev=>({...prev, [id]: !prev[id]}));

  const addComment = (id, text) => {
    if(!text.trim()) return;
    setFeedPosts(feedPosts.map(p=>
      p.id===id ? {...p, comments:[...p.comments, {user:user.first_name || "You", text}]} : p
    ));
    setShowCommentBox(prev=>({...prev, [id]: false}));
  };

  const sortedFilteredPosts = [...feedPosts]
    .filter(p => !filterCulture || p.culture===filterCulture)
    .sort((a,b)=> sortBy==="most-liked" ? b.likes-a.likes : 0);

  return (
    <div className="mc-root theme-light">
      <main className="mc-main">
        {/* Chat always visible */}
        <section className="mc-left">
          <div className="mc-right-chat">
            <div className="mc-chat-header">
              <div className="mc-chat-title">Campus Culture Chat</div>
            </div>
            <div className="mc-chat-body">
              {chatMessages.map(msg => (
                <div key={msg.id} className="mc-chat-msg">
                  <div className="mc-chat-bubble">
                    <div className="mc-chat-top">
                      <span className="mc-author">{msg.author}</span>
                      {msg.culture && <span className="mc-tag pill">{msg.culture}</span>}
                    </div>
                    <div className="mc-chat-text">{msg.text}</div>
                    <div className="mc-chat-meta">💚 {msg.likes} • {msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mc-chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                className="mc-input flex"
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleNewMessage(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>
        </section>

        {/* Staff-only compose & feed */}
        {isStaff && (
          <section className="mc-right">
            <div className="mc-compose">
              <h2 className="mc-h2">Share something about your culture</h2>
              <div className="mc-row">
                <label className="mc-label">Culture</label>
                <select className="mc-select" defaultValue="">
                  <option value="">Select culture</option>
                  {SOUTH_AFRICAN_CULTURES.map(c => <option key={c} value={c}>{c}</option>)}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mc-row">
                <label className="mc-label">Message</label>
                <textarea className="mc-textarea" placeholder="Traditions, lifestyle, customs..." rows={5}></textarea>
              </div>
              <div className="mc-actions">
                <button className="mc-btn mc-btn-primary">Submit for Approval</button>
              </div>
            </div>

            <section id="campus-feed" className="mc-post-section">
              <div className="mc-post-filters">
                <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="mc-select sm">
                  <option value="latest">Latest</option>
                  <option value="most-liked">Most liked</option>
                </select>
                <select value={filterCulture} onChange={e=>setFilterCulture(e.target.value)} className="mc-select sm">
                  <option value="">All cultures</option>
                  {SOUTH_AFRICAN_CULTURES.map(c=> <option key={c} value={c}>{c}</option>)}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mc-feed">
                {sortedFilteredPosts.map(post=>(
                  <div key={post.id} className="mc-card large-post">
                    <div className="mc-card-top">
                      <span className="mc-tag">{post.culture}</span>
                      <span className="mc-like" onClick={()=>toggleLike(post.id)}>💚 {post.likes}</span>
                      <span className="mc-comment-btn" onClick={()=>toggleCommentBox(post.id)}>💬 Comment</span>
                    </div>
                    <div className="mc-text">{post.text}</div>
                    <div className="mc-meta">— {post.author} • {post.time} {post.pending && "• Pending moderation"}</div>

                    {post.pending && (
                      <div className="mc-approval">
                        <button className="mc-btn mc-btn-danger">Reject</button>
                        <button className="mc-btn mc-btn-success">Approve</button>
                      </div>
                    )}

                    {showCommentBox[post.id] && (
                      <div className="mc-comments">
                        <input
                          type="text"
                          className="mc-input flex"
                          placeholder="Write a comment..."
                          onKeyDown={e=>{ if(e.key==="Enter") addComment(post.id, e.target.value); }}
                        />
                        {post.comments.map((c,i)=> 
                          <div key={i} className="mc-comment">
                            <span className="mc-comment-user">{c.user}:</span> {c.text}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </section>
        )}
      </main>
      <footer className="mc-footer-spacer"></footer>
    </div>
  );
}
