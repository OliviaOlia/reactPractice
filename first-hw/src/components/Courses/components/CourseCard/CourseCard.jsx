import { useMemo, useCallback } from 'react';
import Button from '../../../../common/Button/Button';

import convertDuration from '../../../../helpers/convertDuration';
import { mockedAuthorsList } from '../../../../constants';

import styles from './CourseCard.module.css';

function CourseCard({
	title,
	authorsNames,
	description,
	creationDate,
	duration,
}) {
	const getCourseAuthorNames = useCallback((course) => {
		return mockedAuthorsList
			.filter((item) => course.includes(item.id))
			.map((item) => item.name)
			.join(', ');
	}, []);

	const calcDurationMemo = useMemo(() => convertDuration(duration), [duration]);

	const getAuthorsNamesMemo = useMemo(
		() => getCourseAuthorNames(authorsNames),
		[authorsNames, getCourseAuthorNames]
	);

	return (
		<section className={styles['course-card']}>
			<div className={styles['card-left']}>
				<span className={styles['title']}>{title}</span>
				<p className={styles['card-description']}>{description}</p>
			</div>
			<div className={styles['card-right']}>
				<p className={styles['authors']}>
					<span className={styles['label']}>Authors:</span>
					{getAuthorsNamesMemo}
				</p>
				<p className={styles['duration']}>
					<span className={styles['label']}>Duration:</span>
					{calcDurationMemo} hours
				</p>
				<p className={styles['created']}>
					<span className={styles['label']}>Created:</span>
					{creationDate}
				</p>
				<Button>Show course</Button>
			</div>
		</section>
	);
}

export default CourseCard;
