import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useOrders } from '../hooks/useOrders';
import { useAgents } from '../hooks/useAgents';
import { useCustomers } from '../hooks/useCustomers';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';
import { Order, Agent, Customer } from '../components/common/types';

const OrderPage: React.FC = () => {
  const { fetchOrders, addOrder, updateOrder, deleteOrder } = useOrders();
  const { fetchAgents } = useAgents();
  const { fetchCustomers } = useCustomers();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Partial<Order> | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [orders, customers, agents] = await Promise.all([
          fetchOrders(),
          fetchCustomers(),
          fetchAgents(),
        ]);

        setOrders(orders || []);
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
        // await addOrder(formattedData);
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
  );
};

export default OrderPage;
