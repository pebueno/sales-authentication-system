import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCustomers } from '../hooks/useCustomers';
import { useAgents } from '../hooks/useAgents';
import CustomerForm from '../components/CustomerForm';
import PaginatedTable from '../components/PaginatedTable';
import { Customer, Agent } from '../components/common/types';

const CustomerPage: React.FC = () => {
  const { fetchCustomers, addCustomer, updateCustomer, deleteCustomer } =
    useCustomers();
  const { fetchAgents } = useAgents();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [customers, agents] = await Promise.all([
          fetchCustomers(),
          fetchAgents(),
        ]);

        setCustomers(customers || []);
        setAgents(agents || []);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    loadData();
  }, []);

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
        agentCode: customerData.agent?.agentCode,
      };

      if (editingCustomer) {
        await updateCustomer(editingCustomer.custCode, formattedData);
        setCustomers((prev) =>
          prev.map((c) =>
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

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: 'custCode', label: 'Customer Code' },
    { id: 'custName', label: 'Customer Name' },
    { id: 'custCity', label: 'City' },
    { id: 'workingArea', label: 'Working Area' },
    { id: 'custCountry', label: 'Country' },
    { id: 'phoneNo', label: 'Phone No' },
    { id: 'grade', label: 'Grade' },
    { id: 'openingAmt', label: 'Opening Amount' },
    { id: 'receiveAmt', label: 'Receive Amount' },
    { id: 'paymentAmt', label: 'Payment Amount' },
    { id: 'outstandingAmt', label: 'Outstanding Amount' },
    { id: 'agentName', label: 'Agent Name' },
  ];

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
          <PaginatedTable
            columns={columns}
            rows={customers.map((customer) => ({
              ...customer,
              agentName: customer.agentCode?.agentName || 'N/A',
            }))}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            rowsPerPage={rowsPerPage}
            page={page}
            count={customers.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            actions
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
