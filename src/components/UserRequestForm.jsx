import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const UserRequestForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://51.20.66.94:8080/api/v1/User/createRequest",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            requestType: "General Request",
            message: "User has sent a request for assistance",
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setSent(true);
      }
    } catch (error) {
      console.error("Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "2rem",
      textAlign: "center",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    },
    button: {
      padding: "1rem 2rem",
      backgroundColor: "#667eea",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.7 : 1,
    },
    success: {
      color: "#10b981",
      fontSize: "1.1rem",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Send Request to Admin</h2>
      {sent ? (
        <div style={styles.success}>✅ Request sent successfully!</div>
      ) : (
        <button onClick={sendRequest} disabled={loading} style={styles.button}>
          {loading ? "Sending..." : "Send Request"}
        </button>
      )}
    </div>
  );
};

export default UserRequestForm;
