import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Users } from 'lucide-react';

const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:21000/api/v1/Admin/collegeUsers/${user.id}`);
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#718096',
      fontSize: '1rem',
    },
    userCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0',
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
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#1a202c',
      marginBottom: '0.25rem',
    },
    userMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: '#718096',
      marginTop: '0.25rem',
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem',
      color: '#718096',
    },
  };

  if (loading) {
    return <div style={styles.container}>Loading users...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Users</h1>
        <p style={styles.subtitle}>
          <Users size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
          {users.length} approved student{users.length !== 1 ? 's' : ''} in your college
        </p>
      </div>

      {users.length === 0 ? (
        <div style={styles.emptyState}>
          <User size={48} color="#cbd5e0" />
          <p>No approved users found</p>
        </div>
      ) : (
        users.map((student) => (
          <div key={student._id} style={styles.userCard}>
            <div style={styles.avatar}>
              {student.firstName.charAt(0).toUpperCase()}
            </div>
            <div style={styles.userInfo}>
              <div style={styles.userName}>{student.firstName}</div>
              <div style={styles.userMeta}>
                <Mail size={14} />
                {student.email}
              </div>
              <div style={styles.userMeta}>
                <Calendar size={14} />
                Joined: {new Date(student.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageUsers;
