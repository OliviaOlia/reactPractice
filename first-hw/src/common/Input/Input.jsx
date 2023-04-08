import './Input.style.css';

function Input(props) {
	return (
		<div className='inp-div'>
			<label className='lbl'>{props.lblText}</label>
			<input
				className='inp'
				type={props.type}
				placeholder={props.placeholderText}
				onChange={props.onChange}
			></input>
		</div>
	);
}
export default Input;
