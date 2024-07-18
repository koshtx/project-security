import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      <h1>Welcome to the Admin Dashboard</h1>
      {user ? (
        <div>
          <p>Hello, {user.username}!</p>
          <nav>
            <ul>
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to="/users">Manage Users</Link></li>
              <li><Link to="/addresses">Manage Addresses</Link></li>
              {user.roles.includes('ADMIN') && (
                <li><Link to="/roles">Manage Roles</Link></li>
              )}
            </ul>
          </nav>
        </div>
      ) : (
        <div>
          <p>Please log in to access the dashboard.</p>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}

export default Home;