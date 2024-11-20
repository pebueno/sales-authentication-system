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

  const fetchTotalByCustomer = async () => {
    try {
      const response = await api.get('/orders/total-amount-by-customer');

      return response.data.map((item: any) => ({
        name: item.custCode,
        value: item.totalOrdAmount,
      }));
    } catch (error) {
      console.error('Error fetching total by customer:', error);
      throw error;
    }
  };

  const fetchTotalByAgent = async () => {
    try {
      const response = await api.get('/orders/total-amount-by-agent');
      return response.data.map((item: any) => ({
        name: item.agentCode,
        value: item.totalOrdAmount,
      }));
    } catch (error) {
      console.error('Error fetching total by agent:', error);
      throw error;
    }
  };

  const fetchTotalByCountry = async () => {
    try {
      const response = await api.get('/orders/total-amount-by-country');
      return response.data.map((item: any) => ({
        name: item.custCountry,
        value: item.totalOrdAmount,
      }));
    } catch (error) {
      console.error('Error fetching total by country:', error);
      throw error;
    }
  };

  return {
    fetchOrders,
    addOrder,
    updateOrder,
    deleteOrder,
    fetchTotalByCustomer,
    fetchTotalByAgent,
    fetchTotalByCountry,
  };
};
