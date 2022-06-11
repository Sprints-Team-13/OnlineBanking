import "./users.scss"
import React from 'react'

import useGetUsers from '../../../hooks/queries/useGetUsers'
import { DataGrid } from '@mui/x-data-grid';

function Users() {

  // fetch and cache all users
  const {data: users} = useGetUsers()
  console.log(users);

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 150, flex: 3 },
    { field: 'fullName', headerName: 'Full name', minWidth: 150, flex: 3 },
    { field: 'email', headerName: 'Email', minWidth: 150, flex: 3 },
    { field: 'phone', headerName: 'Phone', type: 'phone', minWidth: 150, flex: 3 },
    { field: 'role', headerName: 'Role', minWidth: 70, flex: 1 },
    { field: 'authorized', headerName: 'Authorized', type: 'boolean' , minWidth: 70, flex: 1 },
    { field: 'date', headerName: 'Date', type: 'date' , minWidth: 150, flex: 3 },
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
    <div className="users">

      <h2>Users</h2>
      
      <div style={{ height: 700, width: '90%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {users &&
            <DataGrid
              autoHeight
              className='table'
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
            />
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Users