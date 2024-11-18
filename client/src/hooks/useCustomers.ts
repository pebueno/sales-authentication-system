import { useAuthenticatedApi } from './useAuth';

export const useCustomers = () => {
  const api = useAuthenticatedApi();

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  };

  const addCustomer = async (customerData: any) => {
    try {
      const response = await api.post('/customers', customerData);
      return response.data;
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
  };

  const updateCustomer = async (custCode: string, customerData: any) => {
    try {
      const response = await api.patch(`/customers/${custCode}`, customerData);
      return response.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  };

  const deleteCustomer = async (custCode: string) => {
    try {
      const response = await api.delete(`/customers/${custCode}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  };

  return { fetchCustomers, addCustomer, updateCustomer, deleteCustomer };
};
