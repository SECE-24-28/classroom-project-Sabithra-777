import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FileText, Clock, CheckCircle, Award, Calendar } from 'lucide-react';

const UserSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError('');

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
        setSubmissions(data.submissions || []);
      }
    } catch (err) {
      setError('Error fetching submissions');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      textAlign: 'center',
      marginBottom: '2.5rem',
      color: '#1e3a8a',
    },
    title: {
      fontSize: '2.8rem',
      fontWeight: '800',
      marginBottom: '0.75rem',
      color: '#1e3a8a',
      textShadow: '0 4px 10px rgba(30,58,138,0.2)',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '1rem',
      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    submissionItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
      border: '1px solid rgba(30, 58, 138, 0.5)',
      borderRadius: '16px',
      marginBottom: '1rem',
      transition: 'all 0.3s ease',
      color: 'white',
    },
    marksContainer: (hasMarks) => ({
      padding: '0.75rem 1.5rem',
      borderRadius: '30px',
      background: hasMarks ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      color: 'white',
      fontWeight: '700',
      boxShadow: hasMarks ? '0 4px 15px rgba(16, 185, 129, 0.3)' : '0 4px 15px rgba(251, 191, 36, 0.3)',
      textShadow: '0 1px 2px rgba(0,0,0,0.2)',
    }),
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Loading submissions...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📊 My Submissions</h1>
        <p>View your submitted assignments and grades</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {error && (
          <div style={styles.card}>
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          </div>
        )}

        {submissions.length === 0 ? (
          <div style={styles.card}>
            <p style={{ textAlign: 'center', color: '#6b7280' }}>
              No submissions found. Submit some assignments to see them here.
            </p>
          </div>
        ) : (
          <div style={styles.card}>
            <h3 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>
              Submitted Assignments ({submissions.length})
            </h3>
            
            {submissions.map((submission) => (
              <div key={submission._id} style={styles.submissionItem}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={20} color="white" />
                    {submission.assignment?.assignmentName || 'Assignment'}
                  </h4>
                  <p style={{ margin: '0 0 0.25rem 0', color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={14} />
                    Submitted: {submission.submittedAt ? new Date(submission.submittedAt).toLocaleDateString() : 'N/A'}
                  </p>
                  {submission.assignment?.deadline && (
                    <p style={{ margin: '0 0 0.25rem 0', color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={14} />
                      Deadline: {new Date(submission.assignment.deadline).toLocaleDateString()}
                    </p>
                  )}
                  {submission.feedback && (
                    <p style={{ margin: '0.5rem 0 0 0', color: 'rgba(255,255,255,0.95)', fontSize: '0.9rem' }}>
                      <strong>Feedback:</strong> {submission.feedback}
                    </p>
                  )}
                </div>
                
                <div style={styles.marksContainer(submission.marks !== null)}>
                  {submission.marks !== null ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Award size={18} />
                      {submission.marks} marks
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={18} />
                      Waiting for grading
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSubmissions;