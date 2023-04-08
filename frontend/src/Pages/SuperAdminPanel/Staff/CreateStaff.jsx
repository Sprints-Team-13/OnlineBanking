import '../../../components/register/register.scss'
import axios from 'axios'
import React from "react";
import {useFormik} from 'formik'

import { registerSchema } from '../../../schemas/registerSchema';
import popAlert from "../../../helpers/popAlert";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function CreateStaff(){

	// handle user inputs
	const { values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
		initialValues: {
			fullName: '',
			phone: '',
			email: '',
			hash_password: '',
			passwordConfirm: '',
		},
		validationSchema: registerSchema,
		onSubmit: async (values) => {
			await axios({
				url: '/api/createAdmin',
				method: 'POST',
				data: {
					fullName: values.fullName,
					phone: values.phone.trim(),
					email: values.email.toLowerCase().trim(),
					hash_password: values.hash_password.trim(),
				}
			})
			.then((res) => {
				console.log(res.data)
				popAlert('Staff registered successfully')
				return setTimeout(()=> window.location.reload(), 2000)
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

	const CreateStaffForm =(
		<main className='App-main'>
			<div className='register'>
				<form action="/home" onSubmit={handleSubmit}>

					<div className="input-holder">
						<label>Full name</label><br/>
						<input 
						type="text" 
						name="fullName"
						required 
						placeholder={'Enter your full name'} 
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.fullName}
						/>
						{touched.fullName 
							? 
								errors.fullName 
								? <p className="error">{errors.fullName}</p> 
								: <CheckCircleIcon className='icon'/>
							:
							null
						}
					</div>

					<div className="input-holder">
						<label>Phone Number</label><br/>
						<input 
						type="text" 
						name="phone" 
						required
						placeholder={'0501234567'}
						pattern="[0-9]{10}"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.phone}
						/>							
						{touched.phone 
							? 
								errors.phone 
								? <p className="error">{errors.phone}</p> 
								: <CheckCircleIcon className='icon'/>
							:
							null
						}
					</div>

					<div className="input-holder">
						<label>Email address</label><br/>
						<input 
						type="email" 
						name="email" 
						required 
						placeholder={'Enter your Email'} 
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
						/>
						{touched.email 
							? 
								errors.email 
								? <p className="error">{errors.email}</p> 
								: <CheckCircleIcon className='icon'/>
							:
							null
						}
					</div>

					<div className="input-holder">
						<label>Password</label><br/>
						<input 
						type="password" 
						name="hash_password" 
						required
						placeholder={'Enter your Password'} 
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

					<div className="input-holder">
						<label>Confirm Password</label><br/>
						<input 
						type="password" 
						name="passwordConfirm" 
						required
						placeholder={'Confirm your Password'}
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
					<button id="sub_btn" type="submit">Create</button>

				</form>
			</div>
		</main>
	)
		
	return ( 
		<div>
			{CreateStaffForm}
		</div>        
	 )
}