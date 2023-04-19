import Logo from '../components/Logo/Logo';
import Button from '../../common/Button/Button';

import styles from './Header.module.css';

function Header() {
	const funcLogout = () => {};
	return (
		<header className={styles['header']}>
			<Logo />
			<div>
				<span className={styles['user-name']}>Olia</span>
				<Button onClick={funcLogout}>Logout</Button>
			</div>
		</header>
	);
}

export default Header;
