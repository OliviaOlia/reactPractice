import logo from './logo.jpg';

import styles from './Logo.module.css';

function Logo() {
	return <img src={logo} className={styles.logo} alt='logo' />;
}

export default Logo;
