import React, { createContext, useState, useEffect } from 'react';
import { getStoredUser, setStoredUser, removeStoredUser } from '../utils/tokenUtils';
import { refreshToken } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    const refreshUserToken = async () => {
      if (user) {
        try {
          const newToken = await refreshToken();
          setUser({ ...user, token: newToken });
          setStoredUser({ ...user, token: newToken });
        } catch (error) {
          console.error('Failed to refresh token:', error);
          logout();
        }
      }
    };

    const intervalId = setInterval(refreshUserToken, 14 * 60 * 1000); // Refresh every 14 minutes

    return () => clearInterval(intervalId);
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setStoredUser(userData);
  };

  const logout = () => {
    setUser(null);
    removeStoredUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};