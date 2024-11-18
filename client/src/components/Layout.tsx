import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Box
        component="main"
        sx={{
          flex: 1,
          marginTop: '64px', // Adjust for AppBar height
          padding: '1rem',
        }}
      >
        <Outlet />
      </Box>
    </React.Fragment>
  );
};

export default Layout;
