import "./userId.scss"
import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import useApi from '../../../../hooks/useApi'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AdminUsersDialog from "../../../../components/dialog/adminUsersDialog";
import popAction from "../../../../helpers/popAction";
import apiCrud from "../../../../api/apiCrud";

function UserId() {

  const params = useParams()
  const { state: userData } = useLocation()

  console.log(userData)

  // fetch user detials
  const { data } = useApi(`/api/listAccounts/${params.userId}`)
  const userAccounts = data && data.accounts.slice(0).reverse()

  console.log(userAccounts);

  // convert date to string
  function date(date) {
    const display = new Date(date)
    return display.toLocaleDateString('en-GB');
  }

  // set available actions
    const usersActions = (params) => (

    params.row.accountStatus !== 'closed' &&
    
    <div className='actions'>
      {params.row.accountStatus === 'active'
      ?
        <Button variant="contained" className="deactivate"
          onClick={() => popAction(
            'Are you sure?', 
            "The account will be deactivated!",
            'Deactivate!',
            ()=>apiCrud(`/api/approval`, 'POST', 'Account deactivated', {
              accountNumber: params.row.id,
              accountStatus: 'pending'
            })()
            )}>
          Deactivate
        </Button> 
      :
        <Button variant="contained" className="activate"
          onClick={() => popAction(
            'Are you sure?', 
            "The account will be activated!",
            'Activate!',
            ()=>apiCrud(`/api/approval`, 'POST', 'Account activated', {
              accountNumber: params.row.id,
              accountStatus: 'active'
            })()
          )}>
          Activate
        </Button>            
      }
    </div>
  )

  const columns = [
    { 
      field: 'id', headerName: 'Account Number', minWidth: 130, flex: 2
    },
    { 
      field: 'accountBalance', headerName: 'Balance', minWidth: 80, flex: 1
    },
    { 
      field: 'accountType', headerName: 'Type', minWidth: 70, flex: 1
    },
    {
      field: 'accountStatus', headerName: 'Status', minWidth: 80, flex: 1
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
  
  const rows = userAccounts && userAccounts.map(account => (
    {
      id: account._id,
      accountBalance: `$${account.accountBalance}`,
      accountType: account.accountType,
      accountStatus: account.accountStatus,
      date: date(account.createdAt),
    }
  ))

  return (
    <div className="userId">

      <div className="title">
        <h2>{userData.userName}</h2>
      </div>

      <div className="profile-contanier">

        <AccountBoxIcon className="icon"/>

        <div className="profile-details">

          <p>Full Name:</p>
          <h3>{userData.userName}</h3>

          <p>Phone Number:</p>
          <h3>{userData.userPhone}</h3>

          <p>Email:</p>
          <h3>{userData.userEmail}</h3>   
                 
        </div>

      </div>

      <div style={{ height: 700, width: '90%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {userAccounts &&
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

export default UserId