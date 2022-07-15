import "./userId.scss"
import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import useApi from '../../../../hooks/useApi'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import popAction from "../../../../helpers/popAction";
import apiCrud from "../../../../api/apiCrud";

function UserId() {

  const params = useParams()
  const { state: userData } = useLocation()

  // console.log(userData)

  // fetch user detials
  const { data } = useApi(`/api/listAccounts/${params.userId}`)
  const userAccounts = data?.accounts.slice(0).reverse()

  // fetch user transactions
  const { data: transactionsData } = useApi(`/api/listTransactions/${params.userId}`)
  const userTransactions = transactionsData?.transactions.slice(0).reverse()

  // console.log(userTransactions);

  // convert date to string
  function date(date) {
    const display = new Date(date)
    return display.toLocaleDateString('en-GB');
  }

  // set user profile actions
  const userProfileActions = (
    <div className="userProfileActions">
      {userData?.authorized
        ?
          <>
            <Button variant="contained" 
              onClick={() => popAction(
                'Are you sure?', 
                "The user will be deactivated!",
                'Deactivate!',
                ()=>apiCrud(`/api/verify`, 'POST', 'User deactivated', {
                  email: userData.userEmail,
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
                ()=>apiCrud(`/api/verify`, 'POST', 'User activated', {
                  email: userData.userEmail,
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
          ()=>apiCrud(`/api/verify`, 'POST', 'User suspended', {
            email: userData.userEmail,
            authorized: 'false'
          })()
        )}>
        Suspend
      </Button>
    </div>
  )

  // accounts table
  // set available actions
  const usersActions = (params) => (

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

  const accountsColumns = [
    { 
      field: 'id', headerName: 'Account Number', minWidth: 100, flex: 1.2
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
  
  const accountsRows = userAccounts?.map(account => (
    {
      id: account.accountNumber,
      accountBalance: `$${account.accountBalance}`,
      accountType: account.accountType,
      accountStatus: account.accountStatus,
      date: date(account.createdAt),
    }
  ))


  // transactions table
  const transactionsColumns = [
    { 
      field: 'date', headerName: 'Date', type: 'date' , minWidth: 100, flex: 1
    },
    { 
      field: 'accountNumber', headerName: 'Account Number', minWidth: 130, flex: 1
    },
    { 
      field: 'transactionType', headerName: 'Type', minWidth: 70, flex: 1
    },
    { 
      field: 'amount', headerName: 'Amount', minWidth: 70, flex: 1
    },
    { 
      field: 'description', headerName: 'Description', minWidth: 130, flex: 2
    },
    { 
      field: 'id', headerName: 'Transaction ID', minWidth: 150, flex: 2.2
    },
  ];
  
  const transactionsRows = userTransactions?.map(transaction => (
    {
      date: date(transaction.transactionDate),
      id: transaction._id,
      transactionType: transaction.transactionType,
      accountNumber: transaction.accountNumber,
      amount: `$${transaction.amount}`,
      description: transaction.description,
    }
  ))

  return (
    <div className="userId">

      <div className="title">
        <h2>{userData.userName}</h2>
      </div>

      <div className="user-profile-contanier">

        <AccountBoxIcon className="icon"/>

        <div className="user-profile-details">

          <div className="left-user-profile-details">

            <p>Full Name:</p>
            <h3>{userData.userName}</h3>

            <p>Phone Number:</p>
            <h3>{userData.userPhone}</h3>
            
            <p>Status:</p>
            <h3>{userData.authorized ? 'Active' : 'Not Active'}</h3>

          </div>

          <div className="right-user-profile-details">

            <p>Email:</p>
            <h3>{userData.userEmail}</h3>


            <p>User ID:</p>
            <h3>{params.userId}</h3>
            
            {userProfileActions}            

          </div>
                 
        </div>

      </div>

      <h3>Accounts</h3>

      <div  className="table-holder">
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {userAccounts &&
            <DataGrid
              autoHeight
              className='table'
              rows={accountsRows}
              columns={accountsColumns}
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

      <h3>Transactions</h3>

      <div  className="table-holder">
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {userTransactions &&
              <DataGrid
                autoHeight
                className='table'
                rows={transactionsRows}
                columns={transactionsColumns}
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