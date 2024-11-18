import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotAuthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Not Authorized
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
        You do not have permission to access this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </Button>
    </Container>
  );
};

export default NotAuthorized;
