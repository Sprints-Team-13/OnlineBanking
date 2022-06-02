import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from 'axios'

import popAlert from "../Helpers/popAlert";

export default function Register(){

	const navigate = useNavigate()

	// used for storing user input
	const [newUser, setNewUser] = React.useState({
		name: '',
		email: '',
		password: ''
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

		await axios.post('api/users/',{
			name: newUser.name,
			email: newUser.email.toLowerCase().trim(),
			password: newUser.password.trim()
		})
		.then((res) => {
			console.log(res.data)
			popAlert('Completed')
			return navigate("/login")
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
				<div className="text-center m-5-auto">
				<h2>Join us</h2>
				<h5>Create your E-Shop Account</h5>
				<form action="/home" onSubmit={handleSubmit}>
					<p>
						<label>Username</label><br/>
						<input 
						type="text" 
						name="name"
						required 
						placeholder={'Enter your username'} 
						onChange={handleChange}
						value={newUser.name}
						autoFocus
						/>
					</p>
					<p>
						<label>Email address</label><br/>
						<input 
						type="email" 
						name="email" 
						required 
						onChange={handleChange}
						placeholder={'Enter your Email'} 
						value={newUser.email}
						/>
					</p>
					<p>
						<label>Password</label><br/>
						<input 
						type="password" 
						name="password" 
						required
						onChange={handleChange}
						placeholder={'Enter your Password'} 
						value={newUser.password}
						/>							
					</p>
					<p>
						<input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
					</p>
					<p>
						<button id="sub_btn" type="submit">Register</button>
					</p>
				</form>
				<footer>
					<p><Link to="/">Back to Homepage</Link>.</p>
				</footer>
			</div>
			</div>
		</main>
	)
		
	return ( 
		<div>
		{registerForm}
		</div>        
	 )
}