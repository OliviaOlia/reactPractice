import './Button.style.css';

const Button = (props) => {
	return (
		<button className='btn' type='button' onClick={props.onClick}>
			{props.text}
		</button>
	);
};

export default Button;
