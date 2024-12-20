import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (!token) {
      setError("Invalid or expired reset link.");
    } else {
      // Optional: You could also store the token temporarily in localStorage
      localStorage.setItem("resetToken", token);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = new URLSearchParams(location.search).get("token");

    // Get email from localStorage
    const email = localStorage.getItem("resetEmail");

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email, newPassword }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Password reset successful! You can now log in.");
        setTimeout(() => navigate("/signin"), 2000); // Redirect to sign in page
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
