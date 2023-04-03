import "./../../AdminPanel/Users/users.scss"
import './staff.scss'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import CreateStaff from './CreateStaff'
import CustomizedDialogs from '../../../components/dialog/Dialog'
import useGetAdmins from '../../../hooks/queries/superadmin/useGetAdmins'

import Button from '@mui/material/Button';
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";

function Staff() {

  const navigate = useNavigate()

  // fetch and cache all users
  const {data: users} = useGetAdmins()
  // convert date to string
  function date(date) {
    const display = new Date(date)
    return display.toLocaleDateString('en-GB');
  }
  const usersActions = (params) => (

    <div className='actions'>
      {params.row.authorized === false
      ?
      <Button variant="contained" className="activate"
      onClick={() => popAction(
        'Are you sure?', 
        "The staff will be Enabled!",
        'Enable!',
        ()=>apiCrud(`/api/verify`, 'POST', 'Staff enabled', {
          email: params.row.email,
          authorized: 'true'
        })()
      )}>
      Enable
    </Button>
      :
      <Button variant="contained" className="deactivate"
      onClick={() => popAction(
        'Are you sure?', 
        "The staff will be disabled!",
        'Disable!',
        ()=>apiCrud(`/api/verify`, 'POST', 'Staff disabled', {
          email: params.row.email,
          authorized: 'false'
        })()
      )}>
      Disable
    </Button>          
      }
     
    </div>
      
  )
  
  const columns = [
    // { 
    //   field: 'id', headerName: 'ID', minWidth: 150, flex: 3
    // },
    { 
      field: 'fullName', headerName: 'Full name', minWidth: 150, flex: 3 
    },
    { 
      field: 'email', headerName: 'Email', minWidth: 150, flex: 3 
    },
    // { 
    //   field: 'phone', headerName: 'Phone', minWidth: 150, flex: 3
    // },
    // { 
    //   field: 'role', headerName: 'Role', minWidth: 70, flex: 1 
    // },
    { 
      field: 'authorized', headerName: 'Authorized', type: 'boolean', minWidth: 70, flex: 1 
    },
    { 
      field: 'date', headerName: 'Date', type: 'date' , minWidth: 100, flex: 1 
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      minWidth: 110,
      flex: 1,
      align: 'center',
      renderCell: (params) => usersActions(params)
    },

    
  ];
  
  const rows = users?.map(user => (
    {
      id: user._id,
      fullName: user.fullName, 
      email: user.email, 
      phone: user.phone, 
      role: user.role, 
      authorized: user.authorized, 
      date: date(user.createdAt),
    }
  )
  
  )

  return (
    <div className="accounts">

      <div className="title">
        <h2>Staff</h2>
      </div>
    
      <div className="right-label">
      <CustomizedDialogs title='Staff Registration' btn='+ Create New Staff' style={{color: "#007bff"}} className="account-actions">
              <CreateStaff />
            </CustomizedDialogs>
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
                onRowClick={params => (
                  navigate(`/adminpanel/users/${params.row.id}`, {
                    state: {
                      userName: params.row.fullName,
                      userEmail: params.row.email,
                      userPhone: params.row.phone,
                      date: params.row.date,
                      authorized: params.row.authorized,
                    }
                  })
                )}
              />
            }
          </div>
        </div>
      </div>

    </div>
  )

}

export default Staff