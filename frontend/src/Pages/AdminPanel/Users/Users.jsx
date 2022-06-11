import "./users.scss"
import React from 'react'

import useGetUsers from '../../../hooks/queries/useGetUsers'
import { DataGrid } from '@mui/x-data-grid';

function Users() {

  // fetch and cache all users
  const {data: users} = useGetUsers()
  // console.log(users);

  function date(date) {
    const display = new Date(date)
    return display.toLocaleDateString('en-GB');
  } 

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 150, flex: 3},
    { field: 'fullName', headerName: 'Full name', minWidth: 150, flex: 3 },
    { field: 'email', headerName: 'Email', minWidth: 150, flex: 3 },
    { field: 'phone', headerName: 'Phone', minWidth: 150, flex: 3 },
    { field: 'role', headerName: 'Role', minWidth: 70, flex: 1 },
    { field: 'authorized', headerName: 'Authorized', type: 'boolean' , minWidth: 70, flex: 1 },
    { field: 'date', headerName: 'Date', type: 'date' , minWidth: 100, flex: 1 },
  ];
  
  const rows = users && users.map(user => (
    {
      id: `#${user._id}`,
      fullName: user.fullName, 
      email: user.email, 
      phone: user.phone, 
      role: user.role, 
      authorized: user.authorized, 
      date: date(user.createdAt)
    }
  ))

  return (
    <div className="users">

      <div className="title">
        <h2>Users</h2>
      </div>
      
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
              rowsPerPageOptions={[10]}
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