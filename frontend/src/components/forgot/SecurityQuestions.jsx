import './forgot.scss'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import popAlert from '../../helpers/popAlert';
//import ChangePassword from './ChangePassword';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
 import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useFormik } from "formik";
import * as yup from 'yup'

const options = [
  { value: '1', label: 'Who is your favorite actors?' },
  { value: '2', label: 'What was your first car?' },
  { value: '3', label: 'What is your favorite movie?' }
]

export default function SecurityQuestions() {
  
  const schema = yup.object({
    
      email: yup.string().required('email is required'),
     securityQuestion: yup.string().required('Security Question is required'),
    securityAnswer: yup.string().required('Security Answer is required'),
  })

  const navigate = useNavigate()
  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
       securityQuestion:'',
      securityAnswer:''
    },
    validationSchema: schema,
    onSubmit: (values) => {
     

        axios({
          url:  `/api/validateQuestion`,
          method: 'POST',
          data: {
            email: values.email.toLowerCase().trim(),
            securityQuestion : values.securityQuestion,
            securityAnswer : values.securityAnswer
    
          }
        })
        .then((res) => {
          popAlert(`Correct Answer`);
    
          navigate('/change-password?email='+ base64_encode(values.email));
          
          return res.data;
        })
        .catch(
          (error) => {
            if (error.response) {
              if (error.response.status === 400) {
                popAlert('Email dose not exists', 'error');
              }
                else {

                  popAlert(`Wronge Answer`,'error');
                }
              // Request made and server responded
              

            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request)
              
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message)
            
            }
          }
        )
      }

})
 



   
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
                value={values.email}
              />
            </div>

      <div className="input-holder">
              <label>Security Question</label>
              <br/>
              <select name="securityQuestion" 
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.securityQuestion}
              style={{ borderRadius: 15, height: 45, display: 'inline-block', width: '300px', border: '0', padding: '0 10px' }}>
 <option disabled key="empty" value="">Select a question</option>
                <option value="1">Who is your fav actor?</option>
                <option value="2">What was your first car?</option>
                <option value="3">What is your fav movie?</option>
              </select>
              {touched.securityQuestion ? errors.securityQuestion ? <p className="error">{errors.securityQuestion}</p> : <CheckCircleIcon className='icon'/> : null}
            </div>

              


            <div className='input-holder'>
              <label>Answer</label>
              
              <br/>
              <input 
                type="text" 
                name="securityAnswer"   
                required
                placeholder={'Enter Answer'}
                onChange={handleChange}
                value={values.securityAnswer}
              />
            </div>



            <div className="input-holder">
            <button id="sub_btn" type="submit" >Get Details</button>
            </div>

 
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
