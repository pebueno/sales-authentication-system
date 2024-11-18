import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCustomers } from '../hooks/useCustomers';
import { useAgents } from '../hooks/useAgents';

import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';
import { Customer, Agent } from '../components/common/types';

const CustomerPage: React.FC = () => {
  const { fetchCustomers, addCustomer, updateCustomer, deleteCustomer } =
    useCustomers();
  const { fetchAgents } = useAgents();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Failed to load customers:', error);
      }
    };
    loadCustomers();

    const loadAgents = async () => {
      try {
        const data = await fetchAgents();
        setAgents(data);
      } catch (error) {
        console.error('Failed to load agents:', error);
      }
    };
    loadAgents();
  }, [fetchCustomers, fetchAgents]);

  const handleAddClick = () => {
    setFormVisible(true);
    setEditingCustomer(null);
  };

  const handleEditClick = (customer: Customer) => {
    setFormVisible(true);
    setEditingCustomer(customer);
  };

  const handleDeleteClick = async (custCode: string) => {
    try {
      await deleteCustomer(custCode);
      setCustomers((prev) => prev.filter((c) => c.custCode !== custCode));
      alert('Customer deleted successfully!');
    } catch (error) {
      alert('Failed to delete customer');
    }
  };

  const handleFormSubmit = async (customerData: Partial<Customer>) => {
    try {
      const formattedData = {
        ...customerData,
        agentCode: customerData.agent?.agentCode, // Ensure agentCode is a string
      };

      if (editingCustomer) {
        await updateCustomer(editingCustomer.custCode, formattedData);
        setCustomers((prev: any) =>
          prev.map((c: any) =>
            c.custCode === editingCustomer.custCode
              ? { ...c, ...formattedData }
              : c,
          ),
        );
        alert('Customer updated successfully!');
      } else {
        const newCustomer = await addCustomer(formattedData);
        setCustomers((prev) => [...prev, newCustomer]);
        alert('Customer added successfully!');
      }
      setFormVisible(false);
      setEditingCustomer(null);
    } catch (error) {
      alert('Failed to submit customer data');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFormVisible(false);
    setEditingCustomer(null);
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      {!isFormVisible ? (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" component="h1">
              Customer Management
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
            >
              Add Customer
            </Button>
          </Box>
          <CustomerList
            customers={customers}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </>
      ) : (
        <CustomerForm
          onSubmit={handleFormSubmit}
          customerData={editingCustomer || undefined}
          onCancel={handleCancel}
          availableAgents={agents}
          isEditMode={!!editingCustomer}
        />
      )}
    </Box>
  );
};

export default CustomerPage;
