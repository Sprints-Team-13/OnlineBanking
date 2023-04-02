import './sidebar.scss'
import React, { useContext } from 'react'
import {Link} from 'react-router-dom'

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import TransformOutlinedIcon from '@mui/icons-material/TransformOutlined';
import { AuthContext } from '../../context/Auth-context';
 import { SpeedDialIcon } from '@mui/material';

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

          <Link to={'/adminpanel'}>
            <li>
              <DashboardIcon className='icon'/>
              {!isSidebarActive && <p>Overview</p>}            
            </li>
          </Link>

          <Link to={'/adminpanel/users'}>
            <li>
              <AccountCircleIcon className='icon'/>
              {!isSidebarActive && <p>Users</p>}              
            </li>
          </Link>

          <Link to={'/adminpanel/accounts'}>
            <li>
              <AccountBalanceWalletIcon className='icon'/>
              {!isSidebarActive && <p>Accounts</p>}              
            </li>
          </Link>
          <Link to={'/adminpanel/beneficieries'}>
            <li>
              <SpeedDialIcon className='icon' />
              {!isSidebarActive && <p>Beneficieries</p>}
            </li>
          </Link>
          <Link to={'/adminpanel/transfer'}>
            <li>
              <TransformOutlinedIcon className='icon' />
              {!isSidebarActive && <p>Money Transfer</p>}
            </li>
          </Link>
          <Link to={'/adminpanel/transactions'}>
            <li>
              <ViewListOutlinedIcon className='icon'/>
              {!isSidebarActive && <p>Transactions</p>}
            </li>
          </Link>

          <Link to={'/adminpanel/settings'}>
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