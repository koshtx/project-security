import React, { useState } from 'react';
import styles from './UserSearch.module.css';

function UserSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={styles.userSearch}>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  );
}

export default UserSearch;