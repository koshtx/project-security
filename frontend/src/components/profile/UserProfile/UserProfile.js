import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../../services/userService';
import AddressManagement from '../../address/AddressManagement/AddressManagement';
import { useAuth } from '../../../hooks/useAuth';
import styles from './UserProfile.module.css';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const data = await getUserProfile();
      setProfile(data);
    } catch (error) {
      setError('Failed to fetch user profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(profile);
      alert('Profile updated successfully');
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.userProfile}>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit} className={styles.profileForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={profile.username}
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
            value={profile.firstName}
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
            value={profile.lastName}
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
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </div>
        <button type="submit" className={styles.submitButton}>Update Profile</button>
      </form>
      <AddressManagement />
    </div>
  );
}

export default UserProfile;