import React from 'react'
import "./userdashboard.scss"
import {Routes, Route} from 'react-router-dom'

import Sidebar from '../../layout/sidebar/user/Sidebar'
import Navbar from '../../layout/navbar/Navbar'
import Overview from './Overview/Overview'
import Accounts from './Accounts/Accounts'
import Transactions from './Transactions/Transactions'
import Transfer from './Transfer/Transfer'

function UserDashboard() {
  return (
    <div className='userdashboard'>
      <img src='https://img.freepik.com/free-photo/white-concrete-wall_53876-92803.jpg?w=1060&t=st=1654925214~exp=1654925814~hmac=a1af552ae8c89191873bfa8091490cf7f34e2deb6d58228fa761e10577ce6ade' alt='bg' className='bg'></img>
      
      <Sidebar />
      <div className="userdashboard-container">

        <header>
          <Navbar />
        </header>

        <main className="userdashboard-main">
          <Routes>
            <Route path='/' element={<Overview />}/>
            <Route path='/accounts' element={<Accounts />}/>
            <Route path='/transfer' element={<Transfer />}/>
            <Route path='/transactions' element={<Transactions />}/>
          </Routes>
        </main>

      </div>
    </div>
  )
}

export default UserDashboard