import React, { useState } from "react";
import {
  BookOpen,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
  Users,
  Sparkles,
} from "lucide-react";
import { adminAPI } from "../../config/api";

const CreateAssignmentPage = () => {
  const [formData, setFormData] = useState({
    assignmentName: "",
    deadline: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const admin = JSON.parse(localStorage.getItem("user") || "{}");
  const adminId = admin.id;
  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const e = {};
    if (!formData.assignmentName.trim()) {
      e.assignmentName = "Assignment name is required";
    } else if (formData.assignmentName.trim().length < 3) {
      e.assignmentName = "Must be at least 3 characters";
    }
    if (!formData.deadline) {
      e.deadline = "Deadline is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    if (!adminId) {
      alert("Admin not logged in");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://13.60.70.224:8080/api/v1/Admin/createAssignment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assignmentName: formData.assignmentName,
            deadline: formData.deadline,
            adminId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setShowSuccess(true);
        setFormData({ assignmentName: "", deadline: "" });
        setErrors({});

        const notif = document.createElement("div");
        notif.textContent = "✅ Assignment created successfully!";
        notif.style.cssText = `
          position: fixed;
          top: 24px;
          right: 24px;
          padding: 16px 24px;
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white;
          border-radius: 12px;
          font-weight: 600;
          z-index: 9999;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(notif);

        setTimeout(() => {
          setShowSuccess(false);
          notif.remove();
        }, 3000);
      } else {
        alert(data.message || "Failed to create assignment");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response?.data?.message ||
          "Network error. Please check if backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            animation: "fadeInDown 0.6s ease",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "white",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <BookOpen size={50} color="#667eea" />
          </div>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "800",
              color: "white",
              margin: "0 0 12px",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            Create New Assignment
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.9)",
              margin: 0,
              fontWeight: "500",
            }}
          >
            Assign tasks to all students in your college
          </p>
        </div>

        {/* Main Card */}
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "48px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            position: "relative",
            animation: "fadeInUp 0.6s ease",
          }}
        >
          {/* Success Overlay */}
          {showSuccess && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                animation: "successPop 0.6s ease",
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  background: "linear-gradient(135deg, #48bb78, #38a169)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 20px 60px rgba(72,187,120,0.5)",
                }}
              >
                <CheckCircle size={70} color="white" />
              </div>
            </div>
          )}

          {/* Assignment Name Field */}
          <div style={{ marginBottom: "32px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "700",
                fontSize: "16px",
                color: "#2d3748",
                marginBottom: "12px",
              }}
            >
              <FileText size={20} color="#667eea" />
              Assignment Name
              <span style={{ color: "#f56565" }}>*</span>
            </label>

            <input
              type="text"
              value={formData.assignmentName}
              onChange={(e) => handleChange("assignmentName", e.target.value)}
              placeholder="e.g., Data Structures Lab Assignment"
              style={{
                width: "100%",
                padding: "18px 20px",
                fontSize: "16px",
                borderRadius: "12px",
                border: errors.assignmentName
                  ? "2px solid #f56565"
                  : "2px solid #e2e8f0",
                background: errors.assignmentName ? "#fff5f5" : "white",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                if (!errors.assignmentName) {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow = "0 0 0 4px rgba(102,126,234,0.1)";
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.assignmentName
                  ? "#f56565"
                  : "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />

            {errors.assignmentName && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "8px",
                  color: "#f56565",
                  fontSize: "14px",
                  fontWeight: "500",
                  animation: "shake 0.5s ease",
                }}
              >
                <AlertCircle size={16} />
                {errors.assignmentName}
              </div>
            )}

            <p
              style={{
                marginTop: "8px",
                fontSize: "14px",
                color: "#718096",
                margin: "8px 0 0 0",
              }}
            >
              Choose a clear and descriptive name
            </p>
          </div>

          {/* Deadline Field */}
          <div style={{ marginBottom: "32px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "700",
                fontSize: "16px",
                color: "#2d3748",
                marginBottom: "12px",
              }}
            >
              <Calendar size={20} color="#667eea" />
              Deadline
              <span style={{ color: "#f56565" }}>*</span>
            </label>

            <input
              type="date"
              min={today}
              value={formData.deadline}
              onChange={(e) => handleChange("deadline", e.target.value)}
              style={{
                width: "100%",
                padding: "18px 20px",
                fontSize: "16px",
                borderRadius: "12px",
                border: errors.deadline
                  ? "2px solid #f56565"
                  : "2px solid #e2e8f0",
                background: errors.deadline ? "#fff5f5" : "white",
                boxSizing: "border-box",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                if (!errors.deadline) {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow = "0 0 0 4px rgba(102,126,234,0.1)";
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.deadline
                  ? "#f56565"
                  : "#e2e8f0";
                e.target.style.boxShadow = "none";
              }}
            />

            {errors.deadline && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "8px",
                  color: "#f56565",
                  fontSize: "14px",
                  fontWeight: "500",
                  animation: "shake 0.5s ease",
                }}
              >
                <AlertCircle size={16} />
                {errors.deadline}
              </div>
            )}

            <p
              style={{
                marginTop: "8px",
                fontSize: "14px",
                color: "#718096",
                margin: "8px 0 0 0",
              }}
            >
              Students must submit before this date
            </p>
          </div>

          {/* Info Box */}
          <div
            style={{
              background: "linear-gradient(135deg, #667eea10, #764ba210)",
              border: "2px solid #667eea40",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "32px",
              display: "flex",
              gap: "16px",
            }}
          >
            <Users
              size={24}
              color="#667eea"
              style={{ flexShrink: 0, marginTop: "2px" }}
            />
            <div>
              <h4
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#2d3748",
                }}
              >
                Assignment will be assigned to:
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "#4a5568",
                  lineHeight: "1.6",
                }}
              >
                All active students in your college will automatically receive
                this assignment.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "20px",
              fontSize: "18px",
              fontWeight: "700",
              color: "white",
              borderRadius: "12px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              background: loading
                ? "#cbd5e0"
                : "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              boxShadow: loading ? "none" : "0 8px 20px rgba(102,126,234,0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(102,126,234,0.5)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(102,126,234,0.4)";
            }}
          >
            {loading ? (
              <>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    border: "3px solid #ffffff40",
                    borderTop: "3px solid white",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Creating Assignment...
              </>
            ) : (
              <>
                <Sparkles size={24} />
                Create Assignment
              </>
            )}
          </button>
        </div>

        {/* Feature Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "32px",
          }}
        >
          {[
            {
              icon: FileText,
              title: "Quick Setup",
              desc: "Create in seconds",
              color: "#667eea",
            },
            {
              icon: Users,
              title: "Auto Assign",
              desc: "Sent to all students",
              color: "#48bb78",
            },
            {
              icon: Calendar,
              title: "Deadline Track",
              desc: "Students notified",
              color: "#ed8936",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                animation: `fadeInUp 0.6s ease ${0.2 + i * 0.1}s both`,
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "12px",
                }}
              >
                <item.icon size={24} color="white" />
              </div>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#718096",
                  margin: "0 0 4px 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#a0aec0",
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        @keyframes successPop {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          60% { transform: translate(-50%, -50%) scale(1.2); }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CreateAssignmentPage;
