// components/pageComponents/MyCulturePage/MyCultureModeratorPage.js
import React, { useState, useEffect, useCallback } from "react";
import { cultureModeratorAPI } from "../../apiComponents/cultureModeratorApi.js";
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
  default: "#333333",
};

const MyCultureModeratorPage = ({ user }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [posts, setPosts] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getCultureColor = (cultureName) =>
    CULTURE_COLORS[cultureName] || CULTURE_COLORS.default;

  // Load all posts (pending), cultures, and users
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [postsResponse, culturesResponse, usersResponse] = await Promise.all([
        cultureModeratorAPI.getAllPosts("pending"),
        cultureModeratorAPI.getCultures(),
        cultureModeratorAPI.getUsers(),
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

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Approve or Reject post
  const handleApprove = async (postId) => {
    try {
      await cultureModeratorAPI.approvePost(postId);
      setPosts(posts.filter((p) => p.id !== postId)); // remove post from list
    } catch (err) {
      console.error("Error approving post:", err);
    }
  };

  const handleReject = async (postId) => {
    try {
      await cultureModeratorAPI.rejectPost(postId);
      setPosts(posts.filter((p) => p.id !== postId)); // remove post from list
    } catch (err) {
      console.error("Error rejecting post:", err);
    }
  };

  // Helper: Get related user and culture info
  const getUserFullName = (userId) => {
    const foundUser = users.find((u) => u.id === userId);
    return foundUser ? foundUser.name : "Unknown User";
  };

  const getCultureName = (cultureId) => {
    const foundCulture = cultures.find((c) => c.id === cultureId);
    return foundCulture ? foundCulture.name : "Unknown Culture";
  };

  // Filter and sort posts
  const filteredPosts = posts
    .filter(
      (post) =>
        selectedFilter === "all" || getCultureName(post.culture) === selectedFilter
    )
    .sort((a, b) =>
      sortBy === "most-liked"
        ? b.likes - a.likes
        : new Date(b.date_created) - new Date(a.date_created)
    );

  if (loading) return <div className="loading">Loading posts...</div>;

  return (
    <div className="my-culture-container moderator-version">
      <h1 className="page-title">MyCulture Moderator Panel</h1>
      <p className="page-subtitle">Review and moderate cultural posts</p>
      {error && <div className="error">{error}</div>}

      <div className="page-layout">
        {/* Posts Section */}
        <div className="posts-section">
          <div className="posts-header framed">
            <h2>Pending Culture Posts</h2>
            <div className="filter-controls">
              <div className="toggle-group">
                <button
                  className={`sort-btn ${sortBy === "most-liked" ? "active" : ""}`}
                  onClick={() => setSortBy("most-liked")}
                >
                  Most Liked
                </button>
                <button
                  className={`sort-btn ${sortBy === "newest" ? "active" : ""}`}
                  onClick={() => setSortBy("newest")}
                >
                  Newest
                </button>
              </div>

              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="culture-filter"
              >
                <option value="all">All cultures</option>
                {cultures.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="posts-container framed">
            {filteredPosts.length === 0 ? (
              <p className="no-posts">No pending posts to review.</p>
            ) : (
              filteredPosts.map((post) => (
                <div key={post.id} className="post-card">
                  <div
                    className="post-header"
                    style={{ color: getCultureColor(getCultureName(post.culture)) }}
                  >
                    {getCultureName(post.culture)}
                  </div>
                  <div className="post-content">{post.text_message}</div>
                  <div className="post-meta">
                    <strong>{getUserFullName(post.user)}</strong> ·{" "}
                    {new Date(post.date_created).toLocaleDateString()}
                  </div>

                  <div className="post-actions">
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(post.id)}
                    >
                      ✅ Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(post.id)}
                    >
                      ❌ Reject
                    </button>
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
