import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

interface AgentFormProps {
  onSubmit: (data: any) => void; // Function to handle form submission
  agentData?: any; // Existing agent data for editing
  onCancel: () => void; // Callback for canceling the form
}

const AgentForm: React.FC<AgentFormProps> = ({
  onSubmit,
  agentData,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    agentCode: '',
    agentName: '',
    workingArea: '',
    commission: '',
    phoneNo: '',
    country: '',
  });

  useEffect(() => {
    // If editing, populate the form with existing agent data
    if (agentData) {
      setFormData(agentData);
    }
  }, [agentData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '2rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5">
          {agentData ? 'Edit Agent' : 'Add New Agent'}
        </Typography>
        <TextField
          label="Agent Code"
          name="agentCode"
          value={formData.agentCode}
          onChange={handleChange}
          required={!agentData} // Required only for adding a new agent
          disabled={!!agentData} // Disable for editing
          fullWidth
        />
        <TextField
          label="Agent Name"
          name="agentName"
          value={formData.agentName}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Working Area"
          name="workingArea"
          value={formData.workingArea}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Commission"
          name="commission"
          value={formData.commission}
          onChange={handleChange}
          required
          type="number"
          fullWidth
        />
        <TextField
          label="Phone Number"
          name="phoneNo"
          value={formData.phoneNo}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          fullWidth
        />
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {agentData ? 'Update Agent' : 'Add Agent'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AgentForm;
