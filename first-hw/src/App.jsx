import React, { useState } from 'react';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';

import './App.css';

function App() {
	const [addCourse, setAddCourse] = useState(false);
	return (
		<>
			<Header />
			{addCourse ? (
				<CreateCourse setAddCourse={setAddCourse} />
			) : (
				<Courses setAddCourse={setAddCourse} />
			)}
		</>
	);
}
export default App;
