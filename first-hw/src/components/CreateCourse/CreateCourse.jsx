import { useState, useReducer, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import convertDuration from '../../helpers/convertDuration';
import { reducer } from './reducer';

import { mockedAuthorsList, mockedCoursesList } from '../../constants';

import './CreateCourse.style.css';

function CreateCourse({ setAddCourse }) {
	const defaultNewCourse = {
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: 0,
		authors: [],
	};
	const [state, dispatch] = useReducer(reducer, defaultNewCourse);
	const [newAuthorName, setNewAuthorName] = useState('');
	const [authors, setAuthors] = useState(mockedAuthorsList);

	const handleAddAuthor = useCallback(
		(author, e, idx) => {
			dispatch({ type: 'ADD_AUTHOR', payload: author });
			setAuthors(authors.filter((a) => a.name !== author.name));
		},
		[authors]
	);
	const handleRemoveAuthor = useCallback(
		(author, e, idx) => {
			dispatch({ type: 'REMOVE_AUTHOR', payload: author });
			setAuthors([...authors, author]);
		},
		[authors]
	);

	const listAllAuthors = (authorsList, btnText, changeAuthorsList) => {
		return authorsList.map((author) => (
			<div key={author.id} className='author'>
				<span>{author.name}</span>
				<Button
					onClick={(e) => {
						changeAuthorsList(author, e, author.id);
					}}
				>
					{btnText}
				</Button>
			</div>
		));
	};
	const listAddedAuthors = useMemo(
		() => listAllAuthors(state.authors, 'Delete author', handleRemoveAuthor),
		[state.authors, handleRemoveAuthor]
	);

	const listNotAddedAuthors = useMemo(
		() => listAllAuthors(authors, 'Add author', handleAddAuthor),
		[authors, handleAddAuthor]
	);

	const converDurationMemo = useMemo(
		() => convertDuration(state.duration),
		[state.duration]
	);

	const handleCreateAuthor = useCallback(() => {
		const newAuthor = {
			id: uuidv4(),
			name: newAuthorName,
		};
		setAuthors([...authors, newAuthor]);
		setNewAuthorName('');
		mockedAuthorsList.push(newAuthor);
	}, [newAuthorName, setAuthors, authors]);

	const handleDuration = (e) => {
		if (isNaN(e.target.value)) {
			alert('Duration should be a number');
			e.target.value = '';
		} else if (+e.target.value < 1) {
		} else {
			dispatch({ type: 'ADD_DURATION', payload: +e.target.value });
			//dispatch({ type: 'ADD_ID_AND_DATE' });
		}
	};

	const handleCreateCourse = useCallback(
		(e) => {
			e.preventDefault();

			const newCourse = {
				id: uuidv4(),
				title: state.title,
				description: state.description,
				creationDate: new Date().toLocaleDateString('en-GB'),
				duration: state.duration,
				authors: state.authors.map((aut) => aut.id),
			};
			if (newCourse.duration === 0) {
				alert('Enter right duration (it should be number greater than 1)');
			} else if (
				!newCourse.title ||
				!newCourse.description ||
				!newCourse.duration ||
				newCourse.authors.length < 1
			) {
				alert('Please, fill all fields');
			} else if (newCourse.title < 2 || newCourse.description < 2) {
				alert('Title or description too short');
			} else {
				mockedCoursesList.push(newCourse);
				setAddCourse(false);
			}
		},
		[state, setAddCourse]
	);
	return (
		<form className='createCourse'>
			<div className='titleSection'>
				<Input
					lblText='Title:'
					type='text'
					placeholderText='Enter title...'
					onChange={(e) => {
						dispatch({ type: 'ADD_TITLE', payload: e.target.value });
					}}
					required
				/>
				<Button onClick={handleCreateCourse}>Create course</Button>
			</div>
			<div className='descriptionSection'>
				<label htmlFor='description'>Description:</label>
				<textarea
					id='description'
					name='description'
					placeholder='Enter description'
					cols='40'
					rows='6'
					value={state.description}
					required
					onChange={(e) => {
						dispatch({ type: 'ADD_DESCRIPTION', payload: e.target.value });
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
					<Button onClick={handleCreateAuthor}>Create author</Button>
				</div>
				<div className='authors'>
					<h3>Authors</h3>
					{listNotAddedAuthors}
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
					<p className='convertDuration'>Duration: {converDurationMemo}</p>
				</div>
				<div className='courseAuthors'>
					<h3>Course Authors</h3>
					{!state.authors.length ? (
						<p>Author list is empty</p>
					) : (
						listAddedAuthors
					)}
				</div>
			</section>
		</form>
	);
}

export default CreateCourse;
