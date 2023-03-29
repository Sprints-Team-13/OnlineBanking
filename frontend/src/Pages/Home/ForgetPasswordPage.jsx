import './homepage.scss'
import React from 'react'
import SecurityQuestions from "../../components/forgot/SecurityQuestions";
export default function ForgetPasswordPage() {

    return (
        
        <div className='homepage' style={{gap:4+'em'}}>
        <img src='https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtMjA4YmF0Y2g0LWt3YW4tMDEtZy5qcGc.jpg' alt='bg'  className='homepage-bg'></img>
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
