import { useAuthenticatedApi } from './useAuth';
import { Agent } from '../components/common/types';

export const useAgents = () => {
  const api = useAuthenticatedApi();

  const fetchAgents = async () => {
    try {
      const response = await api.get('/agents');
      return response.data;
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }
  };

  const addAgent = async (agentData: Agent) => {
    try {
      const response = await api.post('/agents', agentData);
      return response.data;
    } catch (error) {
      console.error('Error adding agent:', error);
      throw error;
    }
  };

  const updateAgent = async (agentCode: string, agentData: Agent) => {
    try {
      const response = await api.patch(`/agents/${agentCode}`, agentData);
      return response.data;
    } catch (error) {
      console.error('Error updating agent:', error);
      throw error;
    }
  };

  const deleteAgent = async (agentCode: string) => {
    try {
      await api.delete(`/agents/${agentCode}`);
      return agentCode;
    } catch (error) {
      console.error('Error deleting agent:', error);
      throw error;
    }
  };

  return { fetchAgents, addAgent, updateAgent, deleteAgent };
};
