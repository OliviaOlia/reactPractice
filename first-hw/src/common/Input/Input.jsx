import './Input.style.css';

function Input({ lblText, type, placeholderText, onChange }) {
	return (
		<div className='inp-div'>
			<label className='lbl'>{lblText}</label>
			<input
				className='inp'
				type={type}
				placeholder={placeholderText}
				onChange={onChange}
			></input>
		</div>
	);
}
export default Input;
