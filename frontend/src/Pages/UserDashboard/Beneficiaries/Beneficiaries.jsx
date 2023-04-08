import "../Accounts/accounts.scss"
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
import useGetBeneficiaries from "../../../hooks/queries/users/useGetBeneficiaries"
import apiCrud from "../../../api/apiCrud";
import Button from '@mui/material/Button';
import popAction from "../../../helpers/popAction";
function Beneficiaries() {

  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const { data } = useGetBeneficiaries();

  const onSubmit = (e) => {
    e.preventDefault();

    apiCrud(`/api/beneficiaries`, 'POST', 'Successful transaction', {
      accountNumber,
      name,
    })
  }
  const usersActions = (params) => (

    <div className='actions'>
    
        <Button variant="contained" className="deactivate"
          onClick={() => popAction(
            'Are you sure?', 
            "The benificiary will be deleted!",
            'Remove!',
            ()=>apiCrud(`/api/beneficiaries`, 'DELETE', 'Beneficiary Deleted', {
              id: params.row._id
            })
          )}>
          Remove
        </Button>            
   
    </div>
  )
  const columns = [
    { 
      field: 'name', headerName: 'Name', width: 200
    },
    { 
      field: 'accountNumber', headerName: 'Account Number', width: 150
    },
    { 
      field: 'beneficiaryStatus', headerName: 'Status', width: 150
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

  return (
    <div className="accounts">
      <div className="title">
        <h2>Beneficiaries</h2>
      </div>
      
      <div style={{ width: '100%', boxSizing: 'border-box'}}>
        <div style={{ width: '60%', float: 'left' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div className="table-container">
              {data && data.list &&
                <DataGrid
                getRowId={(row) => row._id}
                autoHeight
                className='table'
                rows={data.list}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                />}
            </div>
          </div>
        </div>

        <div className="transfer">
          <div className="title"></div>

          <main className="transfer-form">
            <form onSubmit={onSubmit}>
              <h3>Add Beneficiary</h3>
              <div className="input-holder">
                <label>Enter account number</label>
                <br />
                <input value={accountNumber} onChange={e => setAccountNumber(e.target.value)} type="text" placeholder="account no" />
              </div>
              <div className="input-holder">
                <label>Name</label>
                <br />
                <input type="text" placeholder="name" 
                value={name} onChange={e => setName(e.target.value)} />
              </div>
              <button id="sub_btn">Submit</button>
            </form>
          </main>
        </div>

      </div>
    </div>
  )
}

export { Beneficiaries };