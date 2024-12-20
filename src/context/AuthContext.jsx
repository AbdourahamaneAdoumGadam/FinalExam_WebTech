import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signUp = (user) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Checking if the username or email already exists
    const existingUser = users.find(
      (u) => u.username === user.username || u.email === user.email
    );
    if (existingUser) {
      alert("Username or Email already exists!");
      return;
    }

    // Assign role if not provided, default to 'user'
    if (!user.role) {
      user.role = "user"; // Default role is 'user'
    }

    users.push(user); // Add new user
    localStorage.setItem("users", JSON.stringify(users));
  };

  const signIn = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      setCurrentUser(user); // Set current user if found
      return user;
    }

    return null; // Return null if no matching user is found
  };

  const signOut = () => setCurrentUser(null);

  // Reset password logic
  const resetPassword = (email, newPassword) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user by email
    const user = users.find((u) => u.email === email);

    if (user) {
      // Update the user's password
      user.password = newPassword;
      // Save updated users list to localStorage
      localStorage.setItem("users", JSON.stringify(users));
      alert("Password updated successfully!");
      return true;
    }

    alert("Email not found!");
    return false;
  };

  return (
    <AuthContext.Provider value={{ currentUser, signUp, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
