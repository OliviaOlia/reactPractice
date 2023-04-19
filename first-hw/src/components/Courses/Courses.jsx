import { useState, useEffect, useCallback } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import { mockedCoursesList } from '../../constants';
import styles from './Courses.module.css';

function Courses({ setAddCourse }) {
	const [courses, getCourses] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');

	const handleSeachChange = useCallback(
		(e) => {
			const phrase = e.target.value.trim();
			if (!phrase) {
				getCourses(mockedCoursesList);
			} else if (searchPhrase !== phrase) {
				setSearchPhrase(phrase);
			}
		},
		[searchPhrase]
	);

	const filterCourses = (searchPhrase) => {
		return mockedCoursesList.filter(
			({ id, title }) =>
				id.toLowerCase().includes(searchPhrase) ||
				title.toLowerCase().includes(searchPhrase)
		);
	};

	const handleSubmit = useCallback((searchPhrase) => {
		getCourses(filterCourses(searchPhrase.toLowerCase()));
	}, []);

	useEffect(() => {
		getCourses(mockedCoursesList);
	}, []);
	const coursesList = courses.map((course) => {
		return (
			<CourseCard
				key={course.id}
				{...course}
				authorsNames={course.authors}
				duration={course.duration}
			/>
		);
	});
	return (
		<>
			<div className={styles['courses']}>
				<SearchBar
					searchPhrase={searchPhrase}
					handleSubmit={handleSubmit}
					handleSeachChange={handleSeachChange}
					setAddCourse={setAddCourse}
				/>
				{coursesList}
			</div>
		</>
	);
}

export default Courses;
