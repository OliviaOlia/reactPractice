import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import './Login.style.css';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const loginHandler = useCallback(
		async (e) => {
			e.preventDefault();
			const user = {
				email,
				password,
			};

			const response = await fetch('http://localhost:4000/login', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();
			const userData = result.user;

			if (response.ok) {
				localStorage.setItem('token', result.result);
				localStorage.setItem('userData', JSON.stringify(userData));
				navigate('/courses');
			} else {
				alert('Sorry, data you entered is uncorrect. Please try again');
			}
		},
		[email, password, navigate]
	);

	const getEmail = useCallback((e) => setEmail(e.target.value), []);

	const getPassword = useCallback((e) => setPassword(e.target.value), []);

	return (
		<div className='login_div'>
			<h2>Login</h2>
			<form className='login_form' onSubmit={loginHandler}>
				<Input
					lblText='Email'
					type='email'
					placeholderText='Enter email'
					onChange={getEmail}
				/>
				<Input
					lblText='Password'
					type='password'
					placeholderText='Enter password'
					onChange={getPassword}
				/>
				<Button type='submit'>Login</Button>
			</form>
			<p className='login_link'>
				Don't have an account?{''} <Link to='/registration'>Registration</Link>
			</p>
		</div>
	);
};

export default Login;
