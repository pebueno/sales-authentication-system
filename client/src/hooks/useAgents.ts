import useAuthentication from './useSecureApi';
import { Agent } from '../components/common/types';

export const useAgents = () => {
  const api = useAuthentication();

  const fetchAgents = async (): Promise<Agent[]> => {
    const response = await api.get('/agents');
    return response.data;
  };

  return { fetchAgents };
};
