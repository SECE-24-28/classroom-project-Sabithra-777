import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 1.5rem",
        background: "linear-gradient(135deg, #f56565 0%, #e53e3e 100%)",
        color: "white",
        border: "none",
        borderRadius: "12px",
        fontSize: "0.875rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.3s",
        boxShadow: "0 4px 15px rgba(245, 101, 101, 0.4)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(245, 101, 101, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(245, 101, 101, 0.4)";
      }}
    >
      <LogOut size={18} />
      Logout
    </button>
  );
};

export default LogoutButton;

