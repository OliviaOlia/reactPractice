import Logo from '../components/Logo/Logo';
import Button from '../../common/Button/Button';

import './Header.style.css';

function Header() {
	const funcLogout = () => {};
	return (
		<header className='header'>
			<Logo />
			<div>
				<span className='user-name'>Olia</span>
				<Button text='Logout' onClick={funcLogout}></Button>
			</div>
		</header>
	);
}

export default Header;
