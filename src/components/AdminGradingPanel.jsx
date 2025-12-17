import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FileText, Star, MessageSquare } from "lucide-react";

const AdminGradingPanel = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [grading, setGrading] = useState({ marks: "", feedback: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const adminDetails = await fetch(
        `http://51.20.66.94:8080/api/v1/Admin/getAllRequests/${user.id}`
      );
      const data = await adminDetails.json();
      // For now, we'll create mock assignments
      setAssignments([
        { _id: "1", assignmentName: "Math Assignment 1", deadline: new Date() },
        { _id: "2", assignmentName: "Science Project", deadline: new Date() },
      ]);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async (assignmentId) => {
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
        setSubmissions(data.data.assignmentCompleted || []);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const gradeSubmission = async (submissionId) => {
    try {
      const response = await fetch(
        "http://51.20.66.94:8080/api/v1/Admin/gradeSubmission",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submissionId,
            marks: grading.marks,
            feedback: grading.feedback,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Submission graded successfully!");
        setGrading({ marks: "", feedback: "" });
        fetchSubmissions(selectedAssignment);
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
    assignmentList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "1rem",
      marginBottom: "2rem",
    },
    assignmentCard: {
      background: "white",
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      cursor: "pointer",
      border: "2px solid transparent",
      transition: "all 0.3s",
    },
    selectedCard: {
      borderColor: "#667eea",
    },
    submissionCard: {
      background: "white",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1rem",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    gradingForm: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      marginTop: "1rem",
      padding: "1rem",
      background: "#f8fafc",
      borderRadius: "8px",
    },
    input: {
      padding: "0.75rem",
      border: "2px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "1rem",
    },
    textarea: {
      padding: "0.75rem",
      border: "2px solid #e2e8f0",
      borderRadius: "8px",
      fontSize: "1rem",
      minHeight: "100px",
      resize: "vertical",
    },
    gradeButton: {
      padding: "0.75rem 1.5rem",
      background: "#667eea",
      color: "white",
      border: "none",
      borderRadius: "8px",
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
      <h1 style={styles.title}>Grade Submissions</h1>

      <div style={styles.assignmentList}>
        {assignments.map((assignment) => (
          <div
            key={assignment._id}
            style={{
              ...styles.assignmentCard,
              ...(selectedAssignment === assignment._id
                ? styles.selectedCard
                : {}),
            }}
            onClick={() => {
              setSelectedAssignment(assignment._id);
              fetchSubmissions(assignment._id);
            }}
          >
            <h3>{assignment.assignmentName}</h3>
            <p>Due: {new Date(assignment.deadline).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {selectedAssignment && (
        <div>
          <h2>Submissions</h2>
          {submissions.length === 0 ? (
            <p>No submissions yet</p>
          ) : (
            submissions.map((submission) => (
              <div key={submission._id} style={styles.submissionCard}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h4>{submission.user?.firstName}</h4>
                    <p>
                      Submitted:{" "}
                      {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                  </div>

                  {submission.marks ? (
                    <div style={styles.gradedBadge}>
                      Graded: {submission.marks}/100
                    </div>
                  ) : (
                    <div style={styles.gradingForm}>
                      <input
                        type="number"
                        placeholder="Marks (out of 100)"
                        value={grading.marks}
                        onChange={(e) =>
                          setGrading({ ...grading, marks: e.target.value })
                        }
                        style={styles.input}
                        max="100"
                        min="0"
                      />
                      <textarea
                        placeholder="Feedback for student"
                        value={grading.feedback}
                        onChange={(e) =>
                          setGrading({ ...grading, feedback: e.target.value })
                        }
                        style={styles.textarea}
                      />
                      <button
                        onClick={() => gradeSubmission(submission._id)}
                        style={styles.gradeButton}
                      >
                        Submit Grade
                      </button>
                    </div>
                  )}
                </div>

                {submission.feedback && (
                  <div
                    style={{
                      marginTop: "1rem",
                      padding: "1rem",
                      background: "#f0f4ff",
                      borderRadius: "8px",
                    }}
                  >
                    <strong>Feedback:</strong> {submission.feedback}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminGradingPanel;
