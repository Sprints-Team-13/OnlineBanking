import "./users.scss"
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import useGetUsers from '../../../hooks/queries/useGetUsers'
import AdminUsersDialog from "../../../components/dialog/adminUsersDialog";
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";

function Users() {

  // fetch and cache all users
  const {data: users} = useGetUsers()
  console.log(users);

  // convert date to string
  function date(date) {
    const display = new Date(date)
    return display.toLocaleDateString('en-GB');
  }

  // set available actions
  const usersActions = (params) => (
    <AdminUsersDialog title='Actions'>

      <div className='actions'>
        {params.row.authorized
        ?
          <>
            <Button variant="contained" 
              onClick={() => popAction(
                'Are you sure?', 
                "The user will be deactivated!",
                'Deactivate!',
                ()=>apiCrud(`/api/admin/verify`, 'POST', 'User deactivated', {
                  email: params.row.email,
                  authorized: 'false'
                })()
              )}>
              Deactivate
            </Button> 
          </>
        :
          <>
            <Button variant="contained" 
              onClick={() => popAction(
                'Are you sure?', 
                "The user will be activated!",
                'Activate!',
                ()=>apiCrud(`/api/admin/verify`, 'POST', 'User activated', {
                  email: params.row.email,
                  authorized: 'true'
                })()
              )}>
              Activate
            </Button>            
          </>
        }

        <Button variant="contained" 
          onClick={() => popAction(
            'Are you sure?', 
            "The user will be permanently suspended!",
            'Suspend!',
            ()=>apiCrud(`/api/admin/verify`, 'POST', 'User suspended', {
              // email: params.row.email,
              // authorized: 'true'
            })()
          )}>
          Suspend
        </Button> 
      </div>

    </AdminUsersDialog>
  )

  const columns = [
    { 
      field: 'id', headerName: 'ID', minWidth: 150, flex: 3
    },
    { 
      field: 'fullName', headerName: 'Full name', minWidth: 150, flex: 3 
    },
    { 
      field: 'email', headerName: 'Email', minWidth: 150, flex: 3 
    },
    { 
      field: 'phone', headerName: 'Phone', minWidth: 150, flex: 3
    },
    { 
      field: 'role', headerName: 'Role', minWidth: 70, flex: 1 
    },
    { 
      field: 'authorized', headerName: 'Authorized', type: 'boolean', minWidth: 70, flex: 1 
    },
    { 
      field: 'date', headerName: 'Date', type: 'date' , minWidth: 100, flex: 1 
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      minWidth: 100, 
      flex: 1,
      align: 'center',
      renderCell: (params) => usersActions(params)
    }
  ];
  
  const rows = users && users.map(user => (
    {
      id: `#${user._id}`,
      fullName: user.fullName, 
      email: user.email, 
      phone: user.phone, 
      role: user.role, 
      authorized: user.authorized, 
      date: date(user.createdAt),
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
              disableSelectionOnClick
              sx={{
                '& .MuiDataGrid-cell:hover': {
                  cursor: 'pointer'
                },
              }}
            />
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Users