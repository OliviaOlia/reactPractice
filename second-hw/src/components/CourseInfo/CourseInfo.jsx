import { Link, useParams } from 'react-router-dom';
import { useMemo } from 'react';

import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import convertDuration from '../../helpers/convertDuration';

import './CourseInfo.style.css';

const CourseInfo = () => {
	const { courseId } = useParams();
	const course = mockedCoursesList.find((course) => course.id === courseId);
	const { id, creationDate, description, duration, title, authors } = course;

	const calcDurationMemo = useMemo(() => convertDuration(duration), [duration]);

	return (
		<div className='coursesInfo_div'>
			<Link to='/courses'>&#8592; Back to courses</Link>
			<h1 className='info-title'>{title}</h1>
			<div className='coursesInfo'>
				<div className='info-left'>
					<article className='description'>{description}</article>
				</div>
				<div className='info-right'>
					<p className='info-id'>
						<b>ID:</b> {id}
					</p>
					<p className='info-duration'>
						<b>Duration: </b> {calcDurationMemo} hours
					</p>
					<p className='info-creationDate'>
						<b>Created: </b> {creationDate}
					</p>
					<p className='info-authors'>
						<b>Authors: </b>
						{authors.map((authorID) =>
							mockedAuthorsList
								.filter((author) => author.id === authorID)
								.map((author) => <p key={author.id}>{author.name}</p>)
						)}
					</p>
				</div>
			</div>
		</div>
	);
};
export default CourseInfo;
