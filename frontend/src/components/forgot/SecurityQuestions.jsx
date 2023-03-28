import './forgot.scss'
import axios from 'axios';
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Auth-context';
import popAlert from '../../helpers/popAlert';
import ForgotPassword from '../forgot/forgotPassword';
import Select ,{ StylesConfig } from 'react-select'

const options = [
  { value: 'Who is your fav actors?', label: 'Who is your fav actors?' },
  { value: 'What was your first car?', label: 'What was your first car?' },
  { value: 'What is your fav movie?', label: 'What is your fav movie?' }
]


export default function SecurityQuestions() {

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
      url:  `/api/changePassword`,
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

  const Countries = [
    { label: "Albania", value: 355 },
    { label: "Argentina", value: 54 },
    { label: "Austria", value: 43 },
    { label: "Cocos Islands", value: 61 },
    { label: "Kuwait", value: 965 },
    { label: "Sweden", value: 46 },
    { label: "Venezuela", value: 58 }
  ];
   
  // Generate JSX code for login form
  const SecurityQuestionsForm = (

    <main className='App-main'>
      <div className='login'>
        <div>
          <form action="/" onSubmit={handleSubmit}>

            <div className='input-holder'>
              <label>Email address / User Name</label><br/>
              <input 
                type="email"
                name="email"
                
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
    </main>

  )

  return (
    <div>
      {SecurityQuestionsForm}
    </div>
  )
}
