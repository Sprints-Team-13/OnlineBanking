import './register.scss'
import React from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'

import popAlert from "../../helpers/popAlert";

export default function Register(){

	const navigate = useNavigate()

	// used for storing user input
	const [newUser, setNewUser] = React.useState({
		name: '',
		phone: '',
		email: '',
		password: '',
		confirmPassword: '',
	});


	 // handle input change
	 function handleChange(event) {
    const {name, value} = event.target
    setNewUser(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }


	const handleSubmit = async (login) => {

		// prevent default form submit
		login.preventDefault();

		await axios.post('api/signup/',{
			name: newUser.name,
			email: newUser.email.toLowerCase().trim(),
			password: newUser.password.trim(),
			phone: newUser.phone.trim(),
		})
		.then((res) => {
			console.log(res.data)
			popAlert('Completed')
			return navigate("/")
		})
		.catch(
			(Error) => {
				if (Error.response.status === 400) {
				popAlert('Email already exists', 'error')
				console.log('Error', Error.response)
				} else {
					console.log('Error', Error.response)
				}
			}
		)
	};
			


	const registerForm =(
		<main className='App-main'>
			<div className='register'>
				<form action="/home" onSubmit={handleSubmit}>

					<div className="input-holder">
						<label>Full name</label><br/>
						<input 
						type="text" 
						name="name"
						required 
						placeholder={'Enter your full name'} 
						onChange={handleChange}
						value={newUser.name}
						autoFocus
						/>
					</div>

					<div className="input-holder">
						<label htmlFor="phone">Phone Number</label><br/>
						<input 
						type="tel" 
						name="phone"
						id="phone"
						required 
						placeholder={'0000-1234567'}
						pattern="[0-9]{4}-[0-9]{7}"
						onChange={handleChange}
						value={newUser.phone}
						autoFocus
						/>
					</div>

					<div className="input-holder">
						<label>Email address</label><br/>
						<input 
						type="email" 
						name="email" 
						required 
						onChange={handleChange}
						placeholder={'Enter your Email'} 
						value={newUser.email}
						/>
					</div>

					<div className="input-holder">
						<label>Password</label><br/>
						<input 
						type="password" 
						name="password" 
						required
						onChange={handleChange}
						placeholder={'Enter your Password'} 
						value={newUser.password}
						/>							
					</div>

					<div className="input-holder">
						<label>Confirm Password</label><br/>
						<input 
						type="password" 
						name="confirmPassword" 
						required
						onChange={handleChange}
						placeholder={'Enter your Password'} 
						value={newUser.confirmPassword}
						/>							
					</div>

					<div className="input-holder">
						<input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
					</div>

					<button id="sub_btn" type="submit">Register</button>
				</form>
			</div>
		</main>
	)
		
	return ( 
		<div>
		{registerForm}
		</div>        
	 )
}