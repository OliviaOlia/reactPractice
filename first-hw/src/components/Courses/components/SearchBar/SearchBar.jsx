import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

import styles from './SearchBar.module.css';
import { useCallback } from 'react';

function SearchBar({
	searchPhrase,
	handleSubmit,
	handleSeachChange,
	setAddCourse,
}) {
	const submitHandler = useCallback(
		() => handleSubmit(searchPhrase),
		[searchPhrase, handleSubmit]
	);
	const newCourseHandler = useCallback(
		() => setAddCourse(true),
		[setAddCourse]
	);
	return (
		<div className={styles['searchBar']}>
			<div className={styles['searchInput']}>
				<Input
					type='text'
					placeholderText='Enter course name or ID...'
					value={searchPhrase}
					onChange={handleSeachChange}
				/>
				<Button onClick={submitHandler}>Search</Button>
			</div>
			<div>
				<Button onClick={newCourseHandler}>Create New Course</Button>
			</div>
		</div>
	);
}

export default SearchBar;
