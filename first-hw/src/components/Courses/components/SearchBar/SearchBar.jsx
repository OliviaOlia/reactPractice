import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import './SearchBar.style.css';

function SearchBar({
	searchPhrase,
	handleSubmit,
	handleSeachChange,
	setAddCourse,
}) {
	return (
		<div className='searchBar'>
			<div className='searchInput'>
				<Input
					type='text'
					placeholderText='Enter course name or ID...'
					value={searchPhrase}
					onChange={handleSeachChange}
				/>
				<Button
					text='Search'
					onClick={() => {
						handleSubmit(searchPhrase);
					}}
				/>
			</div>
			<div>
				<Button text='Create New Course' onClick={() => setAddCourse(true)} />
			</div>
		</div>
	);
}

export default SearchBar;
