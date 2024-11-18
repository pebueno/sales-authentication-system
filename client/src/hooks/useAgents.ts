import { useAuthenticatedApi } from './useAuth';

export const useAgents = () => {
  const api = useAuthenticatedApi();

  const fetchAgents = async () => {
    try {
      const response = await api.get('/agents');
      return response.data; // Assume this is the array of agents
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }
  };

  return { fetchAgents };
};
