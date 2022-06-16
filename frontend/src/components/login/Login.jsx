import './login.scss'
import axios from 'axios';
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Auth-context';
import popAlert from '../../helpers/popAlert';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Login() {

  const navigate = useNavigate()
  const {signIn} = useContext(AuthContext)

  // Error Message State
  const [errorMessages, setErrorMessages] = React.useState('');

  // used for storing user input
  const [login, setLogin] = React.useState({
    email: '',
    hash_password: '',
  });

  // handle input change
  function handleChange(event) {
    const { name, value } = event.target
    setLogin(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }


  const handleSubmit = async (submit) => {

    submit.preventDefault();

    await axios({
      url:  `/api/signin`,
      method: 'POST',
      data: {
        email: login.email.toLowerCase().trim(),
        hash_password: login.hash_password.trim()
      }
    })
    .then((res) => {
      console.log('successfully logged in');
      // console.log(res.data);
      localStorage.setItem('jwt', res.data.token);
      signIn(res.data);
      popAlert(`Welcome back`);
      navigate('/');
      return res.data;
    })
    .catch(
      (error) => {
        if (error.response) {
          // Request made and server responded
          setErrorMessages(error.response.data.message)
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request)
          setErrorMessages('No response!')
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
          setErrorMessages('Somthing wrong!')
        }
      }
    )
  }

  // Generate JSX code for login form
  const loginForm = (

    <main className='App-main'>
      <div className='login'>
        <div>
          <form action="/" onSubmit={handleSubmit}>

            <div className='input-holder'>
              <label>Email address</label><br/>
              <input 
                type="email"
                name="email"
                placeholder={'Enter your Email'}
                required
                autoFocus
                onChange={handleChange}
                value={login.email}
              />
            </div>

            <div className='input-holder'>
              <label>Password</label>
              <Link to="/forget-password"><label className="right-label "
              style={{color: "#007bff"}}>Forget password?</label></Link>
              <br/>
              <input 
                type="password" 
                name="hash_password"   
                placeholder={'Enter your Password'} 
                required
                onChange={handleChange}
                value={login.hash_password}
              />
            </div>

            <div className="input-holder">
            <button id="sub_btn" type="submit" >Login</button>
            </div>

            <div className="error">{errorMessages}</div>

          </form>
              
        </div>
      </div>
    </main>

  )

  return (
    <div>
      {loginForm}
    </div>
  )
}
