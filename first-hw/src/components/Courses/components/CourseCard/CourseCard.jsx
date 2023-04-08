import Button from '../../../../common/Button/Button';

import './CourseCard.style.css';

function CourseCard({
	title,
	authorsNames,
	description,
	creationDate,
	duration,
}) {
	return (
		<section className='course-card'>
			<div className='card-left'>
				<span className='title'>{title}</span>
				<p className='card-description'>{description}</p>
			</div>
			<div className='card-right'>
				<p className='authors'>
					<span className='label'>Authors:</span>
					{authorsNames}
				</p>
				<p className='duration'>
					<span className='label'>Duration:</span>
					{duration} hours
				</p>
				<p className='created'>
					<span className='label'>Created:</span>
					{creationDate}
				</p>
				<Button text='Show course' onClick={() => {}} />
			</div>
		</section>
	);
}

export default CourseCard;
