import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FileText, User, Calendar, Star } from "lucide-react";

const AdminSubmissionReview = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [grading, setGrading] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdminAssignments();
  }, []);

  const fetchAdminAssignments = async () => {
    try {
      const response = await fetch(
        `http://51.20.66.94:8080/api/v1/Admin/getAllRequests/${user.id}`
      );
      const data = await response.json();

      // Mock assignments for now since we need to get admin's created assignments
      setAssignments([
        { _id: "1", assignmentName: "Math Assignment 1" },
        { _id: "2", assignmentName: "Science Project" },
      ]);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const fetchSubmissions = async (assignmentId) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://51.20.66.94:8080/api/v1/Admin/fetchResult",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assignmentId }),
        }
      );
      const data = await response.json();

      if (data.success) {
        setSubmissions(data.data?.assignmentCompleted || []);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const gradeSubmission = async (submissionId) => {
    const grade = grading[submissionId];
    if (!grade?.marks) {
      alert("Please enter marks");
      return;
    }

    try {
      const response = await fetch(
        "http://51.20.66.94:8080/api/v1/Admin/gradeSubmission",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submissionId,
            marks: grade.marks,
            feedback: grade.feedback || "",
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Submission graded successfully!");
        fetchSubmissions(selectedAssignment);
        setGrading((prev) => ({ ...prev, [submissionId]: {} }));
      }
    } catch (error) {
      alert("Failed to grade submission");
    }
  };

  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1a202c",
      marginBottom: "2rem",
    },
    select: {
      width: "100%",
      padding: "0.75rem",
      border: "2px solid #e2e8f0",
      borderRadius: "8px",
      marginBottom: "2rem",
      fontSize: "1rem",
    },
    submissionCard: {
      background: "white",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1rem",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      border: "1px solid #e2e8f0",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1rem",
    },
    gradingSection: {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
      marginTop: "1rem",
    },
    input: {
      padding: "0.5rem",
      border: "2px solid #e2e8f0",
      borderRadius: "6px",
      width: "100px",
    },
    textarea: {
      padding: "0.5rem",
      border: "2px solid #e2e8f0",
      borderRadius: "6px",
      width: "200px",
      height: "60px",
      resize: "vertical",
    },
    gradeButton: {
      padding: "0.5rem 1rem",
      background: "#667eea",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
    },
    gradedBadge: {
      padding: "0.25rem 0.75rem",
      background: "#d1fae5",
      color: "#065f46",
      borderRadius: "20px",
      fontSize: "0.75rem",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Review Submissions</h1>

      <select
        value={selectedAssignment}
        onChange={(e) => {
          setSelectedAssignment(e.target.value);
          if (e.target.value) fetchSubmissions(e.target.value);
        }}
        style={styles.select}
      >
        <option value="">Select Assignment</option>
        {assignments.map((assignment) => (
          <option key={assignment._id} value={assignment._id}>
            {assignment.assignmentName}
          </option>
        ))}
      </select>

      {loading && <p>Loading submissions...</p>}

      {submissions.length === 0 && selectedAssignment && !loading && (
        <p>No submissions found for this assignment.</p>
      )}

      {submissions.map((submission) => (
        <div key={submission._id} style={styles.submissionCard}>
          <div style={styles.userInfo}>
            <User size={20} />
            <div>
              <h4>{submission.user?.firstName}</h4>
              <p style={{ margin: 0, color: "#718096", fontSize: "0.875rem" }}>
                Submitted: {new Date(submission.submittedAt).toLocaleString()}
              </p>
            </div>
          </div>

          {submission.marks !== null ? (
            <div style={styles.gradedBadge}>
              Graded: {submission.marks}/100
              {submission.feedback && (
                <div style={{ marginTop: "0.5rem", fontWeight: "normal" }}>
                  Feedback: {submission.feedback}
                </div>
              )}
            </div>
          ) : (
            <div style={styles.gradingSection}>
              <input
                type="number"
                placeholder="Marks (0-100)"
                min="0"
                max="100"
                value={grading[submission._id]?.marks || ""}
                onChange={(e) =>
                  setGrading((prev) => ({
                    ...prev,
                    [submission._id]: {
                      ...prev[submission._id],
                      marks: e.target.value,
                    },
                  }))
                }
                style={styles.input}
              />
              <textarea
                placeholder="Feedback (optional)"
                value={grading[submission._id]?.feedback || ""}
                onChange={(e) =>
                  setGrading((prev) => ({
                    ...prev,
                    [submission._id]: {
                      ...prev[submission._id],
                      feedback: e.target.value,
                    },
                  }))
                }
                style={styles.textarea}
              />
              <button
                onClick={() => gradeSubmission(submission._id)}
                style={styles.gradeButton}
              >
                Grade
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminSubmissionReview;
