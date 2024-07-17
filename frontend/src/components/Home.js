import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Home = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
      <h1>Welcome to Our App</h1>
      {currentUser ? (
        <div>
          <p>Welcome, {currentUser.username}!</p>
          <Link to="/users">View Users</Link>
          <br />
          <Link to="/address">Manage Addresses</Link>
        </div>
      ) : (
        <div>
          <p>Please log in to access all features.</p>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Home;