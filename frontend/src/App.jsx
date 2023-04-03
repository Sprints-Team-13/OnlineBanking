import './App.scss';
import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import Homepage from './Pages/Home/Homepage';
import ForgetPasswordPage from './Pages/Home/ForgetPasswordPage';
import ChangePasswordPage from './Pages/Home/ChangePasswordPage';

import AdminPanel from './Pages/AdminPanel/AdminPanel'
import SuperAdminPanel from './Pages/SuperAdminPanel/SuperAdminPanel'

import UserDashboard from './Pages/UserDashboard/UserDashboard'
import { AuthContext } from './context/Auth-context';

function App() {

  const {isAdmin, jwt} = useContext(AuthContext)
  // console.log(isAdmin)

  return (
    <div className="App">
      {jwt
        ?
        isAdmin === 'admin'
          ?
          <Routes>
            <Route path='/adminpanel/*' element={<AdminPanel/>}/>
            <Route path="*" element={<Navigate to ="/adminpanel" replace/>}/>
          </Routes>
          :
          isAdmin === 'super-admin'
          ?
          <Routes>
            <Route path='/superadminpanel/*' element={<SuperAdminPanel/>}/>
            <Route path="*" element={<Navigate to ="/superadminpanel/staff" replace/>}/>
          </Routes>
        :
        <Routes>
            <Route path='/userdashboard/*' element={<UserDashboard/>}/>
            <Route path="*" element={<Navigate to ="/userdashboard" replace/>}/>
          </Routes>
          
:
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/Forget-Password' element={<ForgetPasswordPage />} />
          <Route path='/Change-Password' element={<ChangePasswordPage />} />
          <Route path="*" element={<Navigate to ="/" replace/>}/>


        </Routes>

        
      }
    </div>
  )
}

export default App;