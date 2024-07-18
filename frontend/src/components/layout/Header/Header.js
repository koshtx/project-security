import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import styles from './Header.module.css';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li><Link to="/" className={styles.navLink}>Home</Link></li>
          {user ? (
            <>
              <li><Link to="/profile" className={styles.navLink}>Profile</Link></li>
              <li><button onClick={logout} className={styles.logoutButton}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className={styles.navLink}>Login</Link></li>
              <li><Link to="/register" className={styles.navLink}>Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;