import React, { useEffect, useState } from 'react';
import { getAgents } from '../services/api';

const DashboardPage: React.FC = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await getAgents();
        setAgents(response.data);
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div>
      <h1>Agents</h1>
      <ul>
        {agents.map((agent: any) => (
          <li key={agent.agentCode}>{agent.agentName}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
