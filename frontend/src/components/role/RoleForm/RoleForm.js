import React, { useState, useEffect } from 'react';
import styles from './RoleForm.module.css';

function RoleForm({ role, onSave }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (role) {
      setName(role.name);
    }
  }, [role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.roleForm}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Role Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        {role ? 'Update' : 'Add'} Role
      </button>
    </form>
  );
}

export default RoleForm;