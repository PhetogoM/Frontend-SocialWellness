import React, { useState, useEffect } from "react";
import "./MyCulturePage.css";

// Mock API fetch (replace with backend later)
const fetchPosts = async () => {
  return [
    { id: 1, author: "Aisha", content: "In my culture, we celebrate New Year with lanterns.", relates: 12 },
    { id: 2, author: "Sam", content: "We cook special meals every Sunday with the whole family.", relates: 7 },
  ];
};

// Mock API submit (replace with backend later)
const submitPost = async (post) => {
  console.log("Submitted to backend:", post);
  return { success: true };
};

function MyCulturePage() {
  const [posts, setPosts] = useState([]);        // list of posts
  const [newPost, setNewPost] = useState("");   // textarea input
  const [loading, setLoading] = useState(false); // posting state

  // Load posts on page mount
  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    loadPosts();
  }, []);

  // Submit new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setLoading(true);
    await submitPost({ content: newPost });
    setNewPost("");
    setLoading(false);

    // Add new post locally until backend reload
    setPosts((prev) => [...prev, { id: Date.now(), author: "You", content: newPost, relates: 0 }]);
  };

  // Handle "Relate" click
  const handleRelate = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, relates: post.relates + 1 } : post
      )
    );
  };

  return (
    <div className="myculture-container">
      {/* Page title */}
      <h1 className="myculture-title">🌍 MyCulture</h1>
      <p className="myculture-subtitle">
        Share your traditions, lifestyle, and cultural stories with your campus.
      </p>

      {/* Post form */}
      <form onSubmit={handleSubmit} className="myculture-form">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share something about your culture..."
          rows="3"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      {/* Posts feed */}
      <div className="myculture-feed">
        {posts.map((post) => (
          <div key={post.id} className="myculture-card">
            <p className="myculture-content">{post.content}</p>
            <p className="myculture-author">— {post.author}</p>

            {/* Relate button and count */}
            <div className="myculture-actions">
              <button onClick={() => handleRelate(post.id)}>👍 Relate</button>
              <span>{post.relates} relate(s)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCulturePage;
