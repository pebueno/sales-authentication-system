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
import { Order } from './common/types';

type OrderListProps = {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (ordNum: number) => void;
};

const OrderList: React.FC<OrderListProps> = ({ orders, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '1rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell>Order Amount</TableCell>
            <TableCell>Advance Amount</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Order Description</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Agent Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.ordNum}>
              <TableCell>{order.ordNum}</TableCell>
              <TableCell>{order.ordAmount}</TableCell>
              <TableCell>{order.advanceAmount}</TableCell>
              <TableCell>{order.ordDate}</TableCell>
              <TableCell>{order.ordDescription}</TableCell>
              <TableCell>{order.custCode?.custCode || 'N/A'}</TableCell>
              <TableCell>{order.agentCode?.agentName || 'N/A'}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(order)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(order.ordNum)}
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

export default OrderList;
