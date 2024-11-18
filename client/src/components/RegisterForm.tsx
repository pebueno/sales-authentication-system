// import React, { useState } from 'react';
// import {
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from '@mui/material';
// import { RegisterUserData } from './common/types';

// type RegisterFormProps = {
//   onSubmit: (data: RegisterUserData) => void;
// };

// const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
//   const [formData, setFormData] = useState<RegisterUserData>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     role: 'guest',
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name as string]: value as string,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
//       <TextField
//         label="First Name"
//         name="firstName"
//         value={formData.firstName}
//         onChange={handleChange}
//         fullWidth
//         required
//         margin="normal"
//       />
//       <TextField
//         label="Last Name"
//         name="lastName"
//         value={formData.lastName}
//         onChange={handleChange}
//         fullWidth
//         required
//         margin="normal"
//       />
//       <TextField
//         label="Email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         fullWidth
//         required
//         margin="normal"
//         type="email"
//       />
//       <TextField
//         label="Password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         fullWidth
//         required
//         margin="normal"
//         type="password"
//       />
//       <FormControl fullWidth margin="normal">
//         <InputLabel id="role-select-label">Role</InputLabel>
//         <Select
//           value={formData.role}
//           name="role"
//           onChange={(e) =>
//             setFormData((prev) => ({
//               ...prev,
//               role: e.target.value as RegisterUserData['role'],
//             }))
//           }
//           fullWidth
//         >
//           <MenuItem value="guest">Guest</MenuItem>
//           <MenuItem value="agent">Agent</MenuItem>
//           <MenuItem value="admin">Admin</MenuItem>
//         </Select>
//       </FormControl>
//       <Button variant="contained" color="primary" type="submit" fullWidth>
//         Register
//       </Button>
//     </form>
//   );
// };

// export default RegisterForm;

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  Container,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RegisterUserData } from './common/types';

type RegisterFormProps = {
  onSubmit: (data: RegisterUserData) => void;
  onGoBack: () => void; // Callback for navigating back to Login
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, onGoBack }) => {
  const [formData, setFormData] = useState<RegisterUserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'guest',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (
    e: React.ChangeEvent<{ value: unknown; name?: string }>,
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      role: value as RegisterUserData['role'],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Container
      maxWidth="sm"
      style={{ marginTop: '50px', position: 'relative' }}
    >
      <IconButton
        onClick={onGoBack}
        style={{
          position: 'absolute',
          top: '-30px',
          left: '-50px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" component="h1" sx={{ marginBottom: '1rem' }}>
          Register
        </Typography>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Select
          value={formData.role}
          // onChange={handleRoleChange}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              role: e.target.value as RegisterUserData['role'],
            }))
          }
          fullWidth
          displayEmpty
          sx={{ margin: '16px 0' }}
        >
          <MenuItem value="customer">Customer</MenuItem>
          <MenuItem value="agent">Agent</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '1rem' }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
