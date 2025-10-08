import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Send, ThumbsUp } from "lucide-react";
import "./WeNeedPage.css";
import { WeNeedAPI } from "../../apiComponents/weNeedAPI";

export default function WeNeedPage() {
  const token = localStorage.getItem("access_token") || "";
  const isAuthed = !!token;

  const [requestText, setRequestText] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([
    "Clubs",
    "Sports",
    "Events",
    "Cultural Activities",
    "Facilities",
    "Support Services",
    "Other",
  ]);
  const [submittedRequests, setSubmittedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const characterLimit = 250;

  useEffect(() => {
    let active = true;
    async function loadAll() {
      setError("");
      try {
        const [reqs, cats] = await Promise.all([
          WeNeedAPI.getApprovedRequests(),
          WeNeedAPI.getCategories().catch(() => null),
        ]);

        const list = (Array.isArray(reqs) ? reqs : reqs.results || []).map((r) => ({
          id: r.id,
          name: r.student?.name || r.display_name || "Anonymous",
          category: r.category,
          request: r.text,
          date: r.created_at ? new Date(r.created_at).toLocaleString() : "",
          likes: r.likes_count ?? 0,
          liked: !!r.likedByMe,
        }));

        if (active) {
          setSubmittedRequests(list);
          if (cats) {
            const c = Array.isArray(cats) ? cats : cats.categories || [];
            if (c.length) setCategories(c);
          }
          setLoading(false);
        }
      } catch (e) {
        if (active) {
          setError("Could not load requests. Please try again.");
          setLoading(false);
        }
        console.error(e);
      }
    }
    loadAll();
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isAuthed) {
      setError("Please sign in to submit a request.");
      return;
    }
    if (!requestText.trim() || !category) return;

    setPosting(true);
    setError("");
    try {
      const created = await WeNeedAPI.createRequest({
        category,
        text: requestText.trim(),
      });

      if (created.status === "approved") {
        setSubmittedRequests((prev) => [
          {
            id: created.id,
            name: created.student?.name || created.display_name || "Anonymous",
            category: created.category,
            request: created.text,
            date: created.created_at
              ? new Date(created.created_at).toLocaleString()
              : "Just now",
            likes: created.likes_count ?? 0,
            liked: false,
          },
          ...prev,
        ]);
      }

      setRequestText("");
      setCategory("");
    } catch (e) {
      console.error(e);
      setError("Something went wrong saving your request.");
    } finally {
      setPosting(false);
    }
  }

  async function toggleLike(id, currentlyLiked) {
    if (!isAuthed) {
      setError("Please sign in to like requests.");
      return;
    }

    setSubmittedRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              liked: !currentlyLiked,
              likes: Math.max(0, r.likes + (currentlyLiked ? -1 : 1)),
            }
          : r
      )
    );

    try {
      if (currentlyLiked) {
        await WeNeedAPI.unlikeRequest(id);
      } else {
        await WeNeedAPI.likeRequest(id);
      }
    } catch (e) {
      console.error(e);
      setSubmittedRequests((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                liked: currentlyLiked,
                likes: Math.max(0, r.likes + (currentlyLiked ? 1 : -1)),
              }
            : r
        )
      );
      setError("Could not update like. Please try again.");
    }
  }

  const title = "#WeNeed — UniPath Social Wellness";
  const description =
    "Share and discover student requests for clubs, events, and support at NWU. Like ideas you support and help shape a healthier, more connected campus.";
  const siteUrl = "https://your-domain.example/#/weneed"; 
  const imageUrl = "https://your-domain.example/og/unipath-weneed.jpg";

  return (
    <div className="weneed-fullbleed">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={siteUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={imageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />

        <meta name="robots" content="index,follow" />
      </Helmet>

      <div className="weneed-content">
        <header className="weneed-header">
          <h1 className="weneed-title">#WeNeed</h1>
          <p className="weneed-subtitle">
            Share what social activities, clubs, or support you need on campus
          </p>
        </header>

        {error && <div className="weneed-error">{error}</div>}

        <section className="weneed-card">
          <h2 className="weneed-card-title">Submit Your Request</h2>

          {!isAuthed && (
            <div className="weneed-hint">
              Please sign in to submit requests and like others.
            </div>
          )}

          <form onSubmit={handleSubmit} className="weneed-form">
            <div className="form-field">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                disabled={!isAuthed || posting}
              >
                <option value="">Select a category...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label className="form-label">What do you need? *</label>
              <textarea
                className="form-textarea"
                value={requestText}
                onChange={(e) =>
                  setRequestText(e.target.value.slice(0, characterLimit))
                }
                placeholder={
                  isAuthed ? "Tell us what you need..." : "Sign in to write your request"
                }
                required
                disabled={!isAuthed || posting}
                rows="4"
              />
              <div
                className={`char-counter ${
                  requestText.length >= characterLimit ? "char-limit" : ""
                }`}
              >
                {requestText.length}/{characterLimit} characters
              </div>
            </div>

            <button
              type="submit"
              className={`btn ${isAuthed ? "btn-primary" : "btn-disabled"}`}
              disabled={!isAuthed || posting}
              onMouseOver={(e) => {
                if (isAuthed) e.currentTarget.classList.add("hover");
              }}
              onMouseOut={(e) => {
                if (isAuthed) e.currentTarget.classList.remove("hover");
              }}
            >
              <Send size={18} />
              {posting ? "Submitting…" : "Submit Request"}
            </button>
          </form>
        </section>

        <section className="weneed-card">
          <h2 className="weneed-card-title">Community Requests</h2>

          {loading ? (
            <div>Loading…</div>
          ) : submittedRequests.length === 0 ? (
            <div className="weneed-empty">No approved requests yet.</div>
          ) : (
            submittedRequests.map((req) => (
              <div key={req.id} className="request-item">
                <div className="request-top">
                  <div className="request-meta">
                    <span className="request-name">{req.name}</span>
                    <span className="request-chip">{req.category}</span>
                  </div>
                  <span className="request-date">{req.date}</span>
                </div>

                <p className="request-text">{req.request}</p>

                <button
                  type="button"
                  className={`btn-like ${req.liked ? "liked" : ""}`}
                  aria-pressed={req.liked}
                  disabled={!isAuthed}
                  onClick={() => toggleLike(req.id, req.liked)}
                >
                  <ThumbsUp size={16} />
                  <span>{req.liked ? "Liked" : "Like"}</span>
                  <span className="like-count">{req.likes}</span>
                </button>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
