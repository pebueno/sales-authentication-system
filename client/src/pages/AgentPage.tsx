import React, { useEffect, useState } from 'react';
import { useAgents } from '../hooks/useAgents';
import RoleRestricted from '../components/RoleRestricted';
import { Agent } from '../components/common/types';
import { useAuth } from '../components/contexts/AuthContext';

const AgentPage: React.FC = () => {
  const { fetchAgents } = useAgents();
  const { user, logout } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const data = await fetchAgents();
        setAgents(data);
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAgents();
  }, [fetchAgents]);

  if (isLoading) {
    return <div>Loading agents...</div>;
  }

  return (
    <div>
      <header>
        <h1>Agent Management</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <main>
        <RoleRestricted allowedRoles={['admin', 'agent']}>
          <h2>Agents</h2>
          <ul>
            {agents.map((agent) => (
              <li key={agent.agentCode}>{agent.agentName}</li>
            ))}
          </ul>
          {/* Add "Create New Agent" functionality */}
          <button>Create New Agent</button>
        </RoleRestricted>
      </main>
    </div>
  );
};

export default AgentPage;
