import React, { useEffect, useState } from 'react'
import "./userdashboard.scss"
import {Routes, Route} from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import Sidebar from '../../layout/sidebar/UserSidebar'
import Navbar from '../../layout/navbar/Navbar'
import Overview from './Overview/Overview'
import Accounts from './Accounts/Accounts'
import Transactions from './Transactions/Transactions'
import Transfer from './Transfer/Transfer'
import Profile from './Profile/Profile'

function UserDashboard() {

  // control the responsive sidebar
  const [isSidebarActive, setIsSidebarActive] = useState(false)

  // toggle sidebar
  function toggleSidebar() {
    setIsSidebarActive(prev => !prev)
  }

  // declare media queries
  const isSmallScreen = useMediaQuery({query: '(max-width: 600px)'})

  // auto detect media queries
  useEffect(()=> {
    if(isSmallScreen) {
      setIsSidebarActive(true)
    }
  },[])

  return (
    <div className='userdashboard'>
      <img src='https://img.freepik.com/free-photo/white-concrete-wall_53876-92803.jpg?w=1060&t=st=1654925214~exp=1654925814~hmac=a1af552ae8c89191873bfa8091490cf7f34e2deb6d58228fa761e10577ce6ade' alt='bg' className='bg'></img>
      
      <Sidebar  isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />
      <div className={isSidebarActive ? 'userdashboard-container collapse' : 'userdashboard-container'}>

        <header>
          <Navbar isSidebarActive={isSidebarActive}/>
        </header>

        <main className="userdashboard-main">
          <Routes>
            <Route path='/' element={<Overview />}/>
            <Route path='/accounts' element={<Accounts />}/>
            <Route path='/transfer' element={<Transfer />}/>
            <Route path='/transactions' element={<Transactions />}/>
            <Route path='/profile' element={<Profile />}/>
          </Routes>
        </main>

      </div>
    </div>
  )
}

export default UserDashboard