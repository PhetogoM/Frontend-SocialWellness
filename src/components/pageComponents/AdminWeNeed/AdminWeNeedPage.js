import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./AdminWeNeedPage.css";
import api from "../../apiComponents/api.js";

export default function AdminWeNeedPage() {
  const token = localStorage.getItem("access_token") || "";
  const isAuthed = !!token;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  const authHeaders = useMemo(
    () =>
      isAuthed
        ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        : { "Content-Type": "application/json" },
    [isAuthed, token]
  );

  useEffect(() => {
    let active = true;
    async function load() {
      setError("");
      setLoading(true);
      try {
        const qs = new URLSearchParams();
        if (statusFilter !== "all") qs.set("status", statusFilter);
        const [reqRes, catRes] = await Promise.all([
          fetch(`${api}/requests/?${qs.toString()}`, { headers: authHeaders }),
          fetch(`${api}/requests/categories/`)
        ]);
        if (!reqRes.ok) throw new Error(`Requests ${reqRes.status}`);
        const reqs = await reqRes.json();
        const data = (Array.isArray(reqs) ? reqs : reqs.results || []).map((r) => ({
          id: r.id,
          text: r.text,
          category: r.category,
          status: r.status,
          likes: r.likes_count ?? 0,
          created_at: r.created_at,
          student: {
            name: r.student?.name || r.display_name || "Anonymous",
            number: r.student?.student_number || r.student_number || ""
          }
        }));
        let cats = [];
        if (catRes.ok) {
          const c = await catRes.json();
          cats = Array.isArray(c) ? c : c.categories || [];
        }
        if (active) {
          setItems(data);
          setCategories(cats);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        if (active) {
          setError("Could not load submissions.");
          setLoading(false);
        }
      }
    }
    load();
    return () => { active = false; };
  }, [api, authHeaders, statusFilter]);

  const filtered = items.filter((it) => {
    const matchCat = categoryFilter ? it.category === categoryFilter : true;
    const q = search.trim().toLowerCase();
    const matchQ = !q
      ? true
      : (it.text || "").toLowerCase().includes(q) ||
        (it.student?.name || "").toLowerCase().includes(q) ||
        (it.category || "").toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  async function updateStatus(id, newStatus) {
    setError("");
    const prev = items;
    setItems((cur) => cur.map((it) => (it.id === id ? { ...it, status: newStatus } : it)));
    try {
      const res = await fetch(`${api}/requests/${id}/`, {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
    } catch (e) {
      console.error(e);
      setError("Failed to update status.");
      setItems(prev);
    }
  }

  async function removeRequest(id) {
    const prev = items;
    setItems((cur) => cur.filter((it) => it.id !== id));
    try {
      const res = await fetch(`${api}/requests/${id}/`, {
        method: "DELETE",
        headers: authHeaders
      });
      if (!res.ok && res.status !== 204) throw new Error(`Delete failed: ${res.status}`);
    } catch (e) {
      console.error(e);
      setError("Failed to delete.");
      setItems(prev);
    }
  }

  return (
    <div className="awn-fullbleed">
      <Helmet>
        <title>WeNeed Admin — UniPath</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="awn-content">
        <header className="awn-header">
          <h1 className="awn-title">WeNeed — Admin Submissions</h1>
          <p className="awn-subtitle">Review, approve, reject, or remove submissions.</p>
        </header>

        {error && <div className="awn-error">{error}</div>}

        <section className="awn-card">
          <div className="awn-toolbar">
            <select
              className="awn-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              title="Status filter"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="all">All</option>
            </select>

            <select
              className="awn-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              title="Category filter"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <input
              className="awn-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search text, name, category"
            />
          </div>

          {loading ? (
            <div>Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="awn-empty">No submissions.</div>
          ) : (
            <div className="awn-table" role="table" aria-label="WeNeed submissions">
              <div className="awn-thead" role="rowgroup">
                <div className="awn-tr" role="row">
                  <div className="awn-th">Date</div>
                  <div className="awn-th">Student</div>
                  <div className="awn-th">Stu #</div>
                  <div className="awn-th">Category</div>
                  <div className="awn-th">Request</div>
                  <div className="awn-th">Likes</div>
                  <div className="awn-th">Status</div>
                  <div className="awn-th awn-actions-col">Actions</div>
                </div>
              </div>
              <div className="awn-tbody" role="rowgroup">
                {filtered.map((it) => (
                  <div className="awn-tr" role="row" key={it.id}>
                    <div className="awn-td">
                      {it.created_at ? new Date(it.created_at).toLocaleString() : ""}
                    </div>
                    <div className="awn-td">{it.student?.name || "Anonymous"}</div>
                    <div className="awn-td">{it.student?.number || ""}</div>
                    <div className="awn-td">
                      <span className="chip">{it.category}</span>
                    </div>
                    <div className="awn-td awn-text">{it.text}</div>
                    <div className="awn-td">{it.likes}</div>
                    <div className="awn-td">
                      <span className={`badge ${it.status}`}>{it.status}</span>
                    </div>
                    <div className="awn-td awn-actions">
                      <button
                        className="btn small approve"
                        disabled={it.status === "approved"}
                        onClick={() => updateStatus(it.id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn small reject"
                        disabled={it.status === "rejected"}
                        onClick={() => updateStatus(it.id, "rejected")}
                      >
                        Reject
                      </button>
                      <button
                        className="btn small danger"
                        onClick={() => removeRequest(it.id)}
                        title="Delete request"
                      >
                        Delete
                      </button>
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
