import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../../../services/userService';
import UserSearch from '../UserSearch/UserSearch';
import UserForm from '../UserForm/UserForm';
import Modal from '../../common/Modal/Modal';
import { useAuth } from '../../../hooks/useAuth';
import styles from './UserList.module.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      setError('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = users.filter(user1 => 
      user1.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user1.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user1.lastNameame.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user1.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleEdit = (user1) => {
    setSelectedUser(user1);
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        fetchUsers();
      } catch (error) {
        setError('Failed to delete user');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSave = () => {
    fetchUsers();
    handleCloseModal();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.userList}>
      <h2>User Management</h2>
      <UserSearch onSearch={handleSearch} />
      {user.roles.includes('ROLE_ADMIN') && (
        <button onClick={() => setShowModal(true)} className={styles.addButton}>Add New User</button>
      )}
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            {user.roles.includes('ROLE_ADMIN') && (
              <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user1 => (
            <tr key={user1.id}>
              <td>{user1.username}</td>
              <td>{user1.firstName}</td>
              <td>{user1.lastName}</td>
              <td>{user1.email}</td>
              {user.roles.includes('ROLE_ADMIN') && (
              <td>
                  <>
                    <button onClick={() => handleEdit(user1)} className={styles.editButton}>Edit</button>
                    <button onClick={() => handleDelete(user1.id)} className={styles.deleteButton}>Delete</button>
                  </>  
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onClose={handleCloseModal}>
        <UserForm user1={selectedUser} onSave={handleSave} />
      </Modal>
    </div>
  );
}

export default UserList;