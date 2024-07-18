import React, { useState, useEffect } from 'react';
import { getRoles, deleteRole } from '../../../services/roleService';
import RoleForm from '../RoleForm/RoleForm';
import Modal from '../../common/Modal/Modal';
import { useAuth } from '../../../hooks/useAuth';
import styles from './RoleList.module.css';

function RoleList() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setIsLoading(true);
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      setError('Failed to fetch roles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleDelete = async (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await deleteRole(roleId);
        fetchRoles();
      } catch (error) {
        setError('Failed to delete role');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRole(null);
  };

  const handleSave = () => {
    fetchRoles();
    handleCloseModal();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  if (!user.roles.includes('ADMIN')) {
    return <div className={styles.unauthorized}>You do not have permission to view this page.</div>;
  }

  return (
    <div className={styles.roleList}>
      <h2>Role Management</h2>
      <button onClick={() => setShowModal(true)} className={styles.addButton}>Add New Role</button>
      <table className={styles.roleTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>
                <button onClick={() => handleEdit(role)} className={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(role.id)} className={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal} onClose={handleCloseModal}>
        <RoleForm role={selectedRole} onSave={handleSave} />
      </Modal>
    </div>
  );
}

export default RoleList;