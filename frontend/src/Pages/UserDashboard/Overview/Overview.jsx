import "./overview.scss"
import React from 'react'
import mastercard from '../../../images/mastercard_icon.png'
import Charts from '../../../components/chart/Chart'
import useGetUsersAccounts from "../../../hooks/queries/users/useGetUserAccounts";

function Overview() {

  const {data: accounts} = useGetUsersAccounts()
  
  const totalAccountsBalance = accounts?.length > 1 && accounts.map(account => account.accountBalance).reduce((x, y) => x + y)
  
  return (
    <div className='overview'>

      <h2>Overview</h2>

      <hr/>

      <div className="content-wrapper">

        <div className="left-section-wrapper">
          <div className="left-section">

            <img src={mastercard} alt='mastercard'></img>

            <div className="balance">
              <p>Total accounts balance</p>
              <h3>${totalAccountsBalance}</h3>
            </div>

          </div>

        </div>

        <div className="right-section-wrapper">
          <div className="right-section">
            <h4>Transactions summary</h4>
            <div className="chart-holder">
              <Charts/>

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Overview