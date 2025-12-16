import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Upload, FileText, Calendar, Clock } from "lucide-react";

const AssignmentSubmissionForm = ({ assignmentId, onSubmit }) => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a PDF file");
    }
  };

  const submitAssignment = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file to submit");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(
        "http://51.20.66.94:8080/api/v1/User/submitTest",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            assignmentId,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Assignment submitted successfully!");
        setSelectedFile(null);
        onSubmit();
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (error) {
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const styles = {
    fileUpload: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginTop: "1rem",
    },
    fileInput: {
      display: "none",
    },
    fileButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 1rem",
      background: "#f7fafc",
      border: "2px dashed #cbd5e0",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    submitButton: {
      padding: "0.75rem 1.5rem",
      background: "#667eea",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.fileUpload}>
      <label style={styles.fileButton}>
        <Upload size={20} />
        {selectedFile ? selectedFile.name : "Choose PDF file"}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
      </label>

      <button
        onClick={submitAssignment}
        disabled={!selectedFile || submitting}
        style={{
          ...styles.submitButton,
          opacity: !selectedFile || submitting ? 0.5 : 1,
          cursor: !selectedFile || submitting ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? "Submitting..." : "Submit Assignment"}
      </button>
    </div>
  );
};

const AssignmentSubmission = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch(
        "http://51.20.66.94:8080/api/v1/User/allAssignments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setAssignments(data.assignmentList || []);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1a202c",
      marginBottom: "2rem",
      textAlign: "center",
    },
    assignmentCard: {
      background: "white",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.5rem",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      border: "1px solid #e2e8f0",
    },
    assignmentHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    assignmentTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1a202c",
    },
    deadline: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "#e53e3e",
      fontSize: "0.875rem",
    },
    submittedBadge: {
      padding: "0.25rem 0.75rem",
      background: "#d1fae5",
      color: "#065f46",
      borderRadius: "20px",
      fontSize: "0.75rem",
      fontWeight: "600",
    },
    noAssignments: {
      textAlign: "center",
      padding: "3rem",
      color: "#718096",
    },
  };

  if (loading) {
    return <div style={styles.container}>Loading assignments...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Assignments</h1>

      {assignments.length === 0 ? (
        <div style={styles.noAssignments}>
          <FileText size={48} color="#cbd5e0" />
          <p>No assignments available</p>
        </div>
      ) : (
        assignments.map((assignment) => (
          <div key={assignment._id} style={styles.assignmentCard}>
            <div style={styles.assignmentHeader}>
              <h3 style={styles.assignmentTitle}>
                {assignment.assignmentName}
              </h3>
              <div style={styles.deadline}>
                <Calendar size={16} />
                Due: {new Date(assignment.deadline).toLocaleDateString()}
              </div>
            </div>

            {assignment.submitted ? (
              <div style={styles.submittedBadge}>✓ Submitted</div>
            ) : (
              <AssignmentSubmissionForm
                assignmentId={assignment._id}
                onSubmit={() => fetchAssignments()}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AssignmentSubmission;
