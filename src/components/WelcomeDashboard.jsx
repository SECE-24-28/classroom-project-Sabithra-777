import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Users, Award, Clock } from 'lucide-react';

const WelcomeDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchAdminStats();
    } else {
      fetchUserStats();
    }
  }, [isAdmin]);

  const fetchAdminStats = async () => {
    try {
      const response = await fetch(`http://localhost:21000/api/v1/Admin/stats/${user.id}`);
      const data = await response.json();
      
      if (data.success) {
        setStats([
          { icon: <Users size={24} />, label: 'Total Students', value: data.data.totalStudents, color: '#3b82f6' },
          { icon: <BookOpen size={24} />, label: 'Total Assignments', value: data.data.totalAssignments, color: '#f59e0b' },
          { icon: <Clock size={24} />, label: 'Pending Approvals', value: data.data.pendingApprovals, color: '#ef4444' },
          { icon: <Award size={24} />, label: 'Total Submissions', value: data.data.totalSubmissions, color: '#10b981' },
        ]);
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    setStats([
      { icon: <BookOpen size={24} />, label: 'Active Assignments', value: '0', color: '#3b82f6' },
      { icon: <Clock size={24} />, label: 'Pending Submissions', value: '0', color: '#f59e0b' },
      { icon: <Award size={24} />, label: 'Completed', value: '0', color: '#10b981' },
    ]);
    setLoading(false);
  };

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    welcomeCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '3rem 2rem',
      marginBottom: '2rem',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    welcomeTitle: {
      fontSize: '2.5rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1rem',
    },
    welcomeSubtitle: {
      fontSize: '1.15rem',
      color: '#4a5568',
      marginBottom: '1.5rem',
      lineHeight: '1.6',
    },
    roleTag: {
      display: 'inline-block',
      padding: '0.75rem 1.5rem',
      background: isAdmin ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white',
      borderRadius: '30px',
      fontSize: '0.9rem',
      fontWeight: '700',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      textShadow: '0 1px 2px rgba(0,0,0,0.2)',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem',
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    statIcon: (color) => ({
      width: '70px',
      height: '70px',
      borderRadius: '18px',
      background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      boxShadow: `0 8px 20px ${color}40`,
    }),
    statContent: {
      flex: 1,
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: '800',
      color: '#1a202c',
      marginBottom: '0.25rem',
    },
    statLabel: {
      fontSize: '0.95rem',
      color: '#64748b',
      fontWeight: '500',
    },
    quickActions: {
      background: 'white',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1a202c',
      marginBottom: '1rem',
    },
    actionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
    },
    actionButton: {
      padding: '1rem',
      background: '#f8fafc',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      textAlign: 'center',
    },
    actionTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#1a202c',
      marginTop: '0.5rem',
    },
  };

  if (loading) {
    return <div style={styles.container}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.welcomeCard}>
        <h1 style={styles.welcomeTitle}>
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p style={styles.welcomeSubtitle}>
          {isAdmin 
            ? 'Manage your learning platform and track student progress'
            : 'Continue your learning journey and track your progress'
          }
        </p>
        <span style={styles.roleTag}>
          {isAdmin ? '👨‍💼 Administrator' : '🎓 Student'}
        </span>
      </div>

      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={styles.statIcon(stat.color)}>
              {stat.icon}
            </div>
            <div style={styles.statContent}>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default WelcomeDashboard;