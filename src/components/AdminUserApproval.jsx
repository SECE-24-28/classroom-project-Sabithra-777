import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, CheckCircle, XCircle, Mail, Building, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminUserApproval = () => {
  const { user } = useAuth();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const response = await fetch(`http://localhost:21000/api/v1/Admin/pendingUsers/${user.id}`);
      const data = await response.json();
      
      if (data.success) {
        setPendingUsers(data.data);
      }
    } catch (error) {
      console.error('Error fetching pending users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId, action) => {
    setActionLoading(prev => ({ ...prev, [userId]: action }));
    
    try {
      const response = await fetch('http://localhost:21000/api/v1/Admin/approveUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          action: action === 'approve' ? 'accept' : 'reject',
          adminId: user.id
        })
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success(`User ${action}d successfully!`);
        fetchPendingUsers();
      } else {
        toast.error(data.message || 'Action failed');
      }
    } catch (error) {
      toast.error('Action failed');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: null }));
    }
  };

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    userCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0',
    },
    userHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    avatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '700',
      fontSize: '1.2rem',
    },
    userDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
    },
    userName: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#1a202c',
    },
    userMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: '#718096',
    },
    actions: {
      display: 'flex',
      gap: '0.75rem',
    },
    actionButton: (type, isLoading) => ({
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: 'none',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      opacity: isLoading ? 0.7 : 1,
      background: type === 'approve' ? '#10b981' : '#ef4444',
      color: 'white',
    }),
    emptyState: {
      textAlign: 'center',
      padding: '3rem',
      color: '#718096',
    },
  };

  if (loading) {
    return <div style={styles.container}>Loading pending users...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>New User Requests from Your College</h1>
      
      {pendingUsers.length === 0 ? (
        <div style={styles.emptyState}>
          <User size={48} color="#cbd5e0" />
          <p>No pending user requests</p>
        </div>
      ) : (
        pendingUsers.map(pendingUser => (
          <div key={pendingUser._id} style={styles.userCard}>
            <div style={styles.userHeader}>
              <div style={styles.userInfo}>
                <div style={styles.avatar}>
                  {pendingUser.firstName.charAt(0)}
                </div>
                <div style={styles.userDetails}>
                  <div style={styles.userName}>{pendingUser.firstName}</div>
                  <div style={styles.userMeta}>
                    <Mail size={14} />
                    {pendingUser.email}
                  </div>
                  <div style={styles.userMeta}>
                    <Building size={14} />
                    {pendingUser.collegeName}
                  </div>
                  <div style={styles.userMeta}>
                    <Clock size={14} />
                    {new Date(pendingUser.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div style={styles.actions}>
                <button
                  onClick={() => handleUserAction(pendingUser._id, 'approve')}
                  disabled={!!actionLoading[pendingUser._id]}
                  style={styles.actionButton('approve', actionLoading[pendingUser._id] === 'approve')}
                >
                  <CheckCircle size={16} />
                  {actionLoading[pendingUser._id] === 'approve' ? 'Approving...' : 'Approve'}
                </button>
                
                <button
                  onClick={() => handleUserAction(pendingUser._id, 'reject')}
                  disabled={!!actionLoading[pendingUser._id]}
                  style={styles.actionButton('reject', actionLoading[pendingUser._id] === 'reject')}
                >
                  <XCircle size={16} />
                  {actionLoading[pendingUser._id] === 'reject' ? 'Rejecting...' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminUserApproval;