import { useState, useEffect } from "react";
import { userAPI } from '../../config/api';
export default function UserAssignmentDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submittingId, setSubmittingId] = useState(null);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  useEffect(() => {
    if (user.id) {
      if (!user.active) {
        setError('Your account is pending admin approval. Please contact your admin.');
        return;
      }
      fetchAssignments();
    }
  }, [user.id]);

  const fetchAssignments = async () => {
    if (!user.id) {
      setError("User not logged in");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await userAPI.getAssignments(user.id);

      if (response.data.success) {
        setAssignments(response.data.assignmentList || []);
      } else {
        setError(response.data.message || "Failed to fetch assignments");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Error fetching assignments"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitTest = async (assignmentId, file) => {
    if (!file) {
      setError("Please select a PDF file to upload");
      return;
    }
    
    setSubmittingId(assignmentId);
    setError("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append('userId', user.id);
      formData.append('assignmentId', assignmentId);
      formData.append('assignmentFile', file);
      
      const response = await userAPI.submitAssignment(formData);

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setAssignments((prev) => prev.filter((a) => a._id !== assignmentId));
      } else {
        setError(response.data.message || "Failed to submit assignment");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Error submitting assignment"
      );
    } finally {
      setSubmittingId(null);
    }
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

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  const getDaysLeft = (deadline) => {
    const diff = new Date(deadline) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "2rem",
    },
    wrapper: {
      maxWidth: "1400px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#1e3a8a",
      marginBottom: "0.5rem",
      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
    },
    subtitle: {
      fontSize: "1.125rem",
      color: "rgba(255,255,255,0.9)",
    },
    searchBox: {
      background: "white",
      padding: "2rem",
      borderRadius: "16px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
      marginBottom: "2rem",
    },
    inputWrapper: {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
    },
    input: {
      flex: 1,
      padding: "1rem 1.5rem",
      border: "2px solid #e5e7eb",
      borderRadius: "12px",
      fontSize: "1rem",
      outline: "none",
      transition: "all 0.3s",
    },
    button: {
      padding: "1rem 2rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    },
    messageBox: (type) => ({
      padding: "1rem 1.5rem",
      background: type === "error" ? "#fee" : "#d1fae5",
      border: `2px solid ${type === "error" ? "#fcc" : "#a7f3d0"}`,
      borderRadius: "12px",
      color: type === "error" ? "#c00" : "#065f46",
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      fontWeight: "500",
    }),
    loadingContainer: {
      textAlign: "center",
      padding: "4rem 0",
    },
    spinner: {
      display: "inline-block",
      width: "60px",
      height: "60px",
      border: "6px solid rgba(255,255,255,0.3)",
      borderTop: "6px solid white",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    loadingText: {
      marginTop: "1.5rem",
      color: "white",
      fontSize: "1.125rem",
      fontWeight: "500",
    },
    statsBar: {
      background: "white",
      padding: "1.5rem",
      borderRadius: "16px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
      marginBottom: "2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    statsTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1f2937",
    },
    badge: {
      padding: "0.5rem 1.25rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      borderRadius: "999px",
      fontWeight: "600",
      fontSize: "1rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      gap: "1.5rem",
    },
    card: {
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      transition: "transform 0.3s, box-shadow 0.3s",
      position: "relative",
    },
    cardHeader: {
      padding: "1.5rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
    },
    cardTitle: {
      fontSize: "1.375rem",
      fontWeight: "700",
      marginBottom: "0.75rem",
      lineHeight: "1.4",
    },
    cardBody: {
      padding: "1.5rem",
    },
    infoRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "1rem",
      fontSize: "0.9375rem",
      color: "#4b5563",
    },
    icon: {
      width: "20px",
      height: "20px",
      flexShrink: 0,
    },
    deadlineBox: (overdue) => ({
      padding: "1rem",
      background: overdue ? "#fee" : "#f0fdf4",
      border: `2px solid ${overdue ? "#fca5a5" : "#86efac"}`,
      borderRadius: "12px",
      marginBottom: "1.25rem",
    }),
    deadlineLabel: {
      fontSize: "0.875rem",
      fontWeight: "600",
      color: "#6b7280",
      marginBottom: "0.25rem",
    },
    deadlineValue: (overdue) => ({
      fontSize: "1.125rem",
      fontWeight: "700",
      color: overdue ? "#dc2626" : "#16a34a",
    }),
    daysLeftBadge: (overdue) => ({
      display: "inline-block",
      padding: "0.375rem 0.875rem",
      background: overdue ? "#fee" : "#dbeafe",
      color: overdue ? "#dc2626" : "#1d4ed8",
      borderRadius: "999px",
      fontSize: "0.8125rem",
      fontWeight: "600",
      marginTop: "0.5rem",
    }),
    submitButton: (disabled) => ({
      width: "100%",
      padding: "1rem",
      background: disabled
        ? "#d1d5db"
        : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
      boxShadow: disabled ? "none" : "0 4px 15px rgba(16, 185, 129, 0.4)",
    }),
    emptyState: {
      textAlign: "center",
      padding: "4rem 2rem",
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    },
    emptyIcon: {
      fontSize: "4rem",
      marginBottom: "1rem",
    },
    emptyTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "0.5rem",
    },
    emptyText: {
      fontSize: "1rem",
      color: "#6b7280",
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
          .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2) !important;
          }
          .button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6) !important;
          }
          .submit-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6) !important;
          }
          .input:focus {
            border-color: #667eea !important;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1) !important;
          }
        `}
      </style>

      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>📚 Assignment Dashboard</h1>
          <p style={styles.subtitle}>
            Manage and submit your assignments with ease
          </p>
        </div>

        {!user.active && (
          <div style={styles.searchBox}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>⏳ Account Pending Approval</h3>
              <p style={{ color: '#6b7280' }}>Your account is waiting for admin approval. Please contact your college admin.</p>
            </div>
          </div>
        )}
        
        {user.active && (
          <div style={styles.searchBox}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>Welcome, {user.firstName}!</h3>
              <p style={{ color: '#6b7280' }}>College: {user.collegeName}</p>
              <button
                onClick={fetchAssignments}
                disabled={loading}
                style={styles.button}
                className="button"
              >
                {loading ? "Loading..." : "Refresh Assignments"}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div style={styles.messageBox("error")}>
            <span style={{ fontSize: "1.5rem" }}>⚠️</span>
            {error}
          </div>
        )}

        {successMessage && (
          <div style={styles.messageBox("success")}>
            <span style={{ fontSize: "1.5rem" }}>✓</span>
            {successMessage}
          </div>
        )}

        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loading your assignments...</p>
          </div>
        ) : user.active && assignments.length > 0 ? (
          <>
            <div style={styles.statsBar}>
              <h2 style={styles.statsTitle}>Your Pending Assignments</h2>
              <span style={styles.badge}>{assignments.length} Active</span>
            </div>

            <div style={styles.grid}>
              {assignments.map((assignment) => {
                const overdue = isOverdue(assignment.deadline);
                const daysLeft = getDaysLeft(assignment.deadline);

                return (
                  <div
                    key={assignment._id}
                    style={styles.card}
                    className="card"
                  >
                    <div style={styles.cardHeader}>
                      <h3 style={styles.cardTitle}>
                        {assignment.assignmentName}
                      </h3>
                    </div>

                    <div style={styles.cardBody}>
                      <div style={styles.deadlineBox(overdue)}>
                        <div style={styles.deadlineLabel}>
                          {overdue ? "⚠️ OVERDUE" : "📅 Deadline"}
                        </div>
                        <div style={styles.deadlineValue(overdue)}>
                          {formatDate(assignment.deadline)}
                        </div>
                        <div style={styles.daysLeftBadge(overdue)}>
                          {overdue
                            ? `${Math.abs(daysLeft)} days overdue`
                            : daysLeft === 0
                            ? "Due today!"
                            : daysLeft === 1
                            ? "1 day left"
                            : `${daysLeft} days left`}
                        </div>
                      </div>

                      <div style={styles.infoRow}>
                        <svg
                          style={styles.icon}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span>Assignment ID: {assignment._id}</span>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <input
                          type="file"
                          accept=".pdf"
                          id={`file-${assignment._id}`}
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const fileInput = e.target;
                            const submitBtn = document.getElementById(`submit-${assignment._id}`);
                            if (fileInput.files[0]) {
                              submitBtn.onclick = () => handleSubmitTest(assignment._id, fileInput.files[0]);
                              submitBtn.textContent = `Submit ${fileInput.files[0].name}`;
                              submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                            }
                          }}
                        />
                        <label
                          htmlFor={`file-${assignment._id}`}
                          style={{
                            display: 'block',
                            padding: '12px',
                            background: '#f3f4f6',
                            border: '2px dashed #d1d5db',
                            borderRadius: '8px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            marginBottom: '1rem',
                            fontSize: '14px',
                            color: '#6b7280'
                          }}
                        >
                          📄 Click to select PDF file
                        </label>
                      </div>
                      
                      <button
                        id={`submit-${assignment._id}`}
                        onClick={() => setError("Please select a PDF file first")}
                        disabled={submittingId === assignment._id}
                        style={{
                          ...styles.submitButton(submittingId === assignment._id),
                          background: '#9ca3af'
                        }}
                        className="submit-button"
                      >
                        {submittingId === assignment._id
                          ? "Submitting..."
                          : "Select PDF to Submit"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : user.active && !loading ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🎉</div>
            <h3 style={styles.emptyTitle}>All Clear!</h3>
            <p style={styles.emptyText}>
              You don't have any pending assignments at the moment.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
