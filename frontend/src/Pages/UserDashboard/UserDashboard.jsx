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
                  <p>Total accounts balance</p>
                  <h3>$500,000</h3>
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

        </main>
      </div>
    </div>
  )
}

export default UserDashboard