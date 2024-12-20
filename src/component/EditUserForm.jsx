import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 14px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ReadOnlyInput = styled(Input)`
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  cursor: not-allowed;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SaveButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  
  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
  color: white;
  
  &:hover {
    background-color: #e53935;
  }
`;

const EditUserForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === user.username ? user : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate("/admin/users"); // Redirect back to the user list
  };

  return (
    <Container>
      <h2>Edit User</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          Username (Read-Only)
          <ReadOnlyInput
            type="text"
            name="username"
            value={user.username}
            readOnly
          />
        </Label>
        <Label>
          Full Name
          <Input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleInputChange}
            required
          />
        </Label>
        <Label>
          Email
          <Input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </Label>
        <Label>
          Date of Birth
          <Input
            type="date"
            name="dob"
            value={user.dob}
            onChange={handleInputChange}
          />
        </Label>
        <Label>
          ID Type
          <Input
            type="text"
            name="idType"
            value={user.idType}
            onChange={handleInputChange}
          />
        </Label>
        <Label>
          ID Number
          <Input
            type="text"
            name="idNumber"
            value={user.idNumber}
            onChange={handleInputChange}
          />
        </Label>
        <Label>
          Phone Number
          <Input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
          />
        </Label>
        <Label>
          Role
          <Select
            name="role"
            value={user.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Select>
        </Label>
        <FormActions>
          <SaveButton type="submit">Save Changes</SaveButton>
          <CancelButton
            type="button"
            onClick={() => navigate("/admin/users")}
          >
            Cancel
          </CancelButton>
        </FormActions>
      </Form>
    </Container>
  );
};

export default EditUserForm;
