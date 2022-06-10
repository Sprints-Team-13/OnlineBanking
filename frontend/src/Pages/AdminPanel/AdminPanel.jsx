import "./adminpanel.scss"
import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Sidebar from '../../components/sidebar/admin/Sidebar'
import Navbar from '../../components/navbar/Navbar'
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

        <div>
          <Routes>
            <Route path='/' element={<Overview />}/>
            <Route path='/users' element={<Users />}/>
          </Routes>
        </div>

      </div>
    </div>
  )
}

export default AdminPanel