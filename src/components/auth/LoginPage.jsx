import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogIn, Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "user", // "user" or "admin"
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ ADDED THESE MISSING STATE VARIABLES
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestData, setRequestData] = useState({
    email: "",
    message: "",
  });

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const endpoint =
        formData.userType === "admin" ? "/User/adminLogin" : "/User/userLogin";

      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await fetch(
        `http://13.60.70.224:8080/api/v1${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();

      if (data.success) {
        login(data.data);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("activeTab", "welcome");
        const dashboardPath =
          data.data.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
        navigate(dashboardPath);
      } else {
        if (data.message === "Waiting for admin approval") {
          toast.warning("Waiting for admin approval");
          // ✅ Show the request form and set email
          setRequestData({ email: formData.email, message: "" });
          setShowRequestForm(true);
        }
        setErrors({ submit: data.message || "Login failed" });
      }
    } catch (error) {
      setErrors({
        submit: "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      background: "white",
      borderRadius: "24px",
      padding: "3rem",
      maxWidth: "500px",
      width: "100%",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    icon: {
      width: "80px",
      height: "80px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1.5rem",
      boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "800",
      color: "#1a202c",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#718096",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    toggleGroup: {
      display: "flex",
      gap: "1rem",
      marginBottom: "0.5rem",
    },
    toggleButton: (active) => ({
      flex: 1,
      padding: "0.75rem",
      borderRadius: "8px",
      border: "none",
      fontSize: "0.875rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s",
      background: active
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "#f7fafc",
      color: active ? "white" : "#718096",
    }),
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    label: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "600",
      color: "#2d3748",
    },
    inputWrapper: {
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "0.875rem 1rem",
      paddingRight: "3rem",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "1rem",
      transition: "all 0.3s",
      outline: "none",
      boxSizing: "border-box",
    },
    inputError: {
      borderColor: "#f56565",
      background: "#fff5f5",
    },
    passwordToggle: {
      position: "absolute",
      right: "1rem",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#718096",
      display: "flex",
      alignItems: "center",
    },
    errorText: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.875rem",
      color: "#f56565",
      marginTop: "0.25rem",
    },
    submitButton: {
      padding: "1rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: loading ? "not-allowed" : "pointer",
      transition: "all 0.3s",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
      opacity: loading ? 0.7 : 1,
    },
    errorMessage: {
      padding: "1rem",
      background: "#fee",
      border: "2px solid #fcc",
      borderRadius: "12px",
      color: "#c00",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "1rem",
    },
    registerLink: {
      textAlign: "center",
      marginTop: "1.5rem",
      fontSize: "0.875rem",
      color: "#718096",
    },
    link: {
      color: "#667eea",
      fontWeight: "600",
      textDecoration: "none",
    },
    // ✅ ADDED MISSING STYLES FOR REQUEST MODAL
    requestModal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    requestCard: {
      background: "white",
      borderRadius: "16px",
      padding: "2rem",
      maxWidth: "500px",
      width: "90%",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    },
    requestTextarea: {
      width: "100%",
      minHeight: "100px",
      padding: "1rem",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "1rem",
      marginTop: "1rem",
      marginBottom: "1rem",
      boxSizing: "border-box",
      fontFamily: "inherit",
      resize: "vertical",
    },
    requestButtons: {
      display: "flex",
      gap: "1rem",
    },
    sendButton: {
      flex: 1,
      padding: "0.875rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
    },
    cancelButton: {
      flex: 1,
      padding: "0.875rem",
      background: "#f7fafc",
      color: "#718096",
      border: "none",
      borderRadius: "12px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.icon}>
            <LogIn size={40} color="white" />
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        {errors.submit && (
          <div style={styles.errorMessage}>
            <AlertCircle size={20} />
            <span>{errors.submit}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* User Type Toggle */}
          <div style={styles.toggleGroup}>
            <button
              type="button"
              onClick={() => handleChange("userType", "user")}
              style={styles.toggleButton(formData.userType === "user")}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => handleChange("userType", "admin")}
              style={styles.toggleButton(formData.userType === "admin")}
            >
              Admin
            </button>
          </div>

          {/* Email Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div style={styles.errorText}>
                <AlertCircle size={14} />
                {errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Lock size={16} />
              Password
            </label>
            <div style={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.password ? styles.inputError : {}),
                }}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <div style={styles.errorText}>
                <AlertCircle size={14} />
                {errors.password}
              </div>
            )}
          </div>

          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={styles.registerLink}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Sign up
          </Link>
        </div>

        {showRequestForm && (
          <div style={styles.requestModal}>
            <div style={styles.requestCard}>
              <h3>Request Account Activation</h3>
              <p>
                Your account is pending admin approval. Send a request to
                activate your account.
              </p>
              <textarea
                value={requestData.message}
                onChange={(e) =>
                  setRequestData({ ...requestData, message: e.target.value })
                }
                placeholder="Please explain why you need access..."
                style={styles.requestTextarea}
              />
              <div style={styles.requestButtons}>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch(
                        "http://13.60.70.224:8080/api/v1/User/createRequest",
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            email: requestData.email,
                            requestType: "Account Activation",
                            message: requestData.message,
                          }),
                        }
                      );
                      if (response.ok) {
                        toast.success("Request sent successfully!");
                        setShowRequestForm(false);
                      }
                    } catch (error) {
                      toast.error("Failed to send request");
                    }
                  }}
                  style={styles.sendButton}
                >
                  Send Request
                </button>
                <button
                  onClick={() => setShowRequestForm(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
