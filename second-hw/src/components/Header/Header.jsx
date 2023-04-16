import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo/Logo';
import Button from '../../common/Button/Button';

import './Header.style.css';

function Header() {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	let userData;
	if (token) {
		userData = JSON.parse(localStorage.getItem('userData'));
	}
	const handleLogout = useCallback(
		(e) => {
			navigate('/login');
			localStorage.removeItem('token');
			localStorage.removeItem('userData');
		},
		[navigate]
	);
	return (
		<header className='header'>
			<Logo />
			<div>
				<span className='user-name'>{userData ? userData.name : ' '}</span>
				<Button onClick={handleLogout}>Logout</Button>
			</div>
		</header>
	);
}

export default Header;
