import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // Save email to localStorage (temporary storage for reset process)
      localStorage.setItem("resetEmail", email);

      // Call the backend API to send the reset password link
      const response = await fetch("/api/send-reset-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Password reset link sent! Please check your email.");
        setTimeout(() => navigate("/signin"), 5000); // Redirect to sign in page after a few seconds
      } else {
        setError(data.message || "Failed to send reset link.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ForgotPassword;
