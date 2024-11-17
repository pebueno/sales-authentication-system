import React, { useEffect, useState } from 'react';
import { useAgents } from '../hooks/useAgents';
import RoleRestricted from '../components/RoleRestricted';
import { Agent } from '../components/common/types';
import { useAuth } from '../hooks/useAuth';

const AgentPage: React.FC = () => {
  const { auth, logout } = useAuth(); // Destructure auth from useAuth
  const { user } = auth; // Extract user from auth
  const { fetchAgents } = useAgents();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const data = await fetchAgents();
        if (Array.isArray(data)) {
          setAgents(data as Agent[]);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAgents();
  }, [fetchAgents]);

  if (!user) {
    return <div>Please log in to access this page.</div>;
  }

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
          <button>Create New Agent</button>
        </RoleRestricted>
      </main>
    </div>
  );
};

export default AgentPage;
