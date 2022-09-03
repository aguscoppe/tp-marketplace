import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CourseDetail from './pages/CourseDetail';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import About from './pages/About';
import NewCourse from './pages/NewCourse';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import './style.css';
import Enroll from './pages/Enroll';
import { STUDENT_ROLE } from './constants';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});

  const signOut = () => {
    setCurrentUser({});
  };

  const signIn = () => {
    const localUser = localStorage.getItem('current-user');
    setCurrentUser(JSON.parse(localUser));
  };

  useEffect(() => {
    signIn();
  }, []);

  return (
    <Routes>
      {currentUser ? (
        <>
          <Route path='/courses'>
            <Route index element={<Courses currentUser={currentUser} />} />
            <Route
              path='new'
              element={<NewCourse currentUser={currentUser} />}
            />
            <Route
              path='edit/:id'
              element={<NewCourse currentUser={currentUser} />}
            />
          </Route>
          <Route path='/profile'>
            <Route
              index
              element={<Profile currentUser={currentUser} signOut={signOut} />}
            />
            <Route
              path='reset-password'
              element={<ResetPassword currentUser={currentUser} />}
            />
          </Route>
        </>
      ) : null}
      {currentUser?.role === STUDENT_ROLE ? (
        <Route path='/enroll'>
          <Route path=':id' element={<Enroll currentUser={currentUser} />} />
        </Route>
      ) : null}
      <Route exact path='/' element={<Home currentUser={currentUser} />} />
      <Route path='/course'>
        <Route
          path=':id'
          element={<CourseDetail currentUser={currentUser} />}
        />
      </Route>
      <Route path='/about' element={<About currentUser={currentUser} />} />
      <Route
        path='/login'
        element={<Login currentUser={currentUser} signIn={signIn} />}
      />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default App;
