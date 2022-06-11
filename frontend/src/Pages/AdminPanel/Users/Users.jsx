import "./users.scss"
import React from 'react'

import useGetUsers from '../../../hooks/queries/useGetUsers'
import { DataGrid } from '@mui/x-data-grid';

function Users() {

  // fetch and cache all users
  const {data: users} = useGetUsers()
  console.log(users);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'fullName', headerName: 'Full name', width: 150 },
    { field: 'email', headerName: 'Email', minWidth: 180 },
    { field: 'phone', headerName: 'Phone', type: 'phone', width: 150 },
    { field: 'role', headerName: 'Role', width: 70 },
    { field: 'authorized', headerName: 'Authorized', type: 'boolean' , width: 100 },
    { field: 'date', headerName: 'Date', type: 'date' , width: 130 },
  ];
  
  const rows = users && users.map(user => (
    {
      id: user._id, 
      fullName: user.fullName, 
      email: user.email, 
      phone: user.phone, 
      role: user.role, 
      authorized: user.authorized, 
      date: user.createdAt
    }
  ))

  console.log(rows);

  return (
    <div style={{ height: 800, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          {users &&
          <DataGrid
            autoHeight
            className='table'
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
          }
        </div>
      </div>
    </div>
  )
}

export default Users