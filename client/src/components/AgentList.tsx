import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type AgentListProps = {
  agents: any[];
  onEdit: (agent: any) => void;
  onDelete: (agentCode: string) => void;
};

const AgentList: React.FC<AgentListProps> = ({ agents, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '1rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Agent Code</TableCell>
            <TableCell>Agent Name</TableCell>
            <TableCell>Working Area</TableCell>
            <TableCell>Commission</TableCell>
            <TableCell>Phone No</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agents.map((agent) => (
            <TableRow key={agent.agentCode}>
              <TableCell>{agent.agentCode}</TableCell>
              <TableCell>{agent.agentName}</TableCell>
              <TableCell>{agent.workingArea}</TableCell>
              <TableCell>{agent.commission}</TableCell>
              <TableCell>{agent.phoneNo}</TableCell>
              <TableCell>{agent.country}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(agent)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(agent.agentCode)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AgentList;
