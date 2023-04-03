import './homepage.scss'
import React from 'react'
import CustomizedDialogs from '../../components/dialog/Dialog'

import Register from '../../components/register/Register'
import Login from '../../components/login/Login'

function Homepage() {

  return (
    <div className='homepage'>
      {/* <img src='https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtMjA4YmF0Y2g0LWt3YW4tMDEtZy5qcGc.jpg' alt='bg'  className='homepage-bg'></img> */}
    <img src='1.jpg' alt='bg'  className='homepage-bg'></img>
      <header>
        <img src='https://api.iconify.design/bxs/bank.svg?color=white' alt='LOGO'></img>
        <h2>Abu Dhabi International Bank</h2>
      </header>

      <main>
        <section>

          <h1>The bank you know better</h1>
          <p>Spend, save, transfer, and control your financial life</p>

          <div className='homepage-sign-btns'>
            <CustomizedDialogs title='Login' btn='Login'>
              <Login/>
            </CustomizedDialogs>

            <CustomizedDialogs title='Customer Registration' btn='Register' style={{color: "#007bff"}}>
              <Register />
            </CustomizedDialogs>
          </div>

        </section>
      </main>
    </div>
  )
}

export default Homepage