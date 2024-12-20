import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUserForm = () => {
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    email: "",
    dob: "",
    idType: "",
    idNumber: "",
    phoneNumber: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!user.username) newErrors.username = "Username is required";
    if (!user.fullName) newErrors.fullName = "Full Name is required";
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = "Valid Email is required";
    if (!user.dob) newErrors.dob = "Date of Birth is required";
    if (!user.idType) newErrors.idType = "ID Type is required";
    if (!user.idNumber) newErrors.idNumber = "ID Number is required";
    if (!user.phoneNumber || !/^\d{10}$/.test(user.phoneNumber))
      newErrors.phoneNumber = "Valid Phone Number is required";
    if (!user.role) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...existingUsers, user];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate("/admin/users");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCancel = () => {
    navigate("/admin/users");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              style={errors.username ? styles.errorInput : styles.input}
            />
            {errors.username && <span style={styles.errorText}>{errors.username}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              style={errors.fullName ? styles.errorInput : styles.input}
            />
            {errors.fullName && <span style={styles.errorText}>{errors.fullName}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              style={errors.email ? styles.errorInput : styles.input}
            />
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={user.dob}
              onChange={handleChange}
              style={errors.dob ? styles.errorInput : styles.input}
            />
            {errors.dob && <span style={styles.errorText}>{errors.dob}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>ID Type</label>
            <input
              type="text"
              name="idType"
              value={user.idType}
              onChange={handleChange}
              style={errors.idType ? styles.errorInput : styles.input}
            />
            {errors.idType && <span style={styles.errorText}>{errors.idType}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>ID Number</label>
            <input
              type="text"
              name="idNumber"
              value={user.idNumber}
              onChange={handleChange}
              style={errors.idNumber ? styles.errorInput : styles.input}
            />
            {errors.idNumber && <span style={styles.errorText}>{errors.idNumber}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              style={errors.phoneNumber ? styles.errorInput : styles.input}
            />
            {errors.phoneNumber && <span style={styles.errorText}>{errors.phoneNumber}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Role</label>
            <input
              type="text"
              name="role"
              value={user.role}
              onChange={handleChange}
              style={errors.role ? styles.errorInput : styles.input}
            />
            {errors.role && <span style={styles.errorText}>{errors.role}</span>}
          </div>

          <div style={styles.actions}>
            <button type="submit" style={styles.submitButton}>Add User</button>
            <button type="button" onClick={handleCancel} style={styles.cancelButton}>Cancel</button>
          </div>
        </form>
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: "12px",
    padding: "40px",
    width: "80%",
    maxWidth: "600px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    color: "#fff",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "1.1rem",
    color: "#fff",
    textAlign: "left",
    display: "block",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    fontSize: "1rem",
    color: "#333",
    boxSizing: "border-box",
  },
  errorInput: {
    border: "1px solid #ff4d4d",
  },
  errorText: {
    fontSize: "0.9rem",
    color: "#ff4d4d",
    marginTop: "5px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  submitButton: {
    padding: "12px 24px",
    backgroundColor: "#4caf50",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  cancelButton: {
    padding: "12px 24px",
    backgroundColor: "#f44336",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  submitButtonHover: {
    backgroundColor: "#45a049",
  },
  cancelButtonHover: {
    backgroundColor: "#e53935",
  },
};

export default AddUserForm;
