import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
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
        const [cats] = await Promise.all([
          WeNeedAPI.getCategories().catch(() => null),
        ]);

        if (active) {
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

  return (
    <div className="weneed-container">
      <h1 className="page-title weneed-title">We Need</h1>
      <p className="page-subtitle weneed-subtitle">
        Share what social activities, clubs, or support you need on campus
      </p>

      {error && <div className="weneed-error">{error}</div>}

      <div className="page-layout">
        {/* Create Request Section */}
        <div className="create-post-section">
          <div className="create-post">
            <h2>Submit Your Request</h2>

            {!isAuthed && (
              <div className="weneed-hint">
                Please sign in to submit requests.
              </div>
            )}

            <form onSubmit={handleSubmit} className="form-group">
              <label>Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                disabled={!isAuthed || posting}
              >
                <option value="">Select a category...</option>
                {categories.map((cat) => {
                  const value = typeof cat === "string" ? cat : cat.value;
                  const label = typeof cat === "string" ? cat : cat.label;
                  return (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>

              <label>What do you need? *</label>
              <textarea
                value={requestText}
                onChange={(e) =>
                  setRequestText(e.target.value.slice(0, characterLimit))
                }
                placeholder={
                  isAuthed
                    ? "Tell us what you need..."
                    : "Sign in to write your request"
                }
                required
                disabled={!isAuthed || posting}
              />
              <div
                className={`char-counter ${
                  requestText.length >= characterLimit ? "char-limit" : ""
                }`}
              >
                {requestText.length}/{characterLimit} characters
              </div>

              <button
                type="submit"
                className={`submit-btn ${
                  isAuthed ? "" : "submit-btn-disabled"
                }`}
                disabled={!isAuthed || posting}
              >
                <Send size={18} />
                {posting ? "Submitting…" : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}