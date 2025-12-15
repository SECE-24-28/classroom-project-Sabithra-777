import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../config/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '3rem',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      width: '100%',
      maxWidth: '450px',
      position: 'relative',
      overflow: 'hidden',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2.5rem',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1rem',
      fontWeight: '500',
    },
    toggleContainer: {
      display: 'flex',
      background: '#f3f4f6',
      borderRadius: '16px',
      padding: '4px',
      marginBottom: '2rem',
      position: 'relative',
    },
    toggleButton: (active) => ({
      flex: 1,
      padding: '12px 20px',
      background: active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
      color: active ? 'white' : '#6b7280',
      border: 'none',
      borderRadius: '12px',
      fontSize: '0.95rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      zIndex: 1,
    }),
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    inputGroup: {
      position: 'relative',
    },
    label: {
      display: 'block',
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem',
    },
    input: {
      width: '100%',
      padding: '16px 20px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      background: '#ffffff',
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.1)',
      outline: 'none',
    },
    errorMessage: {
      background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
      color: '#dc2626',
      padding: '12px 16px',
      borderRadius: '12px',
      fontSize: '0.9rem',
      fontWeight: '500',
      border: '1px solid #fca5a5',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    submitButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '16px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
      opacity: loading ? 0.7 : 1,
      transform: loading ? 'scale(0.98)' : 'scale(1)',
    },
    linkContainer: {
      textAlign: 'center',
      marginTop: '2rem',
      padding: '1.5rem 0',
      borderTop: '1px solid #e5e7eb',
    },
    linkText: {
      color: '#6b7280',
      fontSize: '0.95rem',
    },
    link: {
      color: '#667eea',
      fontWeight: '600',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    decorativeElement: {
      position: 'absolute',
      top: '-50px',
      right: '-50px',
      width: '100px',
      height: '100px',
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
      borderRadius: '50%',
      zIndex: 0,
    },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = isAdmin 
        ? await authAPI.adminLogin(formData)
        : await authAPI.login(formData);
      
      if (response.data.success) {
        if (isAdmin) {
          localStorage.setItem('adminToken', response.data.token);
          localStorage.setItem('admin', JSON.stringify(response.data.admin));
          navigate('/dashboard');
        } else {
          const user = response.data.user;
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(user));
          
          if (!user.active) {
            setError('Your account is pending admin approval. Please wait.');
            return;
          }
          
          navigate('/dashboard');
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.decorativeElement}></div>
        
        <div style={styles.header}>
          <h1 style={styles.title}>🎓 Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        <div style={styles.toggleContainer}>
          <button
            type="button"
            onClick={() => setIsAdmin(false)}
            style={styles.toggleButton(!isAdmin)}
          >
            👨‍🎓 Student
          </button>
          <button
            type="button"
            onClick={() => setIsAdmin(true)}
            style={styles.toggleButton(isAdmin)}
          >
            👨‍🏫 Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Enter your email"
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div style={styles.errorMessage}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.submitButton}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = loading ? 'scale(0.98)' : 'scale(1)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            }}
          >
            {loading ? '🔄 Signing in...' : `🚀 Sign in as ${isAdmin ? 'Admin' : 'Student'}`}
          </button>
        </form>
        
        <div style={styles.linkContainer}>
          <p style={styles.linkText}>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#5a67d8'}
              onMouseLeave={(e) => e.target.style.color = '#667eea'}
            >
              Create one here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;