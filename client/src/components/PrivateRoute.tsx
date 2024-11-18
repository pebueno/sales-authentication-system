import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const storedAuth = localStorage.getItem('auth');
  const auth = storedAuth ? JSON.parse(storedAuth) : null;

  return auth?.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
