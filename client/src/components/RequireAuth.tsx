import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.user) {
    // If the user is not logged in (auth.user is null)
    if (allowedRoles.includes('guest')) {
      // Allow access to guest-only routes like /login and /register
      return <Outlet />;
    }
    // Redirect unauthenticated users to /login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is logged in but tries to access guest-only routes
  if (allowedRoles.includes('guest')) {
    // Redirect to the role-specific default page
    switch (auth.user.role) {
      case 'admin':
      case 'agent':
        return <Navigate to="/agent" replace />;
      case 'customer':
        return <Navigate to="/customer" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // If the user's role is not in the allowedRoles array
  if (!allowedRoles.includes(auth.user.role)) {
    // Redirect to /unauthorized
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Authorized user renders child routes
  return <Outlet />;
};
