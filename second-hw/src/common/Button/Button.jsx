import './Button.style.css';

const Button = (props) => {
	return (
		<button className='btn' onClick={props.onClick} type={props.type}>
			{props.children}
		</button>
	);
};

export default Button;
