import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAgents } from '../hooks/useAgents';
import AgentList from '../components/AgentList';
import AgentForm from '../components/AgentForm';

const AgentPage: React.FC = () => {
  const { fetchAgents, addAgent, updateAgent, deleteAgent } = useAgents();
  const [agents, setAgents] = useState<any[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingAgent, setEditingAgent] = useState<any | null>(null);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const data = await fetchAgents();
        setAgents(data || []);
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      }
    };

    loadAgents();
  }, []);

  // Handle form submission (add or update)
  const handleFormSubmit = async (formData: any) => {
    try {
      if (editingAgent) {
        // Update agent
        const updatedAgent = await updateAgent(
          editingAgent.agentCode,
          formData,
        );
        setAgents((prev) =>
          prev.map((agent) =>
            agent.agentCode === editingAgent.agentCode ? updatedAgent : agent,
          ),
        );
        alert('Agent updated successfully!');
      } else {
        // Add new agent
        const newAgent = await addAgent(formData);
        setAgents((prev) => [...prev, newAgent]);
        alert('Agent added successfully!');
      }
      setIsFormVisible(false);
      setEditingAgent(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit agent data.');
    }
  };

  const handleAddClick = () => {
    setEditingAgent(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (agent: any) => {
    setEditingAgent(agent);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setEditingAgent(null);
    setIsFormVisible(false);
  };

  const handleDeleteClick = async (agentCode: string) => {
    try {
      await deleteAgent(agentCode);
      setAgents((prev) =>
        prev.filter((agent) => agent.agentCode !== agentCode),
      );
      alert('Agent deleted successfully!');
    } catch (error) {
      console.error('Error deleting agent:', error);
      alert('Failed to delete agent.');
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      {!isFormVisible ? (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" component="h1">
              Agent Management
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
            >
              Add Agent
            </Button>
          </Box>
          <AgentList
            agents={agents}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </>
      ) : (
        <AgentForm
          onSubmit={handleFormSubmit}
          agentData={editingAgent}
          onCancel={handleCancel}
        />
      )}
    </Box>
  );
};

export default AgentPage;
