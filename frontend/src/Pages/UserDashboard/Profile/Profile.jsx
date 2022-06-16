import "./profile.scss"
import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth-context";

function Profile() {

  const {userName, userPhone, userEmail} = useContext(AuthContext)

  return (
    <div className="profile">

      <div className="title">
        <h2>Profile</h2>
      </div>

      <div className="profile-contanier">

        <AccountBoxIcon className="icon"/>

        <div className="profile-details">

          <p>Full Name:</p>
          <h3>{userName}</h3>

          <p>Phone Number:</p>
          <h3>{userPhone}</h3>

          <p>Email:</p>
          <h3>{userEmail}</h3>
          
        </div>

      </div>
    </div>
  )
}

export default Profile