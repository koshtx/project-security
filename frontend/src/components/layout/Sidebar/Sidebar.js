import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import styles from './Sidebar.module.css';

function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.navList}>
          <li><Link to="/users" className={styles.navLink}>Users</Link></li>
          <li><Link to="/addresses" className={styles.navLink}>Addresses</Link></li>
          {user.roles.includes('ROLE_ADMIN') && (
            <li><Link to="/roles" className={styles.navLink}>Roles</Link></li>
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;