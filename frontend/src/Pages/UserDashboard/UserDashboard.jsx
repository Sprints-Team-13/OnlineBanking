import React from 'react'
import "./userdashboard.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import mastercard from '../../images/mastercard_icon.png'
import Charts from '../../components/chart/Chart'

function UserDashboard() {
  return (
    <div className='userdashboard'>
      <Sidebar />
      <div className="userdashboard-container">

        <header>
          <Navbar />
        </header>

        <main className="userdashboard-main">

          <h2>Overview</h2>

          <hr/>

          <div className="content-wrapper">

            <div className="left-section-wrapper">
              <div className="left-section">

                <img src={mastercard} alt='mastercard'></img>

                <div className="balance">
                  <h4>Total accounts balance</h4>
                  <p>$500000</p>
                </div>

              </div>

            </div>

            <div className="right-section-wrapper">
              <div className="right-section">
                <h4>Deposits/Withdrawals summary</h4>
                 <div className="chart-holder">
                  <Charts/>

                 </div>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  )
}

export default UserDashboard