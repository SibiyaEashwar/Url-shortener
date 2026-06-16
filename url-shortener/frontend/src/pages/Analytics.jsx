import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Dashboard.css";
import "./Analytics.css";

function Analytics() {
  const navigate = useNavigate();
  const { urlId } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get(`/analytics/${urlId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnalytics(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, [urlId, token]);

  if (!analytics) {
    return (
      <div className="analytics-loading">
        <div className="spinner" />
      </div>
    );
  }

  const lastVisited = analytics.lastVisited
    ? new Date(analytics.lastVisited).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never";

  return (
    <div className="analytics-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-icon">🔗</div>
          <span className="navbar-title">Sniplink</span>
        </div>
        <div className="navbar-right">
          <button
            id="logout-btn-analytics"
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Sign out
          </button>
        </div>
      </nav>

      <main className="analytics-main">
        {/* Back */}
        <button id="back-btn" className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className="analytics-header">
          <h1 className="analytics-title">Link Analytics</h1>
          {analytics.originalUrl && (
            <p className="analytics-url">{analytics.originalUrl}</p>
          )}
        </div>

        {/* Stats */}
        <div className="analytics-stats">
          <div className="analytics-stat-card">
            <p className="analytics-stat-label">Total Clicks</p>
            <p className="analytics-stat-value">{analytics.totalClicks}</p>
            <p className="analytics-stat-sub">All time</p>
          </div>
          <div className="analytics-stat-card">
            <p className="analytics-stat-label">Last Visited</p>
            <p
              className="analytics-stat-value"
              style={{ fontSize: analytics.lastVisited ? "22px" : "32px" }}
            >
              {analytics.lastVisited
                ? new Date(analytics.lastVisited).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "—"}
            </p>
            <p className="analytics-stat-sub">{lastVisited}</p>
          </div>
        </div>

        {/* Visits Table */}
        <h2 className="visits-section-title">Recent Visits</h2>
        <div className="visits-table-wrap">
          {analytics.recentVisits?.length > 0 ? (
            <table className="visits-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User Agent</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentVisits.map((visit, i) => (
                  <tr key={i}>
                    <td>
                      <span className="visit-timestamp">
                        {new Date(visit.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td>
                      <span className="visit-agent">{visit.userAgent}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="visits-empty">No visits recorded yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Analytics;