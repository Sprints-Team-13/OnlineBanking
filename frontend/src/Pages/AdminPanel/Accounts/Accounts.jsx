import "./accounts.scss"
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import useGetAccounts from '../../../hooks/queries/admin/useGetAccounts'
import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";

function Accounts() {

  // fetch and cache all accounts
  const {data: accounts} = useGetAccounts()
  // console.log(accounts);

  // convert date to string
  function date(date) {
    const display = new Date(date)
    return display.toLocaleDateString('en-GB');
  }

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
      field: 'customerID', headerName: 'User ID', minWidth: 130, flex: 3
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
  
  const rows = accounts?.map(account => (
    {
      id: account.accountNumber,
      accountBalance: `$${account.accountBalance}`,
      accountType: account.accountType,
      customerID: `#${account.customerID}`,
      accountStatus: account.accountStatus,
      date: date(account.createdAt),
    }
  ))

  return (
    <div className="accounts">

      <div className="title">
        <h2>Accounts</h2>
      </div>
      
      <div style={{ height: 700, width: '90%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {accounts &&
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

export default Accounts