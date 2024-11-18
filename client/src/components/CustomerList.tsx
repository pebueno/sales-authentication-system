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
import { Customer } from './common/types';

type CustomerListProps = {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (custCode: string) => void;
};

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '1rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer Code</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Working Area</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Phone No</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Opening Amt</TableCell>
            <TableCell>Receive Amt</TableCell>
            <TableCell>Payment Amt</TableCell>
            <TableCell>Outstanding Amt</TableCell>
            <TableCell>Agent Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.custCode}>
              <TableCell>{customer.custCode}</TableCell>
              <TableCell>{customer.custName}</TableCell>
              <TableCell>{customer.custCity}</TableCell>
              <TableCell>{customer.workingArea}</TableCell>
              <TableCell>{customer.custCountry}</TableCell>
              <TableCell>{customer.phoneNo}</TableCell>
              <TableCell>{customer.grade}</TableCell>
              <TableCell>{customer.openingAmt}</TableCell>
              <TableCell>{customer.receiveAmt}</TableCell>
              <TableCell>{customer.paymentAmt}</TableCell>
              <TableCell>{customer.outstandingAmt}</TableCell>
              <TableCell>{customer.agentCode?.agentName}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(customer)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(customer.custCode)}
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

export default CustomerList;
