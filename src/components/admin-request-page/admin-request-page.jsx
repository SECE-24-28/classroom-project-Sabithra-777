import React, { useState, useEffect } from "react";
import {
  UserCheck,
  CheckCircle,
  XCircle,
  Users,
  Mail,
  Phone,
  Building,
  Clock,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";
import { adminAPI } from "../../config/api";

const UserRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCollege, setFilterCollege] = useState("all");

  const admin = JSON.parse(localStorage.getItem("user") || "{}");
  const adminId = admin.id;

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    if (!adminId) {
      console.error("Admin not logged in");
      return;
    }

    setLoading(true); //
    try {
      const response = await fetch(`http://localhost:21000/api/v1/Admin/pendingUsers/${adminId}`);
      const data = await response.json();

      if (data.success) {
        setRequests(data.data || []);
      } else {
        console.error("Failed to fetch requests");
      }
    } catch (error) {
      console.error(
        "Error fetching requests:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId, action) => {
    setActionLoading((prev) => ({ ...prev, [userId]: action }));

    try {
      const response = await fetch('http://localhost:21000/api/v1/Admin/approveUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminId,
          userId,
          action: action === 'decline' ? 'reject' : 'accept',
        })
      });
      
      const data = await response.json();

      if (data.success) {
        showNotification(
          action === "accept" ? "User Accepted!" : "Request Declined!",
          action === "accept" ? "success" : "error"
        );

        setRequests((prev) => prev.filter((u) => u._id !== userId));
      } else {
        showNotification(
          data.message || "Action failed. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Action error:", error.response?.data || error.message);
      showNotification(
        error.response?.data?.message || "Network error. Please try again.",
        "error"
      );
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: null }));
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      padding: 16px 24px;
      background: ${type === "success" ? "#48bb78" : "#f56565"};
      color: white;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      font-weight: 600;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const colleges = ["all", ...new Set(requests.map((r) => r.collegeName))];

  const filteredRequests = requests.filter((user) => {
    const matchesSearch =
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.secondName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobileNumber?.includes(searchTerm);

    const matchesCollege =
      filterCollege === "all" || user.collegeName === filterCollege;

    return matchesSearch && matchesCollege;
  });
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto 40px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
              }}
            >
              <UserCheck
                style={{ width: "40px", height: "40px", color: "white" }}
              />
            </div>
            <div>
              <h1
                style={{
                  fontSize: "36px",
                  fontWeight: "800",
                  margin: 0,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                User Requests
              </h1>
              <p
                style={{
                  color: "#718096",
                  margin: "8px 0 0 0",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {filteredRequests.length} pending{" "}
                {filteredRequests.length === 1 ? "request" : "requests"}
              </p>
            </div>
          </div>

          <button
            onClick={fetchRequests}
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              background: loading
                ? "#cbd5e0"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            }}
          >
            <RefreshCw
              style={{
                width: "20px",
                height: "20px",
                animation: loading ? "spin 1s linear infinite" : "none",
              }}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto 32px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1", minWidth: "250px", position: "relative" }}>
            <Search
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                color: "#a0aec0",
              }}
            />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 14px 14px 48px",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                fontSize: "15px",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>

          <div style={{ position: "relative", minWidth: "200px" }}>
            <Filter
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                color: "#a0aec0",
              }}
            />
            <select
              value={filterCollege}
              onChange={(e) => setFilterCollege(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 14px 14px 48px",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                fontSize: "15px",
                boxSizing: "border-box",
                background: "white",
                cursor: "pointer",
              }}
            >
              {colleges.map((college) => (
                <option key={college} value={college}>
                  {college === "all" ? "All Colleges" : college}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {loading ? (
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "80px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                border: "5px solid #e2e8f0",
                borderTop: "5px solid #667eea",
                borderRadius: "50%",
                margin: "0 auto 24px",
                animation: "spin 1s linear infinite",
              }}
            />
            <p
              style={{
                fontSize: "18px",
                color: "#718096",
                fontWeight: "500",
              }}
            >
              Loading user requests...
            </p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "80px 40px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <UserCheck
                style={{
                  width: "60px",
                  height: "60px",
                  color: "#cbd5e0",
                }}
              />
            </div>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#2d3748",
                margin: "0 0 12px 0",
              }}
            >
              {searchTerm || filterCollege !== "all"
                ? "No matching requests"
                : "No pending requests"}
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#718096",
                margin: 0,
              }}
            >
              {searchTerm || filterCollege !== "all"
                ? "Try adjusting your search or filter criteria"
                : "All user requests have been processed"}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >
            {filteredRequests.map((user, index) => (
              <div
                key={user._id}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "32px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  animation: `fadeIn 0.5s ease ${index * 0.1}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.2)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "24px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* User Info */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      flex: "1",
                      minWidth: "300px",
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        width: "80px",
                        height: "80px",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "28px",
                        fontWeight: "700",
                        boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                        flexShrink: 0,
                      }}
                    >
                      {user.firstName?.charAt(0)}
                      {user.secondName?.charAt(0)}
                    </div>

                    {/* Details */}
                    <div style={{ flex: "1" }}>
                      <h3
                        style={{
                          fontSize: "22px",
                          fontWeight: "700",
                          color: "#1a202c",
                          margin: "0 0 12px 0",
                        }}
                      >
                        {user.firstName} {user.secondName}
                      </h3>

                      <div
                        style={{
                          display: "grid",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: "#4a5568",
                            fontSize: "15px",
                          }}
                        >
                          <Mail
                            style={{
                              width: "18px",
                              height: "18px",
                              color: "#667eea",
                            }}
                          />
                          <span style={{ fontWeight: "500" }}>
                            {user.email}
                          </span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: "#4a5568",
                            fontSize: "15px",
                          }}
                        >
                          <Phone
                            style={{
                              width: "18px",
                              height: "18px",
                              color: "#667eea",
                            }}
                          />
                          <span style={{ fontWeight: "500" }}>
                            {user.mobileNumber}
                          </span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: "#4a5568",
                            fontSize: "15px",
                          }}
                        >
                          <Building
                            style={{
                              width: "18px",
                              height: "18px",
                              color: "#667eea",
                            }}
                          />
                          <span style={{ fontWeight: "500" }}>
                            {user.collegeName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() => handleAction(user._id, "accept")}
                      disabled={!!actionLoading[user._id]}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "16px 32px",
                        background: actionLoading[user._id]
                          ? "#cbd5e0"
                          : "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: actionLoading[user._id]
                          ? "not-allowed"
                          : "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 15px rgba(72, 187, 120, 0.4)",
                        minWidth: "140px",
                        justifyContent: "center",
                      }}
                      onMouseEnter={(e) => {
                        if (!actionLoading[user._id]) {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 25px rgba(72, 187, 120, 0.5)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 15px rgba(72, 187, 120, 0.4)";
                      }}
                    >
                      {actionLoading[user._id] === "accept" ? (
                        <>
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              border: "3px solid #ffffff40",
                              borderTop: "3px solid white",
                              borderRadius: "50%",
                              animation: "spin 0.8s linear infinite",
                            }}
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle
                            style={{ width: "20px", height: "20px" }}
                          />
                          Accept
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleAction(user._id, "decline")}
                      disabled={!!actionLoading[user._id]}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "16px 32px",
                        background: actionLoading[user._id]
                          ? "#cbd5e0"
                          : "linear-gradient(135deg, #f56565 0%, #e53e3e 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: actionLoading[user._id]
                          ? "not-allowed"
                          : "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 15px rgba(245, 101, 101, 0.4)",
                        minWidth: "140px",
                        justifyContent: "center",
                      }}
                      onMouseEnter={(e) => {
                        if (!actionLoading[user._id]) {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 25px rgba(245, 101, 101, 0.5)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 15px rgba(245, 101, 101, 0.4)";
                      }}
                    >
                      {actionLoading[user._id] === "decline" ? (
                        <>
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              border: "3px solid #ffffff40",
                              borderTop: "3px solid white",
                              borderRadius: "50%",
                              animation: "spin 0.8s linear infinite",
                            }}
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          <XCircle style={{ width: "20px", height: "20px" }} />
                          Decline
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Animations */}
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
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default UserRequestsPage;
