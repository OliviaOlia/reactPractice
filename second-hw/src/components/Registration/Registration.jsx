import { useReducer, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import './Registration.style.css';

const Registration = () => {
	const defaultData = {
		name: '',
		email: '',
		password: '',
	};
	const navigate = useNavigate();
	const reducer = (state, action) => {
		if (action.type === 'ADD_NAME') {
			return { ...state, name: action.payload };
		}
		if (action.type === 'ADD_EMAIL') {
			return { ...state, email: action.payload };
		}
		if (action.type === 'ADD_PASSWORD') {
			return { ...state, password: action.payload };
		}
	};
	const [state, dispatch] = useReducer(reducer, defaultData);
	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			console.log(state);
			if (state.password.length < 6) {
				alert('Password length should be 6 characters minimum ');
			} else if (!state.email || !state.name || !state.password) {
				alert('All fields must be filled!');
			} else {
				//try {
				const response = await fetch('http://localhost:4000/register', {
					method: 'POST',
					body: JSON.stringify(state),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const result = await response.json();
				//navigate('/');
				const success = result.successful;
				if (!success) {
					alert(result.errors);
				} else {
					navigate('/');
					/*} catch (e) {
					console.log(e);
				}*/
				}
			}
		},
		[state, navigate]
	);
	/*const handleAddName = useCallback((name, e, idx) => {
		dispatch({ type: 'ADD_NAME', payload: name });
	}, []);
	const handleAddEmail = useCallback((email, e, idx) => {
		dispatch({ type: 'ADD_EMAIL', payload: email });
	}, []);
	const handleAddPassword = useCallback((password, e, idx) => {
		dispatch({ type: 'ADD_PASSWORD', payload: password });
	}, []);*/
	return (
		<div className='registration__container'>
			<h2>Registration</h2>
			<form className='registration' onSubmit={handleSubmit}>
				<Input
					lblText='Name:'
					type='text'
					placeholderText='Enter name'
					onChange={(e) => {
						dispatch({ type: 'ADD_NAME', payload: e.target.value });
					}}
				/>
				<Input
					lblText='Email:'
					type='text'
					placeholderText='Enter email'
					onChange={(e) => {
						dispatch({ type: 'ADD_EMAIL', payload: e.target.value });
					}}
				/>
				<Input
					lblText='Password:'
					type='password'
					placeholderText='Enter password'
					onChange={(e) => {
						dispatch({ type: 'ADD_PASSWORD', payload: e.target.value });
					}}
				/>
				<Button type='submit'>Registration</Button>
			</form>
			<p className='registration__link'>
				Have you already have an account? <Link to='/'>Login</Link>
			</p>
		</div>
	);
};

export default Registration;
