import "./overview.scss"
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

import useGetUsers from '../../../hooks/queries/admin/useGetUsers'
import useGetAccounts from '../../../hooks/queries/admin/useGetAccounts'
import useGetTransactions from '../../../hooks/queries/admin/useGetTransactions'

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function Overview() {

  const {data: users} = useGetUsers()
  const {data: accounts} = useGetAccounts()
  const {data: transactions} = useGetTransactions()

  // convert date to string
  function date(date) {
    const display = new Date(date)
    return display.toLocaleDateString('en-GB');
  }

  const columns = [
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

  const rows = transactions?.slice(0, 5).map(transaction => (
    {
      date: date(transaction.transactionDate),
      id: transaction._id,
      transactionType: transaction.transactionType,
      accountNumber: transaction.accountNumber,
      amount: `AED ${transaction.amount}`,
      description: transaction.description,
    }
  ))

  return (
    <div className="overview">
      <h2>Overview</h2>

      <hr/>

      <div className="content-wrapper">

        <div className="left-section-wrapper">
          <div className="left-section">
            <AdminPanelSettingsIcon className="icon"/>
            <p>Total customers</p>
            <h3>{users?.length}</h3>
            <p>Total accounts</p>
            <h3>{accounts?.length}</h3>
            <p>Total transactions</p>
            <h3>{transactions?.length}</h3>
          </div>
        </div>

        <div className="right-section-wrapper">
          <div className="right-section">

            <h3>Recent Transactions</h3>

            <div style={{ height: 400, width: '100%' }}>
              <div style={{ display: 'flex', height: '100%' }}>
                <div className="table-container">
                  {transactions &&
                  <DataGrid
                    autoHeight
                    className='table'
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    disableColumnMenu
                    hideFooterPagination
                    hideFooter
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
        </div>

      </div>
    </div>
  )
}

export default Overview