import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Upload, FileText, Calendar, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const AssignmentSubmissionForm = ({ assignmentId, onSubmit }) => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      toast.warning('Please select a PDF file');
    }
  };

  const submitAssignment = async () => {
    if (!selectedFile) {
      toast.warning('Please select a PDF file to submit');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:21000/api/v1/User/submitTest', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user.id,
          assignmentId
        })
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success('Assignment submitted successfully! Check "My Grades" to see your submission.');
        setSelectedFile(null);
        onSubmit();
      } else {
        toast.error(data.message || 'Submission failed');
      }
    } catch (error) {
      toast.error('Submission failed');
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

const CountdownTimer = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(deadline).getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft('Expired');
        clearInterval(timer);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: timeLeft === 'Expired' ? '#e53e3e' : '#667eea', fontWeight: '600' }}>
      <Clock size={16} />
      {timeLeft}
    </div>
  );
};

const AssignmentSubmission = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState({});

  useEffect(() => {
    fetchAssignments();
    fetchSubmissions();
  }, []);

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:21000/api/v1/User/allAssignments', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user.id })
      });
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

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:21000/api/v1/User/submissions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user.id })
      });
      const data = await response.json();
      if (data.success) {
        const submissionMap = {};
        data.submissions.forEach(sub => {
          const assignmentId = sub.assignment?._id || sub.assignment;
          submissionMap[assignmentId] = sub;
        });
        setSubmissions(submissionMap);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const styles = {
    container: {
      padding: "2rem",
      maxWidth: "1100px",
      margin: "0 auto",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "800",
      color: "white",
      marginBottom: "2.5rem",
      textAlign: "center",
      textShadow: "0 4px 10px rgba(0,0,0,0.2)",
    },
    assignmentCard: {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2rem",
      marginBottom: "1.5rem",
      boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      transition: "all 0.3s ease",
    },
    assignmentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem',
      gap: '1rem',
    },
    assignmentTitle: {
      fontSize: "1.4rem",
      fontWeight: "700",
      color: "#1a202c",
      marginBottom: "0.5rem",
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
      padding: "4rem 2rem",
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      color: "#64748b",
      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
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
        assignments.map((assignment) => {
          const isSubmitted = !!submissions[assignment._id];
          return (
            <div key={assignment._id} style={styles.assignmentCard}>
              <div style={styles.assignmentHeader}>
                <div>
                  <h3 style={styles.assignmentTitle}>{assignment.assignmentName}</h3>
                  <div style={styles.deadline}>
                    <Calendar size={16} />
                    Due: {new Date(assignment.deadline).toLocaleDateString()}
                  </div>
                </div>
                {!isSubmitted && <CountdownTimer deadline={assignment.deadline} />}
              </div>
              
              {isSubmitted ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  background: '#d1fae5',
                  color: '#065f46',
                  borderRadius: '8px',
                  fontWeight: '600',
                  marginTop: '1rem'
                }}>
                  <CheckCircle size={20} />
                  Submitted
                </div>
              ) : (
                <AssignmentSubmissionForm 
                  assignmentId={assignment._id}
                  onSubmit={() => {
                    fetchAssignments();
                    fetchSubmissions();
                  }}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default AssignmentSubmission;
