import React, { useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Customer, Agent, CustomerFormProps } from './common/types';

const CustomerForm: React.FC<CustomerFormProps> = ({
  onSubmit,
  customerData,
  availableAgents,
  onCancel,
  isEditMode,
}) => {
  const [formData, setFormData] = useState<Partial<Customer>>({
    custCode: customerData?.custCode || '',
    custName: customerData?.custName || '',
    custCity: customerData?.custCity || '',
    workingArea: customerData?.workingArea || '',
    custCountry: customerData?.custCountry || '',
    grade: customerData?.grade || 0,
    openingAmt: customerData?.openingAmt || '',
    receiveAmt: customerData?.receiveAmt || '',
    paymentAmt: customerData?.paymentAmt || '',
    outstandingAmt: customerData?.outstandingAmt || '',
    phoneNo: customerData?.phoneNo || '',
    agent:
      typeof customerData?.agentCode === 'string'
        ? customerData.agentCode
        : customerData?.agentCode || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgentChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFormData((prev: any) => ({
      ...prev,
      agent:
        availableAgents.find((agent) => agent.agentCode === e.target.value) ||
        prev.agent,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <Typography variant="h5" component="h1" align="center">
        {isEditMode ? 'Update Customer' : 'Add New Customer'}
      </Typography>
      <TextField
        label="Customer Code"
        name="custCode"
        value={formData.custCode}
        onChange={handleChange}
        fullWidth
        required
        disabled={isEditMode} // Disable for editing
      />
      <TextField
        label="Customer Name"
        name="custName"
        value={formData.custName}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="City"
        name="custCity"
        value={formData.custCity}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Working Area"
        name="workingArea"
        value={formData.workingArea}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Country"
        name="custCountry"
        value={formData.custCountry}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Grade"
        name="grade"
        type="number"
        value={formData.grade}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Opening Amount"
        name="openingAmt"
        type="number"
        value={formData.openingAmt}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Receive Amount"
        name="receiveAmt"
        type="number"
        value={formData.receiveAmt}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Payment Amount"
        name="paymentAmt"
        type="number"
        value={formData.paymentAmt}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Outstanding Amount"
        name="outstandingAmt"
        type="number"
        value={formData.outstandingAmt}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Phone Number"
        name="phoneNo"
        value={formData.phoneNo}
        onChange={handleChange}
        fullWidth
        required
      />
      <FormControl fullWidth required>
        <InputLabel>Choose the Agent</InputLabel>
        <Select
          value={formData.agent?.agentCode || ''}
          onChange={handleAgentChange}
          fullWidth
          required
        >
          {availableAgents.map((agent) => (
            <MenuItem key={agent.agentCode} value={agent.agentCode}>
              {agent.agentName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" justifyContent="space-between">
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {isEditMode ? 'Update Customer' : 'Add Customer'}
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerForm;
