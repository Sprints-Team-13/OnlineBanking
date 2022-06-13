import './sidebar.scss'
import React, { useContext } from 'react'
import {Link} from 'react-router-dom'

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TransformOutlinedIcon from '@mui/icons-material/TransformOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { AuthContext } from '../../../context/Auth-context';

function Sidebar() {

  const { signOut } = useContext(AuthContext)

  return (
    <div className='sidebar'>

      <div className="top">
        <img src='https://api.iconify.design/bxs/bank.svg?color=white' alt='LOGO'></img>
        <span className="logo">
          <Link to={'/'}>
            Sprints Bank
          </Link>
        </span>
      </div>
      
      <div className="center">
        <ul>

        <Link to={'/userdashboard'}>
          <li>
            <DashboardIcon className='icon'/>
            <span>Overview</span>
          </li>
        </Link>

        <Link to={'/userdashboard/accounts'}>
          <li>
            <AccountBalanceWalletIcon className='icon'/>
            <span>Accounts</span>
          </li>
        </Link>

        <Link to={'/userdashboard/transfer'}>
          <li>
            <TransformOutlinedIcon className='icon'/>
            <span>Money Transfer</span>
          </li>
        </Link>

        <Link to={'/userdashboard/transactions'}>
          <li>
            <ViewListOutlinedIcon className='icon'/>
            <span>Transactions</span>
          </li>
        </Link>

        <Link to={'/userdashboard/profile'}>
          <li>
            <AccountCircleIcon className='icon'/>
            <span>Profile</span>
          </li>
        </Link>

        <Link to={'/userdashboard/settings'}>
          <li>
            <SettingsIcon className='icon'/>
            <span>Settings</span>
          </li>
        </Link>
        
          <li onClick={signOut}>
            <ExitToAppOutlinedIcon className='icon'/>
            <span>Signout</span>
          </li>   

        </ul>

      </div>

    </div>
  )
}

export default Sidebar