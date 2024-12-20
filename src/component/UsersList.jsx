import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSortUp, FaSortDown, FaEdit, FaTrash, FaDownload } from "react-icons/fa"; // Import the icons
import { useNavigate } from "react-router-dom";
import { parse } from "json2csv";

const Container = styled.div`
  font-family: 'Arial', sans-serif;
  background: linear-gradient(45deg, #90638c, #ebdfe9, #d5c0d1, #bea1bd, #a583a4, #92638f);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => props.bgColor || '#90638c'};
  color: white;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#90638c'};
  }

  &:disabled {
    background-color: #c8e6c9;
  }
`;

const SearchInput = styled.input`
  padding: 8px;
  font-size: 14px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: auto;
`;

const TableHeader = styled.th`
  cursor: pointer;
  padding: 12px;
  background-color: #90638c;
  color: white;
  text-align: left;
  font-weight: bold;

  &:hover {
    background-color: #90638c;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const TableData = styled.td`
  padding: 10px;
  text-align: left;
`;

const Pagination = styled.div`
  position: fixed;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 10;
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [deleteUser, setDeleteUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    if (showConfirmation) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showConfirmation]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
  };

  const handleDelete = (username) => {
    const updatedUsers = users.filter((user) => user.username !== username);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setDeleteUser(null);
  };

  const openDeleteConfirmation = (username) => {
    setDeleteUser(username);
  };

  const closeDeleteConfirmation = () => {
    setDeleteUser(null);
  };

  const handleEdit = (user) => {
    navigate("/admin/edit-user-form", { state: { user } });
  };

  const handleCreate = () => {
    navigate("/admin/add-user-form");
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  const filteredUsers = users.filter(
      (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDownload = () => {
    const csv = parse(users);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users_list.csv";
    link.click();
  };

  const openDownloadConfirmation = () => {
    setShowConfirmation(true);
  };

  const closeDownloadConfirmation = () => {
    setShowConfirmation(false);
  };

  const confirmDownload = () => {
    setShowConfirmation(false);
    handleDownload();
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
      <Container>
        <Header>
          <Title>Manage Users</Title>
          <Button bgColor="#d5c0d1" hoverColor="#d5c0d1" onClick={handleLogout}>Logout</Button>
        </Header>
        <div>
          <SearchInput
              type="text"
              placeholder="Search by Username or Full Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button bgColor="#d5c0d1" hoverColor="#d5c0d1" onClick={handleCreate}>Add New User</Button>
          <Button onClick={openDownloadConfirmation}>
            <FaDownload /> Download Users List
          </Button>
        </div>
        <Table>
          <thead>
          <tr>
            <TableHeader onClick={() => handleSort("username")}>
              Username {sortConfig.key === "username" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
            </TableHeader>
            <TableHeader onClick={() => handleSort("fullName")}>
              Full Name {sortConfig.key === "fullName" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
            </TableHeader>
            <TableHeader onClick={() => handleSort("email")}>
              Email {sortConfig.key === "email" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
            </TableHeader>
            <TableHeader>Date of Birth</TableHeader>
            <TableHeader>ID Type</TableHeader>
            <TableHeader>ID Number</TableHeader>
            <TableHeader>Phone Number</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
          </thead>
          <tbody>
          {currentUsers.map((user) => (
              <TableRow key={user.username}>
                <TableData>{user.username}</TableData>
                <TableData>{user.fullName}</TableData>
                <TableData>{user.email}</TableData>
                <TableData>{user.dateOfBirth}</TableData>
                <TableData>{user.idType}</TableData>
                <TableData>{user.idNumber}</TableData>
                <TableData>{user.phoneNumber}</TableData>
                <TableData>{user.role}</TableData>
                <TableData>
                  <Button bgColor="#d5c0d1" hoverColor="#d5c0d1" onClick={() => handleEdit(user)}>
                    <FaEdit /> Edit
                  </Button>
                  <Button bgColor="#e53935" hoverColor="#d32f2f" onClick={() => openDeleteConfirmation(user.username)}>
                    <FaTrash /> Delete
                  </Button>
                </TableData>
              </TableRow>
          ))}
          </tbody>
        </Table>
        <Pagination>
          <Button onClick={() => paginate(currentPage - 1)} disabled={isPrevDisabled}>Prev</Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button onClick={() => paginate(currentPage + 1)} disabled={isNextDisabled}>Next</Button>
        </Pagination>

        {showConfirmation && (
            <ConfirmationModal>
              <ModalContent>
                <h3>Are you sure you want to download the user list?</h3>
                <div>
                  <Button onClick={closeDownloadConfirmation}>Cancel</Button>
                  <Button onClick={confirmDownload}>Confirm</Button>
                </div>
              </ModalContent>
            </ConfirmationModal>
        )}

        {deleteUser && (
            <ConfirmationModal>
              <ModalContent>
                <h3>Are you sure you want to delete this user?</h3>
                <div>
                  <Button onClick={closeDeleteConfirmation}>Cancel</Button>
                  <Button onClick={() => handleDelete(deleteUser)}>Delete</Button>
                </div>
              </ModalContent>
            </ConfirmationModal>
        )}
      </Container>
  );
};

export default UsersList;
