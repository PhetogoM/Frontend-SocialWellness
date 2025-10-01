// components/pageComponents/MyCulturePage/MyCulturePageUser.js
import React, { useState, useEffect, useCallback } from "react";
import { cultureAPI } from "../../apiComponents/cultureApi.js";
import "./MyCulturePage.css";

const CULTURE_COLORS = {
  Zulu: "#e63946",
  Xhosa: "#1d3557",
  Afrikaans: "#457b9d",
  Sotho: "#2a9d8f",
  Tswana: "#f4a261",
  Venda: "#8d99ae",
  Ndebele: "#e76f51",
  Swazi: "#6a4c93",
  Tsonga: "#118ab2",
  default: "#333333"
};

const MyCulturePageUser = ({ user }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("most-liked");
  const [posts, setPosts] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [selectedCulture, setSelectedCulture] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const getCultureColor = (cultureName) => CULTURE_COLORS[cultureName] || CULTURE_COLORS.default;

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [postsResponse, culturesResponse] = await Promise.all([
        cultureAPI.getPosts({ status: "approved" }),
        cultureAPI.getCultures()
      ]);
      setPosts(postsResponse.data);
      setCultures(culturesResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handlePostSubmit = async () => {
    if (!newPost || !selectedCulture) {
      setError("Please select a culture and write a message");
      return;
    }
    try {
      setPosting(true);
      setError("");
      const response = await cultureAPI.createPost({
        culture: selectedCulture,
        content: newPost
      });
      setPosts([response.data, ...posts]);
      setNewPost("");
      setSelectedCulture("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post.");
    } finally {
      setPosting(false);
    }
  };

  const toggleLike = async (postId) => {
    try {
      const response = await cultureAPI.likePost(postId);
      setPosts(posts.map(post => post.id === postId ? response.data : post));
    } catch (err) { console.error(err); }
  };

  const toggleComments = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, showComments: !post.showComments } : post));
  };

  const addComment = async (postId, comment) => {
    if (!comment) return;
    try {
      const response = await cultureAPI.addComment(postId, comment);
      setPosts(posts.map(post => post.id === postId ? response.data : post));
    } catch (err) { console.error(err); }
  };

  const filteredPosts = posts
    .filter(post => selectedFilter === "all" || post.culture === selectedFilter)
    .sort((a, b) => sortBy === "most-liked" ? b.likes - a.likes : new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) return <div className="loading">Loading posts...</div>;

  return (
    <div className="my-culture-container user-version">
      <h1 className="page-title">MyCulture</h1>
      <p className="page-subtitle">Share and explore cultural posts</p>
      {error && <div className="error">{error}</div>}

      <div className="page-layout">
        {/* Posts Section */}
        <div className="posts-section">
          <div className="posts-header framed">
            <h2>Cultural Posts</h2>
            <div className="filter-controls">
              <div className="toggle-group">
                <button className={sortBy==="most-liked"?"active":""} onClick={()=>setSortBy("most-liked")}>Most liked</button>
                <button className={sortBy==="newest"?"active":""} onClick={()=>setSortBy("newest")}>Newest</button>
              </div>
              <select value={selectedFilter} onChange={(e)=>setSelectedFilter(e.target.value)} className="culture-filter">
                <option value="all">All cultures</option>
                {cultures.map(c=> <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="posts-container framed">
            {filteredPosts.length === 0 ? <p className="no-posts">No posts to display</p> : (
              filteredPosts.map(post=>(
                <div key={post.id} className="post-card">
                  <div className="post-header" style={{color:getCultureColor(post.culture)}}>{post.culture}</div>
                  <div className="post-content">{post.content}</div>
                  <div className="post-meta">
                    — <strong>{post.author?.username || post.author}</strong> · {new Date(post.createdAt).toLocaleDateString()}
                  </div>

                  <div className="post-actions">
                    <button onClick={()=>toggleLike(post.id)}>💚 {post.likes}</button>
                    <button onClick={()=>toggleComments(post.id)}>💬 {post.comments?.length || 0}</button>
                  </div>

                  {post.showComments && (
                    <div className="comments">
                      {post.comments?.length===0 ? <p>No comments yet</p> : (
                        <ul>{post.comments.map((c,i)=>(
                          <li key={i} className="comment-item">
                            <div className="comment-header">
                              <strong>{c.author?.username || c.author}</strong>
                              <span className="comment-time">{new Date(c.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="comment-content">{c.content}</div>
                          </li>
                        ))}</ul>
                      )}
                      <input type="text" placeholder="Write a comment..." onKeyDown={e=>{if(e.key==="Enter"){addComment(post.id,e.target.value); e.target.value="";}}} />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Create Post Section */}
        <div className="create-post-section">
          <div className="create-post framed">
            <h2>Share Your Culture</h2>
            <div className="form-group">
              <label>Select Culture</label>
              <select value={selectedCulture} onChange={(e)=>setSelectedCulture(e.target.value)}>
                <option value="">Choose a culture...</option>
                {cultures.map(c=> <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Your Message</label>
              <textarea rows="5" value={newPost} onChange={(e)=>setNewPost(e.target.value)} placeholder="Share traditions, lifestyles, or cultural aspects..." />
            </div>
            <button onClick={handlePostSubmit} className="submit-btn" disabled={posting}>{posting?"Submitting...":"Submit for Approval"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCulturePageUser;
