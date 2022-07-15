import "./accounts.scss"
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

import apiCrud from "../../../api/apiCrud";
import popCrud from "../../../api/popCrud";
import useGetUsersAccounts from "../../../hooks/queries/users/useGetUserAccounts";
import popAction from '../../../helpers/popAction'

function Accounts() {

  // fetch and cache all accounts
  const {data: accounts} = useGetUsersAccounts()
  // console.log(accounts);

  // convert date to string
  function date(date) {
    const display = new Date(date)
    return display.toLocaleDateString('en-GB');
  }

  // set available actions

  // create a new account
  function createNewAccount() {
    popAction(
      'Are you sure?', 
      "A new account will be created!",
      'Proceed!',
      ()=>apiCrud(`/api/createAccount`, 'POST', 'Account created', {
        accountType: 'saving',
        accountBalance: '0'
      })()
    )
  } 

  // deposit
  function deposit() {
    popCrud(
      'Deposit', 
      'Deposit', 
      ['accountNumber', 'amount'], 
      `/api/recharge`,
      'POST',
      'Successful transaction'
    )
  }

  // withdraw
  function withdraw() {
    popCrud(
      'Withdraw', 
      'Withdraw', 
      ['accountNumber', 'amount'], 
      `/api/withdraw`,
      'POST',
      'Successful transaction'
    )
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

        <div className="account-actions">

          <button onClick={createNewAccount}>
            + Create new account
          </button>

          <div className="account-actions-bottom">
            <button onClick={deposit}>
              Deposit
            </button>
            <button onClick={withdraw}>
              Withdraw
            </button>
          </div>

        </div>
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