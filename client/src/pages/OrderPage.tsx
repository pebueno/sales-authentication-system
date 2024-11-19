import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useOrders } from '../hooks/useOrders';
import { useAgents } from '../hooks/useAgents';
import { useCustomers } from '../hooks/useCustomers';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';
import SummaryCard from '../components/SummaryCard';
import { Order, Agent, Customer } from '../components/common/types';

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
          prev.map((c: any) =>
            c.ordNum === editingOrder.ordNum ? { ...c, ...formattedData } : c,
          ),
        );
        alert('Order updated successfully!');
      } else {
        const newOrder = await addOrder(formattedData);
        setOrders((prev) => [...prev, newOrder]);
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
            <OrderList
              orders={orders}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
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
