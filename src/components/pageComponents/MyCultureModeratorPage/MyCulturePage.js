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

const MyCultureModeratorPage = ({ user }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("most-liked");
  const [posts, setPosts] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState("");

  const getCultureColor = (cultureName) => CULTURE_COLORS[cultureName] || CULTURE_COLORS.default;

  // load Posts and Cultures
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [postsResponse, culturesResponse, usersResponse] = await Promise.all([
        cultureAPI.getPosts({ status: "approved" }),
        cultureAPI.getCultures(),
        cultureAPI.getUsers()
      ]);
      setPosts(postsResponse.data);
      setCultures(culturesResponse.data);
      setUsers(usersResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  

  // Like Handler
  const toggleLike = async (postId) => {
    try {
      const response = await cultureAPI.likePost(postId);
      setPosts(posts.map(post => post.id === postId ? response.data : post));
    } catch (err) { console.error(err); }
  };

  // Filter and Sort Posts
  const getUserFullName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : "Unknown User";
  };
  const getCultureName = (cultureId) => {
    const culture = cultures.find(c => c.id === cultureId);
    return culture ? culture.name : "Unknown Culture";
  };

  const filteredPosts = posts
    .filter(post => selectedFilter === "all" || getCultureName(post.culture) === selectedFilter) //we can optimize this to correlate ids instead
    .sort((a, b) => sortBy === "most-liked" ? b.likes - a.likes : new Date(b.date_created) - new Date(a.date_created));

  

  if (loading) return <div className="loading">Loading posts...</div>;

  return (
    <div className="my-culture-container user-version">
      <h1 className="page-title">MyCulture Moderator Page</h1>
      <p className="page-subtitle">Approve or reject cultural posts</p>
      {error && <div className="error">{error}</div>}

      <div className="page-layout">
        {/* Posts Section */}
        <div className="posts-section">
          <div className="posts-header framed">
            <h2>Culture Posts</h2>
            <div className="filter-controls">
              <div className="toggle-group">
                <button
                  className={`sort-btn ${sortBy === "most-liked" ? "active" : ""}`}
                  onClick={() => setSortBy("most-liked")}>
                  Most liked
                </button>
                <button
                  className={`sort-btn ${sortBy === "newest" ? "active" : ""}`}
                  onClick={() => setSortBy("newest")}>
                  Newest
                </button>
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
                  <div className="post-header" style={{color:getCultureColor(post.culture)}}>{getCultureName(post.culture)}</div>
                  <div className="post-content">{post.text_message}</div>
                  <div className="post-meta">
                    <strong>{getUserFullName(post.user)}</strong> · {new Date(post.date_created).toLocaleDateString()}
                  </div>

                  <div className="post-actions">
                    <button onClick={()=>toggleLike(post.id)}>Accept {post.likes}</button>   
                    <button onClick={()=>toggleLike(post.id)}>Reject {post.likes}</button>           
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        
        
      </div>
    </div>
  );
};

export default MyCultureModeratorPage;