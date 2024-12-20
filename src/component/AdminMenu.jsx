import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminMenu = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser?.role !== "admin") {
    navigate("/signin"); // Redirect if not admin
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Admin Dashboard</h2>
        <p style={styles.welcomeMessage}>Welcome back, <strong>{currentUser?.username}</strong>!</p>
        <p style={styles.roleInfo}>Role: <strong>{currentUser?.role}</strong></p>
        <ul style={styles.menuList}>
          <li style={styles.menuItem}>
            <button onClick={() => navigate("/admin/users")} style={styles.menuButton}>
              Manage Users
            </button>
          </li>
          {/* You can add more admin functionalities here */}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "url('https://www.w3schools.com/w3images/forestbridge.jpg') center/cover no-repeat",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Roboto', sans-serif",
    color: "#fff",
  },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "15px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
    padding: "40px",
    width: "90%",
    maxWidth: "700px",
    textAlign: "center",
    color: "#fff",
  },
  heading: {
    fontSize: "2.6rem",
    fontWeight: "700",
    marginBottom: "20px",
    letterSpacing: "2px",
    color: "#ffffff",
  },
  welcomeMessage: {
    fontSize: "1.6rem",
    fontWeight: "500",
    marginBottom: "15px",
  },
  roleInfo: {
    fontSize: "1.3rem",
    marginBottom: "25px",
    opacity: "0.9",
  },
  menuList: {
    listStyle: "none",
    paddingLeft: "0",
  },
  menuItem: {
    fontSize: "1.3rem",
    marginBottom: "15px",
  },
  menuButton: {
    padding: "14px 28px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.2rem",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    width: "100%",
    boxSizing: "border-box",
  },
  menuButtonHover: {
    backgroundColor: "#45a049",
    transform: "scale(1.05)",
  },
};

export default AdminMenu;
