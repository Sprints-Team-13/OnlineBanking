import "./adminpanel.scss"
import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Sidebar from '../../layout/sidebar/admin/Sidebar'
import Navbar from '../../layout/navbar/Navbar'
import Users from "./Users/Users"
import Overview from "./Overview/Overview"

function AdminPanel() {
  return (
    <div className='adminpanel'>
      <Sidebar />
      <div className="adminpanel-container">

        <header>
          <Navbar />
        </header>

        <main className="adminpanel-main">
          <Routes>
            <Route path='/' element={<Overview />}/>
            <Route path='/users' element={<Users />}/>
          </Routes>
        </main>

      </div>
    </div>
  )
}

export default AdminPanel