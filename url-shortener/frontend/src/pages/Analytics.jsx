import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Analytics.css";

function Analytics() {
  const navigate = useNavigate();
  const { urlId } = useParams();

  const [analytics, setAnalytics] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get(
          `/analytics/${urlId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAnalytics(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnalytics();
  }, [urlId, token]);

  if (!analytics) {
    return (
      <div className="analytics-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      <h1 className="analytics-title">
        URL Analytics
      </h1>

      <div className="analytics-cards">
        <div className="card">
          <h3>Total Clicks</h3>
          <h1>{analytics.totalClicks}</h1>
        </div>

        <div className="card">
          <h3>Last Visited</h3>
          <p>
            {analytics.lastVisited
              ? new Date(
                  analytics.lastVisited
                ).toLocaleString()
              : "Never"}
          </p>
        </div>
      </div>

      <h2 className="analytics-title">
        Recent Visits
      </h2>

      <table className="visits-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User Agent</th>
          </tr>
        </thead>

        <tbody>
          {analytics.recentVisits.length > 0 ? (
            analytics.recentVisits.map(
              (visit, index) => (
                <tr key={index}>
                  <td>
                    {new Date(
                      visit.timestamp
                    ).toLocaleString()}
                  </td>

                  <td>
                    {visit.userAgent}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="2">
                No visits recorded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Analytics;