import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(auth.user.role)) {
    // Redirect to unauthorized if the user's role is not allowed
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Authorized user renders child routes
  return <Outlet />;
};
