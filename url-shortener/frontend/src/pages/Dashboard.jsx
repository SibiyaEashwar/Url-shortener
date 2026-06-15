import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; 

function Dashboard() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    const [urls, setUrls] = useState([]);
    const [originalUrl, setOriginalUrl] = useState("");

    const token = localStorage.getItem("token");

    const fetchUrls = async () => {
        try {
            const response = await api.get("/url/my-urls", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUrls(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createUrl = async (e) => {
        e.preventDefault();

        try {
            await api.post(
                "/url/shorten",
                { originalUrl },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOriginalUrl("");
            fetchUrls();
        } catch (error) {
            console.log(error);
        }
    };
    const deleteUrl = async (id) => {
        try {
            await api.delete(`/url/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchUrls();
        } catch (error) {
            console.log(error);
        }
    };
    const copyUrl = (shortCode) => {
navigator.clipboard.writeText(
            `${window.location.origin}/api/url/${shortCode}`
        );

        alert("Copied!");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        fetchUrls();
    }, []);

    return (
        <div className="dashboard-container">
           <div className="dashboard-header">
                <h1 className="dashboard-title">
  Url Shortener Dashboard
</h1>

               <button
  className="logout-btn"
  onClick={logout}
>
  Logout
</button>
            </div>

           <form
  className="url-form"
  onSubmit={createUrl}
>
                <input
  className="url-input"
  type="text"
  placeholder="Enter URL"
  value={originalUrl}
  onChange={(e) =>
    setOriginalUrl(e.target.value)
  }
/>

                <button
  className="shorten-btn"
  type="submit"
>
  Shorten URL
</button>
            </form>

            <br />

           <table className="url-table">
                <thead>
                    <tr>
                        <th>Original URL</th>
                        <th>Short Code</th>
                        <th>Created Date</th>
                        <th>Clicks</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
  {urls.length === 0 ? (
    <tr>
      <td colSpan="5">
       Create your first short URL
      </td>
    </tr>
  ) : (
    urls.map((url) => (
      <tr key={url._id}>
        <td>{url.originalUrl}</td>

        <td>{url.shortCode}</td>

        <td>
          {new Date(
            url.createdAt
          ).toLocaleDateString()}
        </td>

        <td>{url.clicks}</td>

        <td>
          <button
  className="action-btn copy-btn"
  onClick={() => copyUrl(url.shortCode)}
>
            Copy
          </button>

         <button
  className="action-btn analytics-btn"
  onClick={() =>
    navigate(`/analytics/${url._id}`)
  }
>
            Analytics
          </button>

          <button
  className="action-btn delete-btn"
  onClick={() => deleteUrl(url._id)}
>
            Delete
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>
        </table>
    </div >
  );
}
export default Dashboard;
