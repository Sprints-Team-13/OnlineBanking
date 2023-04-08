import React from 'react'
import './navbar.scss'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import useGetCurrentUser from '../../hooks/queries/users/useGetCurrentUser'

function Navbar(props) {

  const {isSidebarActive} = props
  const {data: user} = useGetCurrentUser();

  return (
    <div className={isSidebarActive ? "navbar collapse" : "navbar"}>

      <div className="wrapper">

        <div className="search">
          <input type="text" placeholder='Search...' className="swal2-input" />
          <SearchOutlinedIcon/>
        </div>

        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon/>
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon/>
          </div>
          {/* <div className="item">
            <FullscreenExitOutlinedIcon/>
          </div> */}
          <div className="item">
            {/* <ListOutlinedIcon/> */}
            <a href="/userdashboard/profile" >{user?.fullName}</a>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Navbar