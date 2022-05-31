import React from 'react'

function Homepage() {
  return (
    <div className='homepage'>
      <img src='https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3JtMjA4YmF0Y2g0LWt3YW4tMDEtZy5qcGc.jpg' alt='bg'  className='homepage-bg'></img>
      <header>
        <img src='https://api.iconify.design/bxs/bank.svg?color=white' alt='LOGO'></img>
        <h2>Sprints Bank</h2>
      </header>

      <main>
        <div>
          <h1>The bank you trust</h1>
          <p>Spend, save, invest, and control your financial life</p>
          <button>Login</button>
        </div>
      </main>
    </div>
  )
}

export default Homepage