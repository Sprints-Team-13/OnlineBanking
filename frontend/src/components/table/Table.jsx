import './table.scss'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'fullName', headerName: 'Full name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'phone', headerName: 'Phone', type: 'tel', width: 130 },
  { field: 'role', headerName: 'Role', width: 130 },
  { field: 'authorized', headerName: 'Authorized', type: 'boolean' , width: 130 },
  { field: 'date', headerName: 'Date', type: 'date' , width: 130 },
];

const rows = [
  { id: 1, fullName: 'Snow', email: 'Jon', phone: 35, role: 'user', authorized: false, date: '2022-06-10T13:36:43.076Z'},
  { id: 2, fullName: 'Snow', email: 'Jon', phone: 35, role: 'user', authorized: true, date: '2022-06-10T13:36:43.076Z'},
];

export default function Table() {

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        className='table'
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
