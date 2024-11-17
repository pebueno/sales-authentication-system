import React, { useEffect, useState } from 'react';
import { useAgents } from '../hooks/useAgents';
import { useAuth } from './contexts/AuthContext';
import { Agent } from '../components/common/types';

const DashboardPage: React.FC = () => {
  const { fetchAgents } = useAgents();
  const { logout } = useAuth();
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
        <h1>Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <main>
        <ul>
          {agents.map((agent) => (
            <li key={agent.agentCode}>{agent.agentName}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default DashboardPage;
