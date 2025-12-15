import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import CreateAssignmentPage from './assignment-create-page/assignment-create-page-component';
import UserRequestsPage from './admin-request-page/admin-request-page';
import AssignmentResults from './assignment-results-backend/assignment-results-backend-component';
import UserAssignmentDashboard from './user-assignment-page/user-assignment-page-component';
import UserRequestForm from './UserRequestForm';
import UserSubmissions from './UserSubmissions';
import AdminGrading from './AdminGrading';

const Dashboard = () => {
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [activeTab, setActiveTab] = useState(admin.id ? 'create-assignment' : 'assignments');
  const [isLoading, setIsLoading] = useState(false);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    contentWrapper: {
      position: 'relative',
      minHeight: 'calc(100vh - 80px)',
      overflow: 'hidden',
    },
    contentContainer: {
      padding: 0,
      background: 'transparent',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isLoading ? 'translateY(10px)' : 'translateY(0)',
      opacity: isLoading ? 0.7 : 1,
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
      backdropFilter: 'blur(5px)',
    },
    spinner: {
      width: '50px',
      height: '50px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    tabIndicator: {
      position: 'fixed',
      top: '80px',
      left: '2rem',
      background: 'rgba(102, 126, 234, 0.1)',
      color: '#667eea',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '600',
      zIndex: 100,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(102, 126, 234, 0.2)',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.1)',
    },
  };

  const tabNames = {
    'assignments': admin.id ? 'Assignment Dashboard' : 'My Assignments',
    'send-request': 'Send Request to Admin',
    'my-submissions': 'My Submissions & Grades',
    'create-assignment': 'Create New Assignment',
    'user-requests': 'Manage User Requests',
    'assignment-results': 'All Assignment Results',
    'grade-submissions': 'Grade Submissions',
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'assignments':
        return <UserAssignmentDashboard />;
      case 'send-request':
        return <UserRequestForm />;
      case 'my-submissions':
        return <UserSubmissions />;
      case 'create-assignment':
        return <CreateAssignmentPage />;
      case 'user-requests':
        return <UserRequestsPage />;
      case 'assignment-results':
        return <AssignmentResults />;
      case 'grade-submissions':
        return <AdminGrading />;
      default:
        return admin.id ? <CreateAssignmentPage /> : <UserAssignmentDashboard />;
    }
  };

  return (
    <>
      <div style={styles.container}>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div style={styles.tabIndicator}>
          📄 {tabNames[activeTab]}
        </div>
        
        <div style={styles.contentWrapper}>
          {isLoading && (
            <div style={styles.loadingOverlay}>
              <div style={styles.spinner}></div>
            </div>
          )}
          
          <div style={styles.contentContainer}>
            {renderContent()}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
        }
        
        @media (max-width: 768px) {
          .tab-indicator {
            position: static;
            margin: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default Dashboard;