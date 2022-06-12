import "./accounts.scss"
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import popAction from "../../../helpers/popAction";
import apiCrud from "../../../api/apiCrud";
import useApi from "../../../hooks/useApi";

function Accounts() {

  // fetch and cache all accounts
  const {data} = useApi('/api/userAccounts', 'GET')
  const accounts = data && data.accounts
  // console.log(accounts);

  // convert date to string
  function date(date) {
    const display = new Date(date)
    return display.toLocaleDateString('en-GB');
  }

  // create a new account
  function createNewAccount() {
    apiCrud(`/api/createAccount`, 'POST', 'Account created', {
      accountType: 'saving',
      accountBalance: '0'
    })
  } 


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
  ];
  
  const rows = accounts && accounts.map(account => (
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
        <button onClick={createNewAccount}>
          + Create new account
        </button>
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