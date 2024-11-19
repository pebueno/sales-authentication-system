import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ backgroundColor: '#007BFF' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Section - Navigation Links */}
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Button
            component={Link}
            to="/agent"
            sx={{ color: '#fff', textTransform: 'none' }}
          >
            Agents
          </Button>

          <Button
            component={Link}
            to="/customer"
            sx={{ color: '#fff', textTransform: 'none' }}
          >
            Customers
          </Button>

          <Button
            component={Link}
            to="/orders"
            sx={{ color: '#fff', textTransform: 'none' }}
          >
            Orders
          </Button>
        </Box>

        {/* Right Section - Login/Logout Button */}
        {auth.token ? (
          <Button
            onClick={handleLogout}
            sx={{ color: '#fff', textTransform: 'none' }}
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => navigate('/login')}
            sx={{ color: '#fff', textTransform: 'none' }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
