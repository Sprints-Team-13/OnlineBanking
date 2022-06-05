import './App.scss';
import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import Homepage from './Pages/Home/Homepage';
import AdminPanel from './Pages/AdminPanel/AdminPanel'
import UserDashboard from './Pages/UserDashboard/UserDashboard'

function App() {

  const isSignin = true
  const isAdmin = false

  return (
    <div className="App">
      {isSignin
        ?
        isAdmin 
          ?
          <Routes>
            <Route path='/AdminPanel/*' element={<AdminPanel/>}/>
            <Route path="*" element={<Navigate to ="/AdminPanel" replace/>}/>
          </Routes>
          :
          <Routes>
            <Route path='/UserDashboard/*' element={<UserDashboard/>}/>
            <Route path="*" element={<Navigate to ="/UserDashboard" replace/>}/>
          </Routes>
        :
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="*" element={<Navigate to ="/" replace/>}/>
        </Routes>
      }
    </div>
  )
}

export default App;