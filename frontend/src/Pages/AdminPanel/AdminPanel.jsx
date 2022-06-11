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
      <img src='https://img.freepik.com/free-photo/white-concrete-wall_53876-92803.jpg?w=1060&t=st=1654925214~exp=1654925814~hmac=a1af552ae8c89191873bfa8091490cf7f34e2deb6d58228fa761e10577ce6ade' alt='bg' className='bg'></img>

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