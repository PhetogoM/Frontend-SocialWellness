import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./AdminWeNeedPage.css";
import { WeNeedAPI } from "../../apiComponents/weNeedAPI.js";
import { API_BASE_URL } from "../../apiComponents/weNeedAPI.js";

export default function AdminWeNeedPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [reqRes, catRes] = await Promise.all([
        fetchRequests(statusFilter),
        WeNeedAPI.getCategories(),
      ]);
      setItems(reqRes);
      setCategories(catRes);
    } catch (err) {
      console.error(err);
      setError("Could not load submissions.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchRequests(status) {
    const qs = status !== "all" ? `?status=${status}` : "";
    const res = await fetch(`${API_BASE_URL}/requests/${qs}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`Requests: ${res.status}`);
    const data = await res.json();
    return (Array.isArray(data) ? data : data.results || []).map((r) => ({
      id: r.id,
      text: r.text,
      category: r.category,
      status: r.status,
      created_at: r.created_at,
      student: {
        name: r.student?.name || r.display_name || "Anonymous",
      },
    }));
  }

async function updateStatus(id, newStatus) {
  const prev = [...items];
  setItems((cur) => cur.map((it) => (it.id === id ? { ...it, status: newStatus } : it)));

  try {
    await WeNeedAPI.updateRequestStatus(id, newStatus);
  } catch (err) {
    console.error(err);
    setError("Failed to update status.");
    setItems(prev);
  }
}

async function removeRequest(id) {
  const prev = [...items];
  setItems((cur) => cur.filter((it) => it.id !== id));
  try {
    await WeNeedAPI.deleteRequest(id);
  } catch (err) {
    console.error(err);
    setError("Failed to delete request.");
    setItems(prev);
  }
}


  const requests = items.filter((it) => {
    const matchesCategory = categoryFilter ? it.category === categoryFilter : true;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      it.text.toLowerCase().includes(q) ||
      it.student.name.toLowerCase().includes(q) ||
      it.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
  <div className="awn-fullbleed">
    <Helmet>
      <title>WeNeed Admin — UniPath</title>
      <meta name="robots" content="noindex,nofollow" />
    </Helmet>

    <div className="awn-content">
      {/* Header */}
      <header className="awn-header">
        <h1 className="awn-title">WeNeed — Admin Submissions</h1>
        <p className="awn-subtitle">Review, approve, reject, or remove submissions.</p>
      </header>

      {/* Error message */}
      {error && <div className="awn-error">{error}</div>}

      {/* Card with toolbar + table */}
      <section className="awn-card">
        {/* Toolbar */}
        <div className="awn-toolbar">
          <select
            className="awn-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All categories</option>
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

          <input
            className="awn-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search text, name, category"
          />
        </div>

        {/* Loading / empty states */}
        {loading ? (
          <div>Loading…</div>
        ) : requests.length === 0 ? (
          <div className="awn-empty">No submissions.</div>
        ) : (
          <div className="awn-table" role="table" aria-label="WeNeed submissions">
            {/* Table header */}
            <div className="awn-thead" role="rowgroup">
              <div className="awn-tr" role="row">
                <div className="awn-th">Date</div>
                <div className="awn-th">Student</div>
                <div className="awn-th">Category</div>
                <div className="awn-th">Request</div>
                <div className="awn-th awn-actions-col">Actions</div>
              </div>
            </div>

            {/* Table body */}
            <div className="awn-tbody" role="rowgroup">
              {requests.map((req) => (
                <div className="awn-tr" role="row" key={req.id}>
                  <div className="awn-td">
                    {req.created_at ? new Date(req.created_at).toLocaleString() : ""}
                  </div>
                  <div className="awn-td">{req.student.name}</div>
                  <div className="awn-td">
                    <span className="chip">{req.category}</span>
                  </div>
                  <div className="awn-td awn-text">{req.text}</div>
                  <div className="awn-td awn-actions">
                    <button
                      className="btn small approve"
                      disabled={req.status === "approved"}
                      onClick={() => updateStatus(req.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn small reject"
                      disabled={req.status === "rejected"}
                      onClick={() => updateStatus(req.id, "rejected")}
                    >
                      Reject
                    </button>
                    <button
                      className="btn small danger"
                      onClick={() => removeRequest(req.id)}
                      title="Delete request"
                    >
                      Delete
                    </button>
                    <span className={`badge ${req.status}`}>{req.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  </div>
);

}
