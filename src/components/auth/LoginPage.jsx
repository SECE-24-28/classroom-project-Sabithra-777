import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import { LogIn, Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: "",
    password: "",
    loginType: "email", // "email" or "mobile"
    userType: "user", // "user" or "admin"
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (formData.loginType === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    } else {
      if (!formData.mobileNumber.trim()) {
        newErrors.mobileNumber = "Mobile number is required";
      } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
        newErrors.mobileNumber = "Mobile number must be 10 digits";
      }
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
        formData.userType === "admin"
          ? API_ENDPOINTS.USER.ADMIN_LOGIN
          : API_ENDPOINTS.USER.LOGIN;

      const payload = {
        password: formData.password,
      };

      if (formData.loginType === "email") {
        payload.email = formData.email;
      } else {
        payload.mobileNumber = formData.mobileNumber;
      }

      const { data } = await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.success) {
        // Store user data in auth context
        login(data.data);

        // Redirect based on user type
        if (data.data.role === "admin") {
          navigate("/user-request");
        } else {
          navigate("/user-assignment-backend");
        }
      } else {
        setErrors({ submit: data.message || "Login failed" });
      }
    } catch (error) {
      setErrors({
        submit:
          error.response?.data?.message ||
          error.message ||
          "Login failed. Please check your credentials.",
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

          {/* Login Type Toggle */}
          <div style={styles.toggleGroup}>
            <button
              type="button"
              onClick={() => {
                handleChange("loginType", "email");
                handleChange("mobileNumber", "");
              }}
              style={styles.toggleButton(formData.loginType === "email")}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => {
                handleChange("loginType", "mobile");
                handleChange("email", "");
              }}
              style={styles.toggleButton(formData.loginType === "mobile")}
            >
              Mobile
            </button>
          </div>

          {/* Email or Mobile Input */}
          {formData.loginType === "email" ? (
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
          ) : (
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <Mail size={16} />
                Mobile Number
              </label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.mobileNumber ? styles.inputError : {}),
                }}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
              />
              {errors.mobileNumber && (
                <div style={styles.errorText}>
                  <AlertCircle size={14} />
                  {errors.mobileNumber}
                </div>
              )}
            </div>
          )}

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
      </div>
    </div>
  );
};

export default LoginPage;

