
import React from 'react'
import SecurityQuestions from "../../components/forgot/SecurityQuestions";

export default function ForgetPasswordPage() {

    return (
        
        <div className='homepage' style={{gap:4+'em', backgroundColor:'gray'}}>
        <img src='https://img.freepik.com/free-photo/white-concrete-wall_53876-92803.jpg?w=1060&t=st=1654925214~exp=1654925814~hmac=a1af552ae8c89191873bfa8091490cf7f34e2deb6d58228fa761e10577ce6ade' alt='bg'  className='homepage-bg'></img>
        <header>
          <img src='https://api.iconify.design/bxs/bank.svg?color=white' alt='LOGO'></img>
          <h2>Abu Dhabi International Bank</h2>
        </header>
        <main className='App-main'>
      <div className='login'>
             <p>Please answer the security questions in order to reset your password</p>
            <SecurityQuestions/>
</div>  

      </main>
      </div>

       
      )
}
