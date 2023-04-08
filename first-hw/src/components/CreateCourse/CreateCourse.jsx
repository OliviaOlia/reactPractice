import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import { mockedAuthorsList, mockedCoursesList } from '../../constants';

import './CreateCourse.style.css';

function CreateCourse({ setAddCourse }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [newAuthorName, setNewAuthorName] = useState('');
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [courseDuration, setCourseDuration] = useState(0);

	const handleAddAuthor = (author, e, idx) => {
		setCourseAuthors([...courseAuthors, author]);
		setAuthors(authors.filter((a) => a.name !== author.name));
	};
	const handleRemoveAuthor = (author, e, idx) => {
		setCourseAuthors(courseAuthors.filter((a) => a.name !== author.name));
		setAuthors([...authors, author]);
	};
	const listAllAuthors = (authorsList, btnText, changeAuthorsList) => {
		return authorsList.map((author) => (
			<div key={author.id} className='author'>
				<span>{author.name}</span>
				<Button
					text={btnText}
					onClick={(e) => {
						changeAuthorsList(author, e, author.id);
					}}
				/>
			</div>
		));
	};
	const convertDuration = (num) => {
		const hours = Math.floor(num / 60);
		const minutes = num % 60;
		return hours + ':' + minutes + ' hours';
	};
	const handleCreateAuthor = () => {
		const newAuthor = {
			id: uuidv4(),
			name: newAuthorName,
		};
		setAuthors([...authors, newAuthor]);
		setNewAuthorName('');
		mockedAuthorsList.push(newAuthor);
	};
	const handleDuration = (e) => {
		if (isNaN(e.target.value)) {
			alert('Duration should be a number');
			setCourseDuration(0);
			e.target.value = '';
		} else if (+e.target.value < 1) {
			setCourseDuration(0);
		} else {
			setCourseDuration(+e.target.value);
		}
	};

	const handleCreateCourse = () => {
		const createdNewCourse = {
			id: uuidv4(),
			title: title,
			description: description,
			creationDate: new Date().toLocaleDateString('en-GB'),
			duration: courseDuration,
			authors: courseAuthors.map(({ id }) => id),
		};
		if (courseDuration === 0) {
			alert('Enter right duration (it should be number greater than 1)');
		} else if (
			!title ||
			!description ||
			!courseDuration ||
			courseAuthors.length < 1
		) {
			alert('Please, fill all fields');
		} else if (title < 2 || description < 2) {
			alert('Title or description too short');
		} else {
			mockedCoursesList.push(createdNewCourse);
			setAddCourse(false);
		}
	};
	return (
		<form className='createCourse'>
			<div className='titleSection'>
				<Input
					lblText='Title:'
					type='text'
					placeholderText='Enter title...'
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					required
				/>
				<Button
					text='Create course'
					onClick={() => {
						handleCreateCourse();
					}}
				/>
			</div>
			<div className='descriptionSection'>
				<label htmlFor='description'>Description:</label>
				<textarea
					id='description'
					name='description'
					placeholder='Enter description'
					cols='40'
					rows='6'
					value={description}
					required
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
			</div>
			<section className='authorDurationSection'>
				<div className='addAuthor'>
					<h3>Add Author</h3>
					<Input
						lblText='Author name:'
						type='text'
						placeholderText='Enter author name...'
						onChange={(e) => {
							setNewAuthorName(e.target.value);
						}}
						required
					/>
					<Button text='Create author' onClick={handleCreateAuthor} />
				</div>
				<div className='authors'>
					<h3>Authors</h3>
					{listAllAuthors(authors, 'Add author', handleAddAuthor)}
				</div>
				<div className='duration'>
					<h3>Duration</h3>
					<Input
						lblText='Duration:'
						type='text'
						placeholderText='Enter duration in minutes...'
						onChange={handleDuration}
						required
					/>
					<p className='convertDuration'>
						Duration: {convertDuration(courseDuration)}
					</p>
				</div>
				<div className='courseAuthors'>
					<h3>Course Authors</h3>
					{!courseAuthors.length ? (
						<p>Author list is empty</p>
					) : (
						listAllAuthors(courseAuthors, 'Delete author', handleRemoveAuthor)
					)}
				</div>
			</section>
		</form>
	);
}

export default CreateCourse;
