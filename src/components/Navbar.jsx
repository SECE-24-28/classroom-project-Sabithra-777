import { useNavigate } from 'react-router-dom';

const Navbar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');
  const isLoggedIn = user.id || admin.id;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const userNavItems = [
    { id: 'assignments', label: 'My Assignments', icon: '📚' },
    { id: 'my-submissions', label: 'My Grades', icon: '📊' },
    { id: 'send-request', label: 'Send Request', icon: '📝' },
  ];

  const adminNavItems = [
    { id: 'create-assignment', label: 'Create Assignment', icon: '➕' },
    { id: 'user-requests', label: 'User Requests', icon: '👥' },
    { id: 'grade-submissions', label: 'Grade Submissions', icon: '✅' },
    { id: 'assignment-results', label: 'All Results', icon: '📊' },
  ];

  const navItems = admin.id ? adminNavItems : userNavItems;

  const styles = {
    navbar: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem 2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
    },
    logo: {
      color: 'white',
      margin: 0,
      fontSize: '1.8rem',
      fontWeight: '800',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      letterSpacing: '0.5px',
    },
    navButtons: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap',
    },
    navButton: (isActive) => ({
      padding: '0.75rem 1.25rem',
      background: isActive 
        ? 'rgba(255,255,255,0.25)' 
        : 'rgba(255,255,255,0.1)',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
      boxShadow: isActive 
        ? '0 4px 15px rgba(255,255,255,0.2)' 
        : '0 2px 8px rgba(0,0,0,0.1)',
      transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
    }),
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    welcomeText: {
      color: 'white',
      fontSize: '0.95rem',
      fontWeight: '500',
      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    },
    authButtons: {
      display: 'flex',
      gap: '0.75rem',
    },
    authButton: (isPrimary) => ({
      padding: '0.75rem 1.5rem',
      background: isPrimary 
        ? 'rgba(255,255,255,0.2)' 
        : 'transparent',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.4)',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    }),
    logoutButton: {
      padding: '0.75rem 1.5rem',
      background: 'rgba(255,255,255,0.15)',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    },
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.leftSection}>
          <h1 style={styles.logo}>
            🎓 LMS Dashboard
          </h1>
          
          {isLoggedIn && (
            <div style={styles.navButtons}>
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={styles.navButton(activeTab === item.id)}
                  onMouseEnter={(e) => {
                    if (activeTab !== item.id) {
                      e.target.style.background = 'rgba(255,255,255,0.2)';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(255,255,255,0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== item.id) {
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }
                  }}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={styles.rightSection}>
          {isLoggedIn ? (
            <>
              <span style={styles.welcomeText}>
                Welcome, {user.firstName || admin.firstName}! 👋
              </span>
              <button
                onClick={handleLogout}
                style={styles.logoutButton}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.25)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.15)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <div style={styles.authButtons}>
              <button
                onClick={() => navigate('/login')}
                style={styles.authButton(false)}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.15)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🔑 Login
              </button>
              <button
                onClick={() => navigate('/register')}
                style={styles.authButton(true)}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.3)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                📝 Register
              </button>
            </div>
          )}
        </div>
      </nav>
      
      <style>{`
        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          .nav-buttons {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;