import React from 'react'
import "./userdashboard.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

function UserDashboard() {
  return (
    <div className='userdashboard'>
      <Sidebar />
      <main className="userdashboard-container">
        <Navbar />
        test
      </main>
    </div>
  )
}

export default UserDashboard