import { useState, useEffect } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import './Courses.style.css';

function Courses({ setAddCourse }) {
	const [courses, getCourses] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');

	const handleSeachChange = (e) => {
		const phrase = e.target.value.trim();
		if (!phrase) {
			getCourses(mockedCoursesList);
		}
		setSearchPhrase(phrase);
	};

	const filterCourses = (searchPhrase) => {
		return mockedCoursesList.filter(
			({ id, title }) =>
				id.toLowerCase().includes(searchPhrase) ||
				title.toLowerCase().includes(searchPhrase)
		);
	};

	const handleSubmit = (phrase) => {
		getCourses(filterCourses(phrase.toLowerCase()));
	};

	useEffect(() => {
		getCourses(mockedCoursesList);
	}, []);
	const coursesList = courses.map((course) => {
		const authorNames = (course) => {
			return mockedAuthorsList
				.filter((item) => course.authors.includes(item.id))
				.map((item) => item.name)
				.join(', ');
		};
		const convertDuration = (num) => {
			const hours = Math.floor(num / 60);
			const minutes = num % 60;
			return hours + ':' + minutes;
		};
		return (
			<CourseCard
				key={course.id}
				{...course}
				authorsNames={authorNames(course)}
				duration={convertDuration(course.duration)}
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
					setAddCourse={setAddCourse}
				/>
				{coursesList}
			</div>
		</>
	);
}

export default Courses;
