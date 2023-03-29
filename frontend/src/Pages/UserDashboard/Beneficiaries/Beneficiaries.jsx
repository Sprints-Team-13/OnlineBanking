import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

function Beneficiaries() {

  const data = [
    { id: 1, name: 'Harry', account_no: 'AE1002900029920009' },
    { id: 2, name: 'Tom', account_no: 'AE1502900029920009' }
  ];

  const columns = [
    { 
      field: 'id', headerName: 'Beneficiary Id', minWidth: 130, flex: 2
    },
    { 
      field: 'name', headerName: 'Name', minWidth: 80, flex: 1
    },
    { 
      field: 'account_no', headerName: 'Type', minWidth: 70, flex: 1
    },
  ];

  return (
    <div className="accounts">
      <div className="title">
        <h2>Beneficiaries</h2>
      </div>
      
      <div style={{ height: 700, width: '60%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="table-container">
            {data && 
              <DataGrid
              autoHeight
              className='table'
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              />}
          </div>
        </div>
      </div>

      <div style={{ width: '40%', height: 700}}>
        <h3>Form</h3>
      </div>
    </div>
  )
}

export { Beneficiaries };