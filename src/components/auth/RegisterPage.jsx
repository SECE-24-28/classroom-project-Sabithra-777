import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Phone, Building, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    collegeName: "",
    password: "",
    confirmPassword: "",
    userType: "user", // "user" or "admin"
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.collegeName.trim()) {
      newErrors.collegeName = "College name is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
    setSuccess(false);

    try {
      const endpoint =
        formData.userType === "admin"
          ? "/User/adminSignup"
          : "/User/userSignup";

      const payload = {
        firstName: formData.firstName,
        email: formData.email,
        collegeName: formData.collegeName,
        password: formData.password,
      };

      const response = await fetch(
        `http://localhost:21000/api/v1${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();

      if (data.success) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setErrors({ submit: data.message || "Registration failed" });
      }
    } catch (error) {
      setErrors({
        submit: error.message || "Registration failed. Please try again.",
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
      maxWidth: "600px",
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
    input: {
      padding: "0.875rem 1rem",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "1rem",
      transition: "all 0.3s",
      outline: "none",
    },
    inputError: {
      borderColor: "#f56565",
      background: "#fff5f5",
    },
    errorText: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.875rem",
      color: "#f56565",
      marginTop: "0.25rem",
    },
    userTypeToggle: {
      display: "flex",
      gap: "1rem",
      padding: "0.5rem",
      background: "#f7fafc",
      borderRadius: "12px",
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
        : "transparent",
      color: active ? "white" : "#718096",
    }),
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
    successMessage: {
      padding: "1rem",
      background: "#d1fae5",
      border: "2px solid #a7f3d0",
      borderRadius: "12px",
      color: "#065f46",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "1rem",
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
    loginLink: {
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
            <UserPlus size={40} color="white" />
          </div>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>
            {formData.userType === "admin"
              ? "Register as an administrator"
              : "Join our learning management system"}
          </p>
        </div>

        {success && (
          <div style={styles.successMessage}>
            <CheckCircle size={20} />
            <span>Registration successful! Redirecting to login...</span>
          </div>
        )}

        {errors.submit && (
          <div style={styles.errorMessage}>
            <AlertCircle size={20} />
            <span>{errors.submit}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* User Type Toggle */}
          <div style={styles.userTypeToggle}>
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

          {/* First Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <User size={16} />
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              style={{
                ...styles.input,
                ...(errors.firstName ? styles.inputError : {}),
              }}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <div style={styles.errorText}>
                <AlertCircle size={14} />
                {errors.firstName}
              </div>
            )}
          </div>

          {/* Email */}
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

          {/* College Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Building size={16} />
              College Name
            </label>
            <input
              type="text"
              value={formData.collegeName}
              onChange={(e) => handleChange("collegeName", e.target.value)}
              style={{
                ...styles.input,
                ...(errors.collegeName ? styles.inputError : {}),
              }}
              placeholder="Enter your college name"
            />
            {errors.collegeName && (
              <div style={styles.errorText}>
                <AlertCircle size={14} />
                {errors.collegeName}
              </div>
            )}
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Lock size={16} />
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {}),
              }}
              placeholder="Enter password (min 6 characters)"
            />
            {errors.password && (
              <div style={styles.errorText}>
                <AlertCircle size={14} />
                {errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Lock size={16} />
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              style={{
                ...styles.input,
                ...(errors.confirmPassword ? styles.inputError : {}),
              }}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <div style={styles.errorText}>
                <AlertCircle size={14} />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <div style={styles.loginLink}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
