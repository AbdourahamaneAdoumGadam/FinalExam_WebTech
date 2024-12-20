import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Settings = () => {
  const { currentUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: currentUser.username,
    fullName: currentUser.fullName,
    email: currentUser.email,
    profilePicture: currentUser.profilePicture || "",
  });

  useEffect(() => {
    setProfile({
      ...profile,
      profilePicture: currentUser.profilePicture || "",
    });
  }, [currentUser]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(profile);
    navigate("/dashboard"); // Redirect to Dashboard after saving
  };

  const handleCancel = () => {
    navigate("/dashboard"); // Redirect to Dashboard without saving
  };

  return (
    <PageWrapper>
      <SettingsContainer>
        <h2>Account Settings</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Profile Picture:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {profile.profilePicture && (
              <ProfilePicturePreview>
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="profile-picture"
                />
              </ProfilePicturePreview>
            )}
          </FormGroup>
          <FormGroup>
            <label>Username:</label>
            <input type="text" value={profile.username} readOnly />
          </FormGroup>
          <FormGroup>
            <label>Full Name:</label>
            <input type="text" value={profile.fullName} readOnly />
          </FormGroup>
          <FormGroup>
            <label>Email:</label>
            <input type="email" value={profile.email} readOnly />
          </FormGroup>
          <ButtonGroup>
            <SaveButton type="submit">Save Changes</SaveButton>
            <CancelButton type="button" onClick={handleCancel}>
              Cancel
            </CancelButton>
          </ButtonGroup>
        </form>
      </SettingsContainer>
    </PageWrapper>
  );
};

// Styled-components for the entire page and container

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("https://st4.depositphotos.com/1976499/26660/i/450/depositphotos_266603570-stock-photo-airplane-isolated-black-rendering.jpg") no-repeat center center fixed;
  background-size: cover;
`;

const SettingsContainer = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 700px;
  margin: 50px auto;
  padding: 30px;
  background: white; /* Specific container background */
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  h2 {
    text-align: center;
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
`;

// Other styled components remain unchanged
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-size: 16px;
    color: #555;
    margin-bottom: 8px;
    font-weight: bold;
  }
  input {
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: all 0.3s ease;
    &:focus {
      border-color: #4caf50;
    }
  }
`;

const ProfilePicturePreview = styled.div`
  margin-top: 15px;
  img.profile-picture {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SaveButton = styled.button`
  padding: 12px 25px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled(SaveButton)`
  background-color: #f44336;
  &:hover {
    background-color: #e53935;
  }
`;

export default Settings;
