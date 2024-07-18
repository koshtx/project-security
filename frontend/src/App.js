import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import UserList from './components/user/UserList/UserList';
import AddressList from './components/address/AddressList/AddressList';
import RoleList from './components/role/RoleList/RoleList';
import UserProfile from './components/profile/UserProfile/UserProfile';
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import styles from './App.module.css';

function App() {
  const { user } = useAuth();

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.mainContent}>
        {user && <Sidebar />}
        <div className={styles.pageContent}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
            <Route path="/addresses" element={<ProtectedRoute><AddressList /></ProtectedRoute>} />
            <Route path="/roles" element={<ProtectedRoute roles={['ROLE_ADMIN']}><RoleList /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/" element={
              user 
                ? <Navigate to="/profile" replace /> 
                : <Navigate to="/login" replace />
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;