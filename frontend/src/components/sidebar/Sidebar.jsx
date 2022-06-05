import React from 'react'
import './sidebar.scss'

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TransformOutlinedIcon from '@mui/icons-material/TransformOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

function Sidebar() {
  return (
    <div className='sidebar'>

      <div className="top">
        <img src='https://api.iconify.design/bxs/bank.svg?color=white' alt='LOGO'></img>
        <span className="logo">Sprints Bank</span>
      </div>

      <hr />

      <div className="center">
        <ul>
          <li>
            <DashboardIcon className='icon'/>
            <span>Dashboard</span>
          </li>
          <li>
            <AccountBalanceWalletIcon className='icon'/>
            <span>Accounts</span>
          </li>
          <li>
            <TransformOutlinedIcon className='icon'/>
            <span>Transfer Money</span>
          </li>
          <li>
            <ViewListOutlinedIcon className='icon'/>
            <span>Transactions</span>
          </li>
          <li>
            <SettingsIcon className='icon'/>
            <span>Settings</span>
          </li>
          <li>
            <AccountCircleIcon className='icon'/>
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppOutlinedIcon className='icon'/>
            <span>Signout</span>
          </li>
        </ul>
      </div>

      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  )
}

export default Sidebar