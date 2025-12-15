import { useState, useEffect } from 'react';
import { userAPI } from '../config/api';

const UserSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (user.id) {
      fetchSubmissions();
    }
  }, [user.id]);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await userAPI.getUserSubmissions(user.id);
      if (response.data.success) {
        setSubmissions(response.data.data || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching submissions');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: 'white',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    },
    submissionItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      marginBottom: '1rem',
    },
    marksContainer: (hasMarks) => ({
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      background: hasMarks ? '#d1fae5' : '#fef3c7',
      color: hasMarks ? '#065f46' : '#92400e',
      fontWeight: 'bold',
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
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>
                    {submission.assignment?.assignmentName || 'Assignment'}
                  </h4>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                    Submitted: {new Date(submission.completedTime).toLocaleDateString()}
                  </p>
                  {submission.feedback && (
                    <p style={{ margin: '0.5rem 0 0 0', color: '#4b5563', fontSize: '0.9rem' }}>
                      <strong>Feedback:</strong> {submission.feedback}
                    </p>
                  )}
                </div>
                
                <div style={styles.marksContainer(submission.marks !== null)}>
                  {submission.marks !== null ? (
                    `${submission.marks} marks`
                  ) : (
                    'Pending'
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