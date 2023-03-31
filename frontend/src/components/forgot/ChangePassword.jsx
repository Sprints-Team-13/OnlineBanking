import './forgot.scss'
import axios from 'axios';
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Auth-context';
import popAlert from '../../helpers/popAlert';
import { useLocation } from "react-router-dom";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import {useFormik} from 'formik'
import { changePasswordSchema } from '../../schemas/registerSchema';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ChangePassword() {

  const navigate = useNavigate()

  const search = useLocation().search;
  const email = new URLSearchParams(search).get('email');
  // Error Message State
  const [errorMessages, setErrorMessages] = React.useState('');

 
  const { values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
		initialValues: {
			
      email: base64_decode(email),
      hash_password: '',
      passwordConfirm: '',
		},
		validationSchema: changePasswordSchema,
		onSubmit: async (values) => {
			await axios({
        url:  `/api/changePassword`,
        method: 'POST',
        data: {
          email: values.email.toLowerCase().trim(),
          hash_password: values.hash_password.trim()
        }
      })
			.then((res) => {
				console.log(res.data)
				popAlert('You changed the password successfully')
				return setTimeout(()=> navigate('/'), 2000)
			})
			.catch(
				(Error) => {
					if (Error.response.status === 400) {
					popAlert('Email already exists', 'error')
					console.log('Error', Error.response)
					} else {
						popAlert('Something wrong', 'error')
						console.log('Error', Error.response)
					}
				}
			)
		}
	})
 

  // Generate JSX code for login form
  const ChangePasswordForm = (

    <main className='App-main'>
      
      <div className="transfer">
 
 <div className="transfer-form">

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
                value={values.email}
                readOnly={true}          />
            </div>

            <div className='input-holder'>
              <label>Password</label>
              
              <br/>
              <input 
                type="password" 
                name="hash_password"   
                placeholder={'Enter new Password'} 
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.hash_password}
              />
              {touched.hash_password 
							? 
								errors.hash_password 
								? <p className="error">{errors.hash_password}</p> 
								: <CheckCircleIcon className='icon'/>
							:
							null
						}
            </div>

            <div className='input-holder'>
              <label>Confirm Password</label>
              
              <br/>
              <input 
                type="password" 
                name="passwordConfirm"   
                placeholder={'Confirm new Password'} 
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirm}
                
              />
              {touched.passwordConfirm 
							? 
								errors.passwordConfirm 
								? <p className="error">{errors.passwordConfirm}</p> 
								: <CheckCircleIcon className='icon'/>
							:
							null
						}
            </div>



            <div className="input-holder">
            <button id="sub_btn" type="submit" >Change Password</button>
            </div>

            <div className="error">{errorMessages}</div>

          </form>
              
        </div>
      </div>
      </div>
      </div>
      
    </main>

  )

  return (
    <div>
      {ChangePasswordForm}
    </div>
  )
}
