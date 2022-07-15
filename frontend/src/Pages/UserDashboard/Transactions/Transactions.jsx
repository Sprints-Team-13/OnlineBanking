import "./transactions.scss"
import { DataGrid } from '@mui/x-data-grid';

import useApi from "../../../hooks/useApi";

function Transactions() {

  // fetch and cache all transactions
  const {data: transactions} = useApi('/api/transactions', 'GET')
  // console.log(transactions)

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
    
    const rows = transactions?.map(transaction => (
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
    <div className="transactions">

      <div className="title">
        <h2>Transactions</h2>
      </div>

      <div style={{ height: 700, width: '90%' }}>
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

export default Transactions