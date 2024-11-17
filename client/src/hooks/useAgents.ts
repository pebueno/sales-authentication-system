import { useAuthenticatedApi } from './useAuth';
import { Agent } from '../components/common/types';

export const useAgents = () => {
  const api = useAuthenticatedApi();

  const fetchAgents = async (): Promise<Agent[]> => {
    const response = await api.get('/agents');
    return response.data;
  };

  return { fetchAgents };
};
