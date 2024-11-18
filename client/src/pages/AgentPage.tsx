import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAgents } from '../hooks/useAgents';
import { Agent } from '../components/common/types';

const AgentPage: React.FC = () => {
  const { fetchAgents } = useAgents();
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
    return <Typography>Loading agents...</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <Typography variant="h4">Agent Management</Typography>
        <Button
          variant="outlined"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => console.log('Add new agent')}
        >
          Add New Agent
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Agent Code</TableCell>
              <TableCell>Agent Name</TableCell>
              <TableCell>Working Area</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Phone No</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agents.length > 0 ? (
              agents.map((agent) => (
                <TableRow key={agent.agentCode}>
                  <TableCell>{agent.agentCode}</TableCell>
                  <TableCell>{agent.agentName}</TableCell>
                  <TableCell>{agent.workingArea}</TableCell>
                  <TableCell>{agent.commission}%</TableCell>
                  <TableCell>{agent.phoneNo}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => console.log('Edit agent', agent.agentCode)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() =>
                        console.log('Delete agent', agent.agentCode)
                      }
                      sx={{ marginLeft: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No agents found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AgentPage;
