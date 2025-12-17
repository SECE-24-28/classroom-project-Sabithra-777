import { useState, useEffect } from "react";
import { adminAPI } from "../config/api";

const AdminGrading = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gradingId, setGradingId] = useState(null);

  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  const fetchAssignmentByName = async (assignmentName) => {
    setLoading(true);
    try {
      const response = await adminAPI.getAssignmentByName(
        assignmentName,
        admin.id
      );
      if (response.data.success) {
        setSubmissions(response.data.data.assignmentCompleted || []);
        setSelectedAssignment(response.data.data);
      } else {
        alert("Assignment not found");
        setSubmissions([]);
        setSelectedAssignment(null);
      }
    } catch (error) {
      console.error("Error fetching assignment:", error);
      alert(
        "Error: " + (error.response?.data?.message || "Assignment not found")
      );
      setSubmissions([]);
      setSelectedAssignment(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGradeSubmission = async (submissionId, marks, feedback) => {
    setGradingId(submissionId);
    try {
      const response = await adminAPI.gradeSubmission({
        submissionId,
        marks: parseInt(marks),
        feedback,
      });

      if (response.data.success) {
        // Update local state
        setSubmissions((prev) =>
          prev.map((sub) =>
            sub._id === submissionId
              ? { ...sub, marks: parseInt(marks), feedback }
              : sub
          )
        );
        alert("Marks assigned successfully!");
      }
    } catch (error) {
      alert(
        "Error assigning marks: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setGradingId(null);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "2rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
      color: "white",
    },
    card: {
      background: "white",
      borderRadius: "16px",
      padding: "2rem",
      marginBottom: "1rem",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    },
    assignmentInput: {
      width: "100%",
      padding: "12px",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      marginBottom: "1rem",
      fontSize: "1rem",
    },
    button: {
      padding: "12px 24px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "600",
    },
    submissionCard: {
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1rem",
      background: "#f9fafb",
    },
    gradeForm: {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
      marginTop: "1rem",
    },
    input: {
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "0.9rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          📝 Grade Submissions
        </h1>
        <p>Review and grade student submissions</p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={styles.card}>
          <h3 style={{ marginBottom: "1rem" }}>
            Enter Assignment Name to Grade
          </h3>
          <input
            type="text"
            placeholder="Assignment Name (e.g., Data Structures Lab)"
            style={styles.assignmentInput}
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                fetchAssignmentByName(e.target.value.trim());
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector(
                'input[placeholder*="Assignment Name"]'
              );
              if (input.value.trim()) {
                fetchAssignmentByName(input.value.trim());
              }
            }}
            style={styles.button}
          >
            Load Submissions
          </button>
        </div>

        {loading && (
          <div style={styles.card}>
            <p style={{ textAlign: "center" }}>Loading submissions...</p>
          </div>
        )}

        {selectedAssignment && (
          <div style={styles.card}>
            <h3 style={{ marginBottom: "1rem", color: "#1f2937" }}>
              {selectedAssignment.assignmentName}
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
              Deadline:{" "}
              {new Date(selectedAssignment.deadline).toLocaleDateString()} |
              Submissions: {submissions.length}
            </p>

            {submissions.length === 0 ? (
              <p style={{ textAlign: "center", color: "#6b7280" }}>
                No submissions found for this assignment.
              </p>
            ) : (
              submissions.map((submission) => (
                <div key={submission._id} style={styles.submissionCard}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: "0 0 0.5rem 0", color: "#1f2937" }}>
                        {submission.user?.firstName}{" "}
                        {submission.user?.secondName}
                      </h4>
                      <p
                        style={{
                          margin: "0 0 0.5rem 0",
                          color: "#6b7280",
                          fontSize: "0.9rem",
                        }}
                      >
                        Email: {submission.user?.email}
                      </p>
                      <p
                        style={{
                          margin: "0 0 1rem 0",
                          color: "#6b7280",
                          fontSize: "0.9rem",
                        }}
                      >
                        Submitted:{" "}
                        {new Date(submission.completedTime).toLocaleString()}
                      </p>

                      {submission.filePath && (
                        <a
                          href={`http://51.20.66.94:8080/${submission.filePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            background: "#3b82f6",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "6px",
                            fontSize: "0.9rem",
                            marginBottom: "1rem",
                          }}
                        >
                          📄 View PDF Submission
                        </a>
                      )}
                    </div>

                    <div style={{ textAlign: "right" }}>
                      {submission.marks !== null ? (
                        <div>
                          <div
                            style={{
                              padding: "0.5rem 1rem",
                              background: "#d1fae5",
                              color: "#065f46",
                              borderRadius: "20px",
                              fontWeight: "bold",
                              marginBottom: "0.5rem",
                            }}
                          >
                            {submission.marks} marks
                          </div>
                          {submission.feedback && (
                            <p
                              style={{
                                fontSize: "0.8rem",
                                color: "#6b7280",
                                margin: 0,
                              }}
                            >
                              Feedback: {submission.feedback}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div
                          style={{
                            padding: "0.5rem 1rem",
                            background: "#fef3c7",
                            color: "#92400e",
                            borderRadius: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Not Graded
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={styles.gradeForm}>
                    <input
                      type="number"
                      placeholder="Marks"
                      min="0"
                      max="100"
                      style={styles.input}
                      id={`marks-${submission._id}`}
                      defaultValue={submission.marks || ""}
                    />
                    <input
                      type="text"
                      placeholder="Feedback (optional)"
                      style={{ ...styles.input, flex: 1 }}
                      id={`feedback-${submission._id}`}
                      defaultValue={submission.feedback || ""}
                    />
                    <button
                      onClick={() => {
                        const marks = document.getElementById(
                          `marks-${submission._id}`
                        ).value;
                        const feedback = document.getElementById(
                          `feedback-${submission._id}`
                        ).value;
                        if (marks) {
                          handleGradeSubmission(
                            submission._id,
                            marks,
                            feedback
                          );
                        } else {
                          alert("Please enter marks");
                        }
                      }}
                      disabled={gradingId === submission._id}
                      style={{
                        ...styles.button,
                        background:
                          gradingId === submission._id
                            ? "#9ca3af"
                            : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                        cursor:
                          gradingId === submission._id
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      {gradingId === submission._id ? "Saving..." : "Grade"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGrading;
