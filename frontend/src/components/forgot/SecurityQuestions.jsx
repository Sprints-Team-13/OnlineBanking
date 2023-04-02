import './forgot.scss'
import axios from 'axios';
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Auth-context';
import popAlert from '../../helpers/popAlert';
import ChangePassword from './ChangePassword';
import Select ,{ StylesConfig } from 'react-select'
import {decode as base64_decode, encode as base64_encode} from 'base-64';

const options = [
  { value: '1', label: 'Who is your fav actors?' },
  { value: '2', label: 'What was your first car?' },
  { value: '3', label: 'What is your fav movie?' }
]


export default function SecurityQuestions() {
  
  const navigate = useNavigate()

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
      url:  `/api/validateQuestion`,
      method: 'POST',
      data: {
        email: login.email.toLowerCase().trim(),
        hash_password: login.hash_password.trim()
      }
    })
    .then((res) => {
      popAlert(`Correct Answer`);
      

      navigate('/change-password?email='+ base64_encode(login.email));
      
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
  const SecurityQuestionsForm = (

    <main className='App-main'>

      
<div className="transfer">
 
 <div className="transfer-form">

      <div className='login'>
        <div>
          <form action="/" onSubmit={handleSubmit}>

            <div className='input-holder'>
              <label>Email address / User Name</label><br/>
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
              <label>Question</label>
              
              <br/>
              <div
        style={{
          color: 'hsl(0, 0%, 40%)',
          display: 'inline-block',
          fontSize: 12,
          marginTop: '1em',
          width: '100%'
        }}
      >
              <Select options={options}  className="basic-single"  classNamePrefix="select"/>

      </div>
              
            </div>

            <div className='input-holder'>
              <label>Answer</label>
              
              <br/>
              <input 
                type="text" 
                name="Answer"   
                required
                placeholder={'Enter Answer'}
                onChange={handleChange}
              />
            </div>



            <div className="input-holder">
            <button id="sub_btn" type="submit" >Get Details</button>
            </div>

            <div className="error">{errorMessages}</div>

          </form>
          
        </div>
      </div>
      </div> </div>
    </main>

  )

  return (
    <div>
      {SecurityQuestionsForm}
    </div>
  )
}
