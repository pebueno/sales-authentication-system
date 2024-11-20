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
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Column = {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
};

type PaginatedTableProps = {
  columns: Column[];
  rows: any[];
  onEdit?: (row: any) => void;
  onDelete?: (id: string | number) => void;
  rowsPerPage: number;
  page: number;
  count: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  actions?: boolean; // Enable or disable action buttons
};

const PaginatedTable: React.FC<PaginatedTableProps> = ({
  columns,
  rows,
  onEdit,
  onDelete,
  rowsPerPage,
  page,
  count,
  onPageChange,
  onRowsPerPageChange,
  actions = false,
}) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '1rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align || 'left'}>
                {column.label}
              </TableCell>
            ))}
            {actions && <TableCell align="center">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, rowIndex) => (
              <TableRow key={row.id || rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align || 'left'}>
                    {row[column.id]}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell align="center">
                    {onEdit && (
                      <IconButton onClick={() => onEdit(row)} color="primary">
                        <EditIcon />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton
                        onClick={() => onDelete(row.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default PaginatedTable;
