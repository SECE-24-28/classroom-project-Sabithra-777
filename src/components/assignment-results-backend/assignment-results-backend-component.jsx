import { useState } from "react";
import axios from "axios";

export default function AssignmentResults() {
  const [assignmentId, setAssignmentId] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAssignmentResults = async (id) => {
    if (!id.trim()) {
      setError("Please enter an assignment ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get("/api/assignment/results", {
        params: { assignmentId: id },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.success) {
        setUserDetails(data.userDetails);
      } else {
        setError("Failed to fetch results");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Error fetching assignment results"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    fetchAssignmentResults(assignmentId);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#f5f5f5",
      padding: "2rem",
    },
    wrapper: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "2rem",
    },
    searchBox: {
      background: "white",
      padding: "1.5rem",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      marginBottom: "2rem",
    },
    inputWrapper: {
      display: "flex",
      gap: "1rem",
    },
    input: {
      flex: 1,
      padding: "0.75rem 1rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "1rem",
      outline: "none",
    },
    button: {
      padding: "0.75rem 1.5rem",
      background: loading ? "#9ca3af" : "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: loading ? "not-allowed" : "pointer",
      transition: "background 0.2s",
    },
    errorBox: {
      padding: "1rem",
      background: "#fee",
      border: "1px solid #fcc",
      borderRadius: "8px",
      color: "#c00",
      marginBottom: "1.5rem",
    },
    loadingContainer: {
      textAlign: "center",
      padding: "3rem 0",
    },
    spinner: {
      display: "inline-block",
      width: "48px",
      height: "48px",
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #2563eb",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    loadingText: {
      marginTop: "1rem",
      color: "#666",
    },
    resultsHeader: {
      background: "white",
      padding: "1rem 1.5rem",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      marginBottom: "1rem",
    },
    resultsTitle: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: "#333",
    },
    userCard: {
      background: "white",
      padding: "1.5rem",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      marginBottom: "1rem",
      transition: "box-shadow 0.2s",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1rem",
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: "1.125rem",
      fontWeight: 600,
      color: "#333",
      margin: "0 0 0.5rem 0",
    },
    userEmail: {
      color: "#666",
      fontSize: "0.875rem",
      margin: 0,
    },
    marksBox: {
      textAlign: "right",
    },
    marks: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#2563eb",
    },
    marksLabel: {
      fontSize: "0.875rem",
      color: "#999",
    },
    detailsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1rem",
      fontSize: "0.875rem",
    },
    detailLabel: {
      color: "#999",
      display: "block",
      marginBottom: "0.25rem",
    },
    detailValue: {
      fontWeight: 500,
      color: "#333",
      margin: 0,
    },
    statusBadge: (active) => ({
      display: "inline-block",
      padding: "0.25rem 0.75rem",
      borderRadius: "999px",
      fontSize: "0.75rem",
      fontWeight: 600,
      marginTop: "1rem",
      background: active ? "#d1fae5" : "#f3f4f6",
      color: active ? "#065f46" : "#374151",
    }),
    emptyState: {
      textAlign: "center",
      padding: "3rem",
      background: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      color: "#666",
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .user-card:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
          }
          .button:hover:not(:disabled) {
            background: #1d4ed8 !important;
          }
          .input:focus {
            border-color: #2563eb !important;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
          }
        `}
      </style>

      <div style={styles.wrapper}>
        <h1 style={styles.title}>Assignment Results</h1>

        <div style={styles.searchBox}>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              value={assignmentId}
              onChange={(e) => setAssignmentId(e.target.value)}
              placeholder="Enter Assignment ID"
              style={styles.input}
              className="input"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={styles.button}
              className="button"
            >
              {loading ? "Loading..." : "Fetch Results"}
            </button>
          </div>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loading results...</p>
          </div>
        ) : userDetails.length > 0 ? (
          <>
            <div style={styles.resultsHeader}>
              <h2 style={styles.resultsTitle}>
                Completed Users ({userDetails.length})
              </h2>
            </div>

            {userDetails.map((detail) => (
              <div
                key={detail._id}
                style={styles.userCard}
                className="user-card"
              >
                <div style={styles.cardHeader}>
                  <div style={styles.userInfo}>
                    <h3 style={styles.userName}>
                      {detail.user?.firstName} {detail.user?.secondName}
                    </h3>
                    <p style={styles.userEmail}>{detail.user?.email}</p>
                  </div>
                  <div style={styles.marksBox}>
                    <div style={styles.marks}>{detail.marks ?? "N/A"}</div>
                    <div style={styles.marksLabel}>Marks</div>
                  </div>
                </div>

                <div style={styles.detailsGrid}>
                  <div>
                    <span style={styles.detailLabel}>Mobile:</span>
                    <p style={styles.detailValue}>
                      {detail.user?.mobileNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span style={styles.detailLabel}>College:</span>
                    <p style={styles.detailValue}>
                      {detail.user?.collegeName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span style={styles.detailLabel}>Completed:</span>
                    <p style={styles.detailValue}>
                      {detail.completedTime
                        ? formatDate(detail.completedTime)
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {detail.user?.active !== undefined && (
                  <span style={styles.statusBadge(detail.user.active)}>
                    {detail.user.active ? "Active" : "Inactive"}
                  </span>
                )}
              </div>
            ))}
          </>
        ) : assignmentId && !loading ? (
          <div style={styles.emptyState}>
            No users have completed this assignment yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}
