import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import { Order, Customer, Agent, OrderFormProps } from './common/types';

const OrderForm: React.FC<OrderFormProps> = ({
  onSubmit,
  orderData,
  availableAgents,
  availableCustomers,
  onCancel,
  isEditMode,
}) => {
  const [formData, setFormData] = useState<Partial<Order>>({
    ordNum: orderData?.ordNum || 0,
    ordAmount: orderData?.ordAmount || 0,
    advanceAmount: orderData?.advanceAmount || 0,
    ordDate: orderData?.ordDate || '',
    ordDescription: orderData?.ordDescription || '',
    customer: orderData?.custCode || '',
    agent: orderData?.agentCode || '',
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

  const handleCustomerChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFormData((prev) => ({
      ...prev,
      customer:
        availableCustomers.find(
          (customer: Customer) => customer.custCode === e.target.value,
        ) || prev.customer,
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
        {isEditMode ? 'Update Order' : 'Add New Order'}
      </Typography>
      <TextField
        label="Order Number"
        name="ordNum"
        value={formData.ordNum}
        onChange={handleChange}
        fullWidth
        required
        disabled={isEditMode} // Only editable during addition
      />
      <TextField
        label="Order Amount"
        name="ordAmount"
        type="number"
        value={formData.ordAmount}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Advance Amount"
        name="advanceAmount"
        type="number"
        value={formData.advanceAmount}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Order Date"
        name="ordDate"
        type="date"
        value={formData.ordDate}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Order Description"
        name="ordDescription"
        value={formData.ordDescription}
        onChange={handleChange}
        fullWidth
        required
      />
      <FormControl fullWidth required>
        <InputLabel>Choose the Customer</InputLabel>
        <Select
          value={formData.customer?.custCode || ''} // Only the custCode
          onChange={handleCustomerChange}
        >
          {availableCustomers.map((customer: Customer) => (
            <MenuItem key={customer.custCode} value={customer.custCode}>
              {customer.custName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth required>
        <InputLabel>Choose the Agent</InputLabel>
        <Select
          value={formData.agent?.agentCode || ''}
          onChange={handleAgentChange}
        >
          {availableAgents.map((agent: Agent) => (
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
          {isEditMode ? 'Update Order' : 'Add Order'}
        </Button>
      </Box>
    </Box>
  );
};

export default OrderForm;
