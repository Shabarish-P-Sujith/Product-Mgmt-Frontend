import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin, isUser } from './authService';

const ProtectedRoute = ({ children, requiredRole }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === 'admin' && !isAdmin()) {
    return <Navigate to="/user-products" />;
  }

  if (requiredRole === 'user' && !isUser()) {
    return <Navigate to="/admin-products" />;
  }

  return children;
};

export default ProtectedRoute; 