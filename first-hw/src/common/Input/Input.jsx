import style from './Input.module.css';

function Input({ lblText, type, placeholderText, onChange }) {
	return (
		<div className='inp-div'>
			<label className={style.lbl}>{lblText}</label>
			<input
				className={style.inp}
				type={type}
				placeholder={placeholderText}
				onChange={onChange}
			></input>
		</div>
	);
}
export default Input;
