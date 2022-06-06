import './register.scss'
import React from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'

import popAlert from "../../helpers/popAlert";

export default function Register(){

	const navigate = useNavigate()

	// used for storing user input
	const [newUser, setNewUser] = React.useState({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		hash_password: '',
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

		await axios({
			url: 'api/signup',
			method: 'POST',
			data: {
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				username: newUser.username,
				email: newUser.email.toLowerCase().trim(),
				hash_password: newUser.hash_password.trim(),
			}
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
					popAlert('Something wrong', 'error')
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
						<label>First name</label><br/>
						<input 
						type="text" 
						name="firstName"
						required 
						placeholder={'Enter your first name'} 
						onChange={handleChange}
						value={newUser.firstName}
						autoFocus
						/>
					</div>

					<div className="input-holder">
						<label>Last name</label><br/>
						<input 
						type="text" 
						name="lastName"
						required 
						placeholder={'Enter your last name'} 
						onChange={handleChange}
						value={newUser.lastName}
						autoFocus
						/>
					</div>

					<div className="input-holder">
						<label>User name</label><br/>
						<input 
						type="text" 
						name="username"
						required 
						placeholder={'Enter your user name'} 
						onChange={handleChange}
						value={newUser.username}
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
						name="hash_password" 
						required
						onChange={handleChange}
						placeholder={'Enter your Password'} 
						value={newUser.hash_password}
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