import React from 'react';
import RoleRestricted from '../components/RoleRestricted';

const CustomerPage: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Customer Management</h1>
      </header>
      <main>
        <RoleRestricted allowedRoles={['admin', 'customer']}>
          <p>
            This page is under construction. Only customers and admins can
            access this page.
          </p>
        </RoleRestricted>
      </main>
    </div>
  );
};

export default CustomerPage;
