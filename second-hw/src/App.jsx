import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';

import './App.css';

function App() {
	//const [addCourse, setAddCourse] = useState(false);
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/registration' element={<Registration />}></Route>
				<Route exact path='/courses' element={<Courses />}></Route>
				<Route path='/courses/:courseId' element={<CourseInfo />}></Route>
				<Route path='/courses/add' element={<CreateCourse />}></Route>
				<Route exact path='*' element={<Courses />}></Route>
			</Routes>
		</Router>
	);
}
export default App;
