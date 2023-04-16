import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import { mockedCoursesList } from '../../constants';
import './Courses.style.css';
//import Button from '../../common/Button/Button';

function Courses() {
	const [courses, getCourses] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
		}
	});

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
			<div className='courses'>
				<SearchBar
					searchPhrase={searchPhrase}
					handleSubmit={handleSubmit}
					handleSeachChange={handleSeachChange}
					setAddCourse={(e) => {
						navigate('/courses/add');
					}}
				/>
				{coursesList}
			</div>
		</>
	);
}

export default Courses;
