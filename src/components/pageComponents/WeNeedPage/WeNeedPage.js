import React, { useEffect, useMemo, useState } from "react";
import { Send, ThumbsUp } from "lucide-react";
import "./WeNeedPage.css";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  "http://127.0.0.1:8000/api";

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

  const authHeaders = useMemo(
    () =>
      isAuthed
        ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        : { "Content-Type": "application/json" },
    [isAuthed, token]
  );

  useEffect(() => {
    let active = true;
    async function loadAll() {
      setError("");
      try {
        const [reqRes, catRes] = await Promise.all([
          fetch(`${API_BASE_URL}/requests/?status=approved`, { headers: authHeaders }),
          fetch(`${API_BASE_URL}/requests/categories/`),
        ]);

        if (!reqRes.ok) throw new Error(`Requests ${reqRes.status}`);
        const reqs = await reqRes.json();

        const normalized = (Array.isArray(reqs) ? reqs : reqs.results || []).map((r) => ({
          id: r.id,
          name: r.student?.name || r.display_name || "Anonymous",
          category: r.category,
          request: r.text,
          date: r.created_at ? new Date(r.created_at).toLocaleString() : "",
          likes: r.likes_count ?? 0,
          liked: !!r.likedByMe,
        }));

        let cats = [];
        if (catRes.ok) {
          const json = await catRes.json();
          cats = Array.isArray(json) ? json : json.categories || [];
        }

        if (active) {
          setSubmittedRequests(normalized);
          if (cats.length) setCategories(cats);
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
  }, [API_BASE_URL, authHeaders]);

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
      const res = await fetch(`${API_BASE_URL}/requests/`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ category, text: requestText.trim() }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Request failed: ${res.status}`);
      }
      const created = await res.json();

      if (created.status === "approved") {
        setSubmittedRequests((prev) => [
          {
            id: created.id,
            name: created.student?.name || created.display_name || "Anonymous",
            category: created.category,
            request: created.text,
            date: created.created_at ? new Date(created.created_at).toLocaleString() : "Just now",
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
          ? { ...r, liked: !currentlyLiked, likes: Math.max(0, r.likes + (currentlyLiked ? -1 : 1)) }
          : r
      )
    );
    try {
      const method = currentlyLiked ? "DELETE" : "POST";
      const res = await fetch(`${API_BASE_URL}/requests/${id}/like/`, {
        method,
        headers: authHeaders,
      });
      if (!res.ok) throw new Error(`Like failed: ${res.status}`);
    } catch (e) {
      console.error(e);
      setSubmittedRequests((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, liked: currentlyLiked, likes: Math.max(0, r.likes + (currentlyLiked ? 1 : -1)) }
            : r
        )
      );
      setError("Could not update like. Please try again.");
    }
  }

  return (
    <div className="weneed-fullbleed">
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

          {!isAuthed && <div className="weneed-hint">Please sign in to submit requests and like others.</div>}

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
                onChange={(e) => setRequestText(e.target.value.slice(0, characterLimit))}
                placeholder={isAuthed ? "Tell us what you need..." : "Sign in to write your request"}
                required
                disabled={!isAuthed || posting}
                rows="4"
              />
              <div className={`char-counter ${requestText.length >= characterLimit ? "char-limit" : ""}`}>
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
