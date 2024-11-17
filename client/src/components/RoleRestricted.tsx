import React from 'react';
import { useAuth } from '../components/contexts/AuthContext';

interface RoleRestrictedProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleRestricted: React.FC<RoleRestrictedProps> = ({
  allowedRoles,
  children,
}) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <p>You do not have permission to view this content.</p>;
  }

  return <>{children}</>;
};

export default RoleRestricted;
