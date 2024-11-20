import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useOrders } from '../hooks/useOrders';
import { useAgents } from '../hooks/useAgents';
import { useCustomers } from '../hooks/useCustomers';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import SummaryCard from '../components/SummaryCard';
import { Order, Agent, Customer } from '../components/common/types';
import PaginatedTable from '../components/PaginatedTable';

const OrderPage: React.FC = () => {
  const {
    fetchOrders,
    addOrder,
    updateOrder,
    deleteOrder,
    fetchTotalByCustomer,
    fetchTotalByAgent,
    fetchTotalByCountry,
  } = useOrders();
  const { fetchAgents } = useAgents();
  const { fetchCustomers } = useCustomers();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Partial<Order> | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalByCustomer, setTotalByCustomer] = useState([]);
  const [totalByAgent, setTotalByAgent] = useState([]);
  const [totalByCountry, setTotalByCountry] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const loadData = async () => {
      try {
        const [orders, customers, agents, byCustomer, byAgent, byCountry] =
          await Promise.all([
            fetchOrders(),
            fetchCustomers(),
            fetchAgents(),
            fetchTotalByCustomer(),
            fetchTotalByAgent(),
            fetchTotalByCountry(),
          ]);

        setOrders(orders || []);
        console.log(orders);

        setCustomers(customers || []);
        setAgents(agents || []);
        setTotalByCustomer(byCustomer || []);
        setTotalByAgent(byAgent || []);
        setTotalByCountry(byCountry || []);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    loadData();
  }, []);

  const handleAddClick = () => {
    setFormVisible(true);
    setEditingOrder(null);
  };

  const handleEditClick = (order: Order) => {
    setFormVisible(true);
    setEditingOrder(order);
  };

  const handleDeleteClick = async (ordNum: number) => {
    try {
      await deleteOrder(ordNum);
      setOrders((prev) => prev.filter((o) => o.ordNum !== ordNum));
      alert('Order deleted successfully!');
    } catch (error) {
      alert('Failed to delete order');
    }
  };

  const handleFormSubmit = async (orderData: Partial<Order>) => {
    try {
      const formattedData = {
        ...orderData,
        agentCode: orderData.agent?.agentCode,
        custCode: orderData.customer?.custCode,
      };

      if (editingOrder) {
        await updateOrder(editingOrder.ordNum, formattedData);
        setOrders((prev: any) =>
          prev.map((order: any) =>
            order.ordNum === editingOrder.ordNum
              ? { ...order, ...formattedData }
              : order,
          ),
        );
        console.log(orders);

        alert('Order updated successfully!');
      } else {
        const newOrder = await addOrder(formattedData);
        setOrders((prev) => [...prev, newOrder]);
        console.log(orders);

        alert('Order added successfully!');
      }

      setFormVisible(false);
      setEditingOrder(null);
    } catch (error) {
      console.error('Error adding/updating order:', error);
      alert('Failed to submit order data');
    }
  };

  const handleCancel = () => {
    setFormVisible(false);
    setEditingOrder(null);
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
    { id: 'ordNum', label: 'Order Number' },
    { id: 'ordAmount', label: 'Order Amount' },
    { id: 'advanceAmount', label: 'Advance Amount' },
    { id: 'ordDate', label: 'Order Date' },
    { id: 'ordDescription', label: 'Order Description' },
    { id: 'customerName', label: 'Customer Name' },
    { id: 'agentName', label: 'Agent Name' },
  ];

  return (
    <Box sx={{ padding: '2rem' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title="Total Orders by Customer"
            data={totalByCustomer}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard title="Total Orders by Agent" data={totalByAgent} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard title="Total Orders by Country" data={totalByCountry} />
        </Grid>
      </Grid>

      <Box mt={4}>
        {!isFormVisible ? (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4" component="h1">
                Order Management
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddClick}
              >
                Add Order
              </Button>
            </Box>
            <PaginatedTable
              columns={columns}
              rows={orders.map((order) => ({
                ...order,
                agentName: order.agentCode?.agentName || 'N/A',
                custName: order.custCode?.custName || 'N/A',
              }))}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              rowsPerPage={rowsPerPage}
              page={page}
              count={orders.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              actions
            />
          </>
        ) : (
          <OrderForm
            onSubmit={handleFormSubmit}
            orderData={editingOrder || undefined}
            onCancel={handleCancel}
            availableAgents={agents}
            availableCustomers={customers}
            isEditMode={!!editingOrder}
          />
        )}
      </Box>
    </Box>
  );
};

export default OrderPage;
