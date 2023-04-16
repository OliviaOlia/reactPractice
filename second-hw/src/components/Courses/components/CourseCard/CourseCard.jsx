import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../common/Button/Button';

import convertDuration from '../../../../helpers/convertDuration';
import { mockedAuthorsList } from '../../../../constants';

import './CourseCard.style.css';

function CourseCard({
	id,
	title,
	authorsNames,
	description,
	creationDate,
	duration,
}) {
	console.log(id, title, authorsNames, description, creationDate, duration);
	const navigate = useNavigate();
	const getCourseAuthorNames = useCallback((courseAuthors) => {
		return mockedAuthorsList
			.filter((item) => courseAuthors.includes(item.id))
			.map((item) => item.name)
			.join(', ');
	}, []);

	const calcDurationMemo = useMemo(() => convertDuration(duration), [duration]);

	const getAuthorsNamesMemo = useMemo(
		() => getCourseAuthorNames(authorsNames),
		[authorsNames, getCourseAuthorNames]
	);

	const handleShowClick = (e, course) => {
		e.preventDefault();
		navigate(`/courses/${course}`);
	};

	return (
		<section className='course-card'>
			<div className='card-left'>
				<span className='title'>{title}</span>
				<p className='card-description'>{description}</p>
			</div>
			<div className='card-right'>
				<p className='authors'>
					<span className='label'>Authors:</span>
					{getAuthorsNamesMemo}
				</p>
				<p className='duration'>
					<span className='label'>Duration:</span>
					{calcDurationMemo} hours
				</p>
				<p className='created'>
					<span className='label'>Created:</span>
					{creationDate}
				</p>
				<Button onClick={(e) => handleShowClick(e, id)}>Show course</Button>
			</div>
		</section>
	);
}

export default CourseCard;
