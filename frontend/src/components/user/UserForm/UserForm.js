import React, { useState, useEffect } from 'react';
import styles from './UserForm.module.css';

function UserForm({ user1, onSave }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    roles: []
  });

  useEffect(() => {
    console.log('User:' + user1);
    if (user1) {
      setFormData({
        username: user1.username,
        firstName: user1.firstName,
        lastName: user1.lastName,
        email: user1.email,
        password: '',
        roles: user1.roles
      });
    }
  }, [user1]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.userForm}>
      <div className={styles.formGroup}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={!user1}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        {user1 ? 'Update' : 'Add'} User
      </button>
    </form>
  );
}

export default UserForm;