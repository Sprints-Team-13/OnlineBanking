import './sidebar.scss'
import React, { useContext } from 'react'
import {Link} from 'react-router-dom'

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { AuthContext } from '../../context/Auth-context';

function Sidebar(props) {

  // import signout fnc form auth context
  const { signOut } = useContext(AuthContext)

  // destracture props
  const {isSidebarActive, toggleSidebar} = props

  return (
    <div className={isSidebarActive ? 'sidebar collapse' : 'sidebar'}>

      <div className="top" onClick={toggleSidebar}>
        
        <img src='https://api.iconify.design/bxs/bank.svg?color=white' alt='LOGO'/>

        {!isSidebarActive &&
          <p className="logo">
            ADI Bank
          </p>
        }

      </div>
      
      <div className="center">
        <ul>

          <Link to={'/superadminpanel'}>
            <li>
              <DashboardIcon className='icon'/>
              {!isSidebarActive && <p>Overview</p>}            
            </li>
          </Link>

          <Link to={'/superadminpanel/staff'}>
            <li>
              <AccountCircleIcon className='icon'/>
              {!isSidebarActive && <p>Staff</p>}              
            </li>
          </Link>
         
          <Link to={'/superadminpanel/settings'}>
            <li>
              <SettingsIcon className='icon'/>
              {!isSidebarActive && <p>Settings</p>}            
            </li>
          </Link>

          <li onClick={signOut}>
            <ExitToAppOutlinedIcon className='icon'/>
            {!isSidebarActive && <p>Signout</p>}          
          </li>

        </ul>

      </div>

    </div>
  )
}

export default Sidebar