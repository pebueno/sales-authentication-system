import { useAuthenticatedApi } from './useAuth';
import { Order } from '../components/common/types';

export const useOrders = () => {
  const api = useAuthenticatedApi();

  const fetchOrders = async (): Promise<Order[]> => {
    try {
      const response = await api.get('/orders');
      return response.data.items;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

  const addOrder = async (orderData: Partial<Order>): Promise<Order> => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  };

  const updateOrder = async (
    ordNum: number,
    orderData: Partial<Order>,
  ): Promise<Order> => {
    try {
      const response = await api.patch(`/orders/${ordNum}`, orderData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };

  const deleteOrder = async (ordNum: number): Promise<void> => {
    try {
      await api.delete(`/orders/${ordNum}`);
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  };

  return { fetchOrders, addOrder, updateOrder, deleteOrder };
};
