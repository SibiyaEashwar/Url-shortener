import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

/* ── tiny toast helper ── */
function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className={`toast ${type}`}>
      <span className="toast-dot" />
      {message}
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const token = localStorage.getItem("token");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchUrls = useCallback(async () => {
    try {
      const response = await api.get("/url/my-urls", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUrls(response.data);
    } catch {
      showToast("Failed to load URLs", "error");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createUrl = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;
    setSubmitting(true);
    try {
      await api.post(
        "/url/shorten",
        { originalUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOriginalUrl("");
      fetchUrls();
      showToast("Short link created!", "success");
    } catch {
      showToast("Could not shorten that URL.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteUrl = async (id) => {
    try {
      await api.delete(`/url/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUrls((prev) => prev.filter((u) => u._id !== id));
      showToast("Link deleted.", "success");
    } catch {
      showToast("Delete failed.", "error");
    }
  };

  const copyUrl = (shortCode) => {
    const short = `${import.meta.env.VITE_BACKEND_URL || "https://url-shortener-1-qson.onrender.com"}/api/url/${shortCode}`;
    navigator.clipboard.writeText(short);
    showToast("Copied to clipboard!", "success");
  };

  useEffect(() => {
    if (!token) { navigate("/"); return; }
    fetchUrls();
  }, [fetchUrls, navigate, token]);

  const totalClicks = urls.reduce((acc, u) => acc + (u.clicks || 0), 0);

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-icon">🔗</div>
          <span className="navbar-title">Sniplink</span>
        </div>
        <div className="navbar-right">
          <span className="total-links-badge">{urls.length} links</span>
          <button id="logout-btn" className="logout-btn" onClick={logout}>
            Sign out
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="dashboard-main">
        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <p className="stat-label">Total Links</p>
            <p className="stat-value">{urls.length}</p>
            <p className="stat-sub">All time</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Total Clicks</p>
            <p className="stat-value">{totalClicks}</p>
            <p className="stat-sub">Across all links</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Avg. Clicks</p>
            <p className="stat-value">
              {urls.length ? (totalClicks / urls.length).toFixed(1) : "0"}
            </p>
            <p className="stat-sub">Per link</p>
          </div>
        </div>

        {/* Shorten Form */}
        <div className="shorten-card">
          <p className="shorten-card-title">✦ Shorten a new URL</p>
          <form className="shorten-form" onSubmit={createUrl}>
            <input
              id="shorten-input"
              className="shorten-input"
              type="url"
              placeholder="https://example.com/very-long-url-goes-here"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
            />
            <button
              id="shorten-btn"
              className="shorten-btn"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Creating…" : "Shorten →"}
            </button>
          </form>
        </div>

        {/* URLs List */}
        <div className="urls-section-header">
          <h2 className="urls-section-title">Your Links</h2>
          <span className="urls-count">{urls.length} total</span>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
          </div>
        ) : urls.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔗</div>
            <p className="empty-title">No links yet</p>
            <p className="empty-sub">Paste a URL above and hit Shorten to get started.</p>
          </div>
        ) : (
          <div className="urls-list">
            {urls.map((url, i) => (
              <div
                className="url-card"
                key={url._id}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="url-card-left">
                  <p className="url-original">{url.originalUrl}</p>
                  <div className="url-short-row">
                    <span className="url-short">/{url.shortCode}</span>
                  </div>
                </div>

                <div className="url-meta">
                  <span className="url-meta-item">
                    <span className="url-meta-dot" />
                    {url.clicks || 0} clicks
                  </span>
                  <span className="url-meta-item">
                    {new Date(url.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="url-actions">
                  <button
                    id={`copy-btn-${url._id}`}
                    className="action-btn copy-btn"
                    onClick={() => copyUrl(url.shortCode)}
                  >
                    Copy
                  </button>
                  <button
                    id={`analytics-btn-${url._id}`}
                    className="action-btn analytics-btn"
                    onClick={() => navigate(`/analytics/${url._id}`)}
                  >
                    Analytics
                  </button>
                  <button
                    id={`delete-btn-${url._id}`}
                    className="action-btn delete-btn"
                    onClick={() => deleteUrl(url._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
