import "./overview.scss"
import React from 'react'
import useGetUsers from '../../../hooks/queries/admin/useGetUsers'
import useGetAccounts from '../../../hooks/queries/admin/useGetAccounts'
import useGetTransactions from '../../../hooks/queries/admin/useGetTransactions'

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function Overview() {

  const {data: users} = useGetUsers()
  const {data: accounts} = useGetAccounts()
  const {data: transactions} = useGetTransactions()

  return (
    <div className="overview">
      <h2>Overview</h2>

      <hr/>

      <div className="content-wrapper">

        <div className="left-section-wrapper">
          <div className="left-section">
            <AdminPanelSettingsIcon className="icon"/>
            <p>Total users</p>
            <h3>{users && users.length}</h3>
            <p>Total accounts</p>
            <h3>{accounts && accounts.length}</h3>
            <p>Total transactions</p>
            <h3>{transactions && transactions.length}</h3>
          </div>
        </div>

        <div className="right-section-wrapper">
          <div className="right-section">
          </div>
        </div>

      </div>
    </div>
  )
}

export default Overview