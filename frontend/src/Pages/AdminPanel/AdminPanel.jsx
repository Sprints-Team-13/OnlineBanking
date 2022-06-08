import React from 'react'
import "./adminpanel.scss"
import Sidebar from '../../components/sidebar/admin/Sidebar'
import Navbar from '../../components/navbar/Navbar'

function AdminPanel() {
  return (
    <div className='adminpanel'>
      <Sidebar />
      <div className="adminpanel-container">

        <header>
          <Navbar />
        </header>

        <main className="adminpanel-main">

          <h2>Overview</h2>

          <hr/>

          <div className="content-wrapper">

            <div className="left-section-wrapper">
              <div className="left-section">
              </div>
            </div>

            <div className="right-section-wrapper">
              <div className="right-section">
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  )
}

export default AdminPanel