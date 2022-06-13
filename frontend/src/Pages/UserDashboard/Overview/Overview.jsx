import "./overview.scss"
import React from 'react'
import mastercard from '../../../images/mastercard_icon.png'
import Charts from '../../../components/chart/Chart'

function Overview() {
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

    </div>
  )
}

export default Overview