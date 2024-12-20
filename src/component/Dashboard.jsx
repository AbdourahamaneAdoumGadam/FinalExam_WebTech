import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

const Dashboard = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  if (!currentUser) return <p>Loading...</p>;

  const handleLogout = () => {
    signOut();
    navigate("/signin");
  };

  return (
      <DashboardContainer>
        <Sidebar>
          <Logo>TAsk System</Logo>
          <NavItems>
            {currentUser.role === "admin" ? (
                <>
                  <NavItem onClick={() => navigate("/admin/users")}>Users</NavItem>
                </>
            ) : (
                <>
                  <NavItem onClick={() => navigate("/book-task")}>Book a Task</NavItem>
                  <NavItem onClick={() => navigate("/task-history")}>Task Information</NavItem>
                  <NavItem onClick={() => navigate("/settings")}>Settings</NavItem>
                </>
            )}
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </NavItems>
        </Sidebar>

        <MainContent>
          <WelcomeSection>
            <h1>Welcome, {currentUser.fullName}!</h1>
            <UserRole>Role: {currentUser.role}</UserRole>
            {currentUser.profilePicture && (
                <ProfilePicture>
                  <img src={currentUser.profilePicture} alt="Profile" />
                </ProfilePicture>
            )}
          </WelcomeSection>
        </MainContent>
      </DashboardContainer>
  );
};

// Styled-components for CSS-in-JS

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5; /* Light background color */
`;

const Sidebar = styled.div`
  width: 220px;
  background: linear-gradient(180deg, #d6a7e1, #b6a1c8); /* Soft purple gradient */
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 15px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #2c3e50;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const NavItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
`;

const NavItem = styled.div`
  cursor: pointer;
  font-size: 16px;
  padding: 12px 20px;
  text-align: center;
  border-radius: 5px;
  transition: all 0.3s ease;
  background: #e2c4f5; /* Light pastel purple for buttons */
  color: #6f3d7e;
  &:hover {
    background: #d1b0df; /* Slightly darker purple on hover */
    transform: translateX(5px);
  }
`;

const LogoutButton = styled.button`
  margin-top: auto;
  padding: 10px 20px;
  background-color: #6f3d7e; /* Deep lavender */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #5c2f6b; /* Darker lavender on hover */
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  background: linear-gradient(45deg, #6f3d7e, #b6a1c8, #d6a7e1);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const WelcomeSection = styled.div`
  text-align: center;
  background-color: rgba(43, 43, 43, 0.85); /* Darker container background */
  color: #f0f0f0;
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const UserRole = styled.p`
  font-size: 18px;
  color: #d1d1d1;
  margin-top: 15px;
`;

const ProfilePicture = styled.div`
  margin-top: 25px;
  img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #ddd;
  }
`;

export default Dashboard;
