import React, { useState } from 'react';
import styles from './AddressSearch.module.css';

function AddressSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={styles.addressSearch}>
      <input
        type="text"
        placeholder="Search addresses..."
        value={searchTerm}
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  );
}

export default AddressSearch;